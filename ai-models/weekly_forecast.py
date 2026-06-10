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

window = df[
    features
].tail(10).values

forecast = []

for day in range(7):

    scaled_window = scaler.transform(
        window
    )

    X = np.array([
        scaled_window
    ])

    pred = model.predict(
        X,
        verbose=0
    )

    row = np.zeros((1,7))

    row[0][0] = pred[0][0]

    visitors = int(
        scaler.inverse_transform(
            row
        )[0][0]
    )

    forecast.append({
        "day": day + 1,
        "visitors": visitors
    })

    next_row = window[-1].copy()

    next_row[0] = visitors

    window = np.vstack([
        window[1:],
        next_row
    ])

print(forecast)