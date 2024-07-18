from Models.classification import load_and_predict

def predict_priority(description):
    return load_and_predict(description, 'priority_classification.keras', 'priority_encoder.pkl')

