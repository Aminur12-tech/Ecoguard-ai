from flask import Flask, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS
import joblib

from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model("crowd_model.keras")
scaler = joblib.load("scaler.pkl")

df = pd.read_csv(
    "dataset/crowd_data.csv"
)

data = df["visitors"].values.reshape(-1,1)

scaled_data = scaler.transform(data)

@app.route("/forecast")
def forecast():

    last_10 = df["visitors"].values[-10:]

    scaled = scaler.transform(
        last_10.reshape(-1,1)
    )

    X = scaled.reshape(1,10,1)

    prediction = model.predict(
        X,
        verbose=0
    )

    visitors = int(
        scaler.inverse_transform(
            prediction
        )[0][0]
    )

    level = "Low"

    if visitors >= 100:
        level = "Medium"

    if visitors >= 300:
        level = "High"

    return jsonify({
        "predictedVisitors": visitors,
        "crowdLevel": level
    })

@app.route("/forecast/7days")
def forecast_7days():

    window = scaled_data[-10:].flatten().tolist()

    predictions = []

    for i in range(7):

        X = np.array(window[-10:]).reshape(1, 10, 1)

        pred = model.predict(X, verbose=0)

        value = pred[0][0]

        window.append(value)

        visitors = int(
            scaler.inverse_transform(
                [[value]]
            )[0][0]
        )

        predictions.append({
            "day": f"Day {i+1}",
            "visitors": visitors
        })

    return jsonify(predictions)

@app.route("/forecast/occupancy")
def occupancy():

    visitors = 272

    occupancy_rate = round(
        (visitors / 350) * 100,
        2
    )

    return jsonify({
        "occupancyRate":
        occupancy_rate
    })    

if __name__ == "__main__":
    app.run(port=5000)