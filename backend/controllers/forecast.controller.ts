import axios from "axios";
import { Request, Response} from "express";

export const getTodayForecast =
async (req:Request, res: Response) => {

  const response =
  await axios.get(
    "http://localhost:5000/forecast"
  );

  return res.json(
    response.data
  );
};