import pandas as pd
import numpy as np
from transformers import XLNetTokenizer, XLNetModel
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.python.keras.models import load_model
import torch

import pickle
import joblib
import pandas as pd

# Load data from CSV
data_path = 'ticketing/merged_data.csv'
data = pd.read_csv(data_path)

# Load tokenizer and model
tokenizer = XLNetTokenizer.from_pretrained('xlnet-base-cased')
# feature_extractor = pipeline('feature-extraction', model='xlnet-base-cased', tokenizer=tokenizer)
model = XLNetModel.from_pretrained('xlnet-base-cased')


# Tokenize and encode the text
def get_embeddings(texts):
    if isinstance(texts, str):
        texts = [texts]
    inputs = tokenizer(texts, return_tensors='pt', max_length=128, padding='max_length', truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embeddings = outputs.last_hidden_state[:, 0, :]  # Use the CLS token for embedding
    return embeddings.numpy()

def retrieve_similar_tickets(new_description, embeddings_path='ticketing/embeddings.npy', top_n=5):
    embeddings = np.load(embeddings_path)
    new_description = new_description.lower().replace(r'\W', ' ')
    new_embedding = get_embeddings(new_description)
    cosine_similarities = cosine_similarity(new_embedding, embeddings).flatten()

    similar_indices = cosine_similarities.argsort()[-top_n:][::-1]
    similar_issues = data.iloc[similar_indices]
    dic_list = [{'Issue_key' : row['Issue key'], 'Description': row['Description'],'Created_at':row['Created']} for _,row in similar_issues.iterrows()]

    return dic_list

# Tokenize the data
def tokenize_texts(texts, tokenizer):
    if isinstance(texts, pd.Series):
        texts = texts.tolist()
    return tokenizer(
        texts,
        max_length=128,
        padding='max_length',  # Ensure all sequences are padded to max_length
        truncation=True,
        return_tensors='tf'
    )


# Function to load and predict


# Example usage
# if __name__ == "__main__":
#     new_description = "Jenkins can not start the building process"
#     answer = retrieve_similar_tickets(new_description)
#     print(answer)  # Should print a list of similar issue keys


# Function to load and predict
def load_and_predict(description, model_path, encoder_path):
    # Load the model
    model = load_model(model_path)
    print(model)

    # Preprocess the input description
    tokenized_input = tokenize_texts([description], tokenizer)
    prediction = model.predict \
        ({'input_ids': tokenized_input['input_ids'], 'attention_mask': tokenized_input['attention_mask']})

    # Load the encoder
    encoder = joblib.load(encoder_path)

    predicted_index = np.argmax(prediction, axis=1)[0]
    prediction = encoder.inverse_transform([predicted_index])[0]

    return prediction



# load tokenizer and model
# token = XLNetTokenizer.from_pretrained('xlnet-base-cased')

def predict_priority(description):
    model_path = 'ticketing/priority_classification.keras'
    encoder_path = 'ticketing/priority_encoder.pkl'
    return load_and_predict(description, model_path, encoder_path)

print(retrieve_similar_tickets("Jenkins can not start the building process"))