import axios from "axios";

const API_URL = "http://localhost:5000";

export interface ForecastData {
    predictedVisitors: number;
    crowdLevel: string;
}

export interface WeeklyForecastData {
    day: string;
    visitors: number;
}

export const getForecast = async (): Promise<ForecastData> => {

    const response = await axios.get(
        `${API_URL}/forecast`
    );

    return response.data;
};

export const getWeeklyForecast =
    async (): Promise<WeeklyForecastData[]> => {

    const response = await axios.get(
        `${API_URL}/weekly-forecast`
    );

    return response.data;
};

