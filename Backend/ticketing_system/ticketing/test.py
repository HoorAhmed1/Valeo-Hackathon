import tensorflow as tf
from tensorflow.keras.layers import Input, Embedding, LSTM, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
from transformers import XLNetTokenizer

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


data = pd.read_csv('data/merged_data.csv')

# Preprocess the data
descriptions = data['Description'].apply(lambda x: x.lower().replace(r'\W', ' '))
teams = data['Priority']

# Encode the labels
team_encoder = LabelEncoder()
teams_encoded = team_encoder.fit_transform(teams)

token = XLNetTokenizer.from_pretrained('xlnet-base-cased')

X_train_tokenized = tokenize_texts(descriptions, token)

# Convert labels to categorical
y_train = tf.keras.utils.to_categorical(teams_encoded, num_classes=len(team_encoder.classes_))

# Define the model
def build_lstm_model():
    input_ids = Input(shape=(128,), dtype=tf.int32, name='input_ids')
    attention_mask = Input(shape=(128,), dtype=tf.int32, name='attention_mask')

    embedding_layer = Embedding(input_dim=token.vocab_size, output_dim=128)(input_ids)
    lstm_layer = LSTM(128)(embedding_layer)
    dropout = Dropout(0.2)(lstm_layer)
    output = Dense(len(team_encoder.classes_), activation='softmax')(dropout)

    model = Model(inputs=[input_ids, attention_mask], outputs=output)
    model.compile(optimizer=Adam(learning_rate=1e-3), loss='categorical_crossentropy', metrics=['accuracy'])

    return model

model = build_lstm_model()

# Callbacks
checkpoint = ModelCheckpoint('best_model.keras', monitor='val_loss', save_best_only=True, mode='min',verbose=1)
early_stopping = EarlyStopping(monitor='val_loss', patience=5, mode='min', restore_best_weights=True,verbose=1)

# Train the model
history = model.fit(
    {'input_ids': X_train_tokenized['input_ids'], 'attention_mask': X_train_tokenized['attention_mask']},
    y_train,
    validation_split=0.1,
    epochs=10,
    batch_size=4,
    callbacks=[checkpoint, early_stopping]
)

model.save('priority_classification.keras')