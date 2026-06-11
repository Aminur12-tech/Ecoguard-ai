import axios from "axios";

const API =
    "http://localhost:5000/api";

export const getWeather =
async () => {

    const response =
        await axios.get(
            `${API}/weather`
        );

    return response.data;
};