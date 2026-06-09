import numpy as np
import pandas as pd
import joblib

from tensorflow.keras.models import load_model

# Load model
model = load_model("crowd_model.keras")

# Load scaler
scaler = joblib.load("scaler.pkl")

# Load dataset
df = pd.read_csv(
    "dataset/crowd_data.csv"
)

# Get last 10 days visitors
last_10_days = df["visitors"].values[-10:]

# Scale data
scaled = scaler.transform(
    last_10_days.reshape(-1,1)
)

# Reshape for LSTM
X = scaled.reshape(1,10,1)

# Predict
prediction = model.predict(X)

# Convert back
forecast = scaler.inverse_transform(
    prediction
)

predicted_visitors = int(
    forecast[0][0]
)

print(
    f"Predicted Visitors Tomorrow: {predicted_visitors}"
)

