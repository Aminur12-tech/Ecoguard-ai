import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

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

data = df[features].values

scaler = MinMaxScaler()

scaled_data = scaler.fit_transform(data)

joblib.dump(
    scaler,
    "multivariate_scaler.pkl"
)

lookback = 10

X = []
y = []

for i in range(
    lookback,
    len(scaled_data)
):

    X.append(
        scaled_data[
            i-lookback:i
        ]
    )

    y.append(
        scaled_data[i][0]
    )

X = np.array(X)
y = np.array(y)

print("X Shape:", X.shape)
print("Y Shape:", y.shape)

model = Sequential()

model.add(
    LSTM(
        64,
        return_sequences=True,
        input_shape=(10,7)
    )
)

model.add(
    LSTM(32)
)

model.add(
    Dense(1)
)

model.compile(
    optimizer="adam",
    loss="mse"
)

model.fit(
    X,
    y,
    epochs=20,
    batch_size=32,
    validation_split=0.2
)

model.save(
    "multivariate_model.keras"
)

print(
    "Multivariate Model Saved"
)