import axios from "axios";

export interface ForecastData {
  predictedVisitors: number;
  crowdLevel: string;
}

export const getForecast = async (): Promise<ForecastData> => {
  const response = await axios.get<ForecastData>(
    "http://localhost:5000/forecast"
  );

  return response.data;
};

export const getWeeklyForecast =
async () => {

  const response =
    await axios.get(
      "http://localhost:5000/forecast/7days"
    );

  return response.data;
};

export const getOccupancy =
async () => {

  const response =
   await axios.get(
     "http://localhost:5000/forecast/occupancy"
   );

  return response.data;
};