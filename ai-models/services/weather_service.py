import requests

API_KEY = "692dab038a2870bc0160d7767f889d5f"
CITY = "Guwahati"

def get_weather():

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={CITY}"
        f"&appid={API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)

    print("Status Code:", response.status_code)
    print("Response:", response.text)

    data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "rainfall": data.get("rain", {}).get("1h", 0)
    }