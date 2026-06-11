import axios from "axios";

export async function getWeather() {

    const apiKey =
        process.env.OPENWEATHER_API_KEY;

    const city =
        process.env.OPENWEATHER_CITY;

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}&units=metric`;

    const response =
        await axios.get(url);

    const data = response.data;

    return {

        temperature:
            data.main.temp,

        humidity:
            data.main.humidity,

        wind:
            data.wind.speed,

        rainfall:
            data.rain?.["1h"] || 0,

        condition:
            data.weather[0].main
    };
}