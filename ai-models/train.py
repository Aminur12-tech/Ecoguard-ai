import pandas as pd
import numpy as np
import joblib

from sklearn.preprocessing import MinMaxScaler

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# =====================================
# STEP 1: LOAD DATASET
# =====================================

df = pd.read_csv("dataset/crowd_data.csv")

print("Dataset Loaded Successfully")
print(df.head())

# =====================================
# STEP 2: EXTRACT VISITOR COLUMN
# =====================================

data = df["visitors"].values.reshape(-1, 1)

# =====================================
# STEP 3: NORMALIZE DATA
# =====================================

scaler = MinMaxScaler(feature_range=(0, 1))

scaled_data = scaler.fit_transform(data)

print("\nFirst 5 Normalized Values:")
print(scaled_data[:5])

# =====================================
# STEP 4: CREATE SEQUENCES
# =====================================

X = []
y = []

window_size = 10

for i in range(window_size, len(scaled_data)):
    X.append(scaled_data[i-window_size:i, 0])
    y.append(scaled_data[i, 0])

X = np.array(X)
y = np.array(y)

print("\nBefore Reshape")
print("X Shape:", X.shape)
print("Y Shape:", y.shape)

# =====================================
# STEP 5: RESHAPE FOR LSTM
# =====================================

X = X.reshape(
    X.shape[0],
    X.shape[1],
    1
)

print("\nAfter Reshape")
print("X Shape:", X.shape)

# =====================================
# STEP 6: BUILD LSTM MODEL
# =====================================

model = Sequential()

model.add(
    LSTM(
        units=50,
        return_sequences=True,
        input_shape=(X.shape[1], 1)
    )
)

model.add(
    LSTM(
        units=50
    )
)

model.add(
    Dense(
        units=1
    )
)

# =====================================
# STEP 7: COMPILE MODEL
# =====================================

model.compile(
    optimizer="adam",
    loss="mean_squared_error"
)

print("\nModel Summary")
model.summary()

# =====================================
# STEP 8: TRAIN MODEL
# =====================================

history = model.fit(
    X,
    y,
    epochs=20,
    batch_size=32,
    validation_split=0.2
)

# =====================================
# TRAINING COMPLETED
# =====================================

print("\nTraining Completed Successfully")

# Save trained model

model.save("crowd_model.keras")

print("Model saved successfully!")

joblib.dump(
    scaler,
    "scaler.pkl"
)

print("Scaler saved successfully!")