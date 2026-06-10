import pandas as pd
import numpy as np
import joblib

from tensorflow.keras.models import load_model

model = load_model(
    "multivariate_model.keras"
)

scaler = joblib.load(
    "multivariate_scaler.pkl"
)

df = pd.read_csv(
    "dataset/enriched_crowd_data.csv"
)

features = [
    "visitors",
    "temperature",
    "humidity",
    "rainfall",
    "is_weekend",
    "is_holiday",
    "festival_score"
]

last_10_days = df[
    features
].tail(10)

scaled = scaler.transform(
    last_10_days
)

X = np.array([scaled])

prediction = model.predict(
    X,
    verbose=0
)

dummy_row = np.zeros((1,7))

dummy_row[0][0] = prediction[0][0]

predicted_visitors = scaler.inverse_transform(
    dummy_row
)[0][0]

print(
    round(predicted_visitors)
)