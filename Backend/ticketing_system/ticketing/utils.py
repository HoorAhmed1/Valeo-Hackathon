import pandas as pd
import numpy as np
from transformers import XLNetTokenizer, TFXLNetModel
from sklearn.metrics.pairwise import cosine_similarity

# Load data from CSV
data_path = 'ticketing/data/merged_data.csv'
data = pd.read_csv(data_path)

# Load tokenizer and model
tokenizer = XLNetTokenizer.from_pretrained('xlnet-base-cased')
model = TFXLNetModel.from_pretrained('xlnet-base-cased')

# Tokenize and encode the text
def get_embeddings(texts):
    inputs = tokenizer(texts, return_tensors='tf', max_length=128, padding='max_length', truncation=True)
    outputs = model(inputs)
    embeddings = outputs.last_hidden_state[:, 0, :]  # Use the CLS token for embedding
    return embeddings

def retrieve_similar_tickets(new_description, embeddings_path='ticketing/data/embeddings.npy', top_n=5):
    embeddings = np.load(embeddings_path)
    new_description = new_description.lower().replace(r'\W', ' ')
    new_embedding = get_embeddings(new_description)
    cosine_similarities = cosine_similarity(new_embedding, embeddings).flatten()

    similar_indices = cosine_similarities.argsort()[-top_n:][::-1]
    similar_issues = data.iloc[similar_indices]

    return similar_issues.index.astype(int).tolist() 

# Example usage
if __name__ == "__main__":
    new_description = "Jenkins can not start the building process"
    answer = retrieve_similar_tickets(new_description)
    print(answer)  # Should print a list of similar issue keys
