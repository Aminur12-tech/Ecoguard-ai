import axios from "axios";

export async function getForecast() {

    const api =
        process.env.PYTHON_FORECAST_API;

    const response =
        await axios.get(
            `${api}/forecast`
        );

    return response.data;
}