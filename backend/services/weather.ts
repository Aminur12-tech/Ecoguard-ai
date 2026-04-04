import axios from 'axios';

export async function getWeatherScore(lat: number, lng: number){
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=rain,precipitation_probability&forecast_days=1&timezone=auto';

    const res = await axios.get(url);
    const hourly = res.data.hourly;

    const rain = hourly?.rain?.[0] ?? 0;
    const rainProb = hourly?.precipitation_probability?.[0] ?? 0;

    return {
        rainMm: Number(rain),
        rainProbability: Number(rainProb)
    };
}