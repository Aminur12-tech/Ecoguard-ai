from flask import Flask, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np
import joblib

from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load model and scaler once
model = load_model(
    "multivariate_model.keras"
)

scaler = joblib.load(
    "multivariate_scaler.pkl"
)

FEATURES = [
    "visitors",
    "temperature",
    "humidity",
    "rainfall",
    "is_weekend",
    "is_holiday",
    "festival_score"
]


@app.route("/forecast")
def forecast():

    df = pd.read_csv(
        "dataset/enriched_crowd_data.csv"
    )

    last_10 = df[
        FEATURES
    ].tail(10)

    scaled = scaler.transform(
        last_10
    )

    X = np.array([scaled])

    pred = model.predict(
        X,
        verbose=0
    )

    row = np.zeros((1, 7))

    row[0][0] = pred[0][0]

    visitors = int(
        scaler.inverse_transform(
            row
        )[0][0]
    )

    if visitors < 200:
        level = "Low"

    elif visitors < 300:
        level = "Medium"

    else:
        level = "High"

    return jsonify({
        "predictedVisitors": visitors,
        "crowdLevel": level
    })


@app.route("/weekly-forecast")
def weekly_forecast():

    df = pd.read_csv(
        "dataset/enriched_crowd_data.csv"
    )

    window = df[
        FEATURES
    ].tail(10).values

    forecast_data = []

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

        row = np.zeros((1, 7))

        row[0][0] = pred[0][0]

        visitors = int(
            scaler.inverse_transform(
                row
            )[0][0]
        )

        forecast_data.append({
            "day": f"Day {day + 1}",
            "visitors": visitors
        })

        # Create next input row
        next_row = window[-1].copy()

        next_row[0] = visitors

        window = np.vstack([
            window[1:],
            next_row
        ])

    return jsonify(
        forecast_data
    )


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8080,
        debug=True
    )