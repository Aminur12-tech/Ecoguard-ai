import pandas as pd

df = pd.read_csv(
    "dataset/enriched_crowd_data.csv"
)

festival_df = pd.read_csv(
    "dataset/festival_calendar.csv"
)

df["date"] = pd.to_datetime(df["date"])
festival_df["date"] = pd.to_datetime(
    festival_df["date"]
)

festival_map = dict(
    zip(
        festival_df["date"],
        festival_df["festival_score"]
    )
)

df["festival_score"] = (
    df["date"]
    .map(festival_map)
    .fillna(0)
)

df.to_csv(
    "dataset/enriched_crowd_data.csv",
    index=False
)

print("Festival data updated")

print(
    df[df["festival_score"] > 0][
        ["date","festival_score"]
    ]
)