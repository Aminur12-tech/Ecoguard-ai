import pandas as pd

df = pd.read_csv("dataset/enriched_crowd_data.csv")

df = df.drop(columns=["weekend", "festival"])

df.to_csv(
    "dataset/enriched_crowd_data.csv",
    index=False
)

print(df.head())
