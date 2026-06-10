import pandas as pd
import random

df = pd.read_csv(
    "dataset/crowd_data.csv"
)

df["temperature"] = [
    random.randint(18,35)
    for _ in range(len(df))
]

df["humidity"] = [
    random.randint(50,95)
    for _ in range(len(df))
]

df["rainfall"] = [
    random.randint(0,50)
    for _ in range(len(df))
]

df["is_weekend"] = (
    pd.to_datetime(df["date"])
    .dt.dayofweek >= 5
).astype(int)

df["is_holiday"] = 0

df["festival_score"] = 0

df.to_csv(
    "dataset/enriched_crowd_data.csv",
    index=False
)

print("Dataset Created")