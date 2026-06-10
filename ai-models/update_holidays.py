import pandas as pd

df = pd.read_csv(
    "dataset/enriched_crowd_data.csv"
)

holiday_df = pd.read_csv(
    "dataset/holiday_calendar.csv"
)

df["date"] = pd.to_datetime(df["date"])
holiday_df["date"] = pd.to_datetime(
    holiday_df["date"]
)

df["is_holiday"] = (
    df["date"].isin(
        holiday_df["date"]
    )
).astype(int)

df.to_csv(
    "dataset/enriched_crowd_data.csv",
    index=False
)

print("Holiday data updated")

print(
    df[df["is_holiday"] == 1][
        ["date", "is_holiday"]
    ].head(20)
)