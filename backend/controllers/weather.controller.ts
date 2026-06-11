import { Request, Response }
from "express";

import { getWeather }
from "../services/weather.service";

import { getForecast }
from "../services/forecast.service";

import { calculateOccupancy }
from "../services/occupancy.service";

import { generateAlerts }
from "../services/alert.service";

export async function getWeatherController(
    req: Request,
    res: Response
) {

    try {

        const weather =
            await getWeather();

        const forecast =
            await getForecast();

        const visitors =
            forecast.predictedVisitors;

        const occupancy =
            calculateOccupancy(
                visitors,
                300
            );

        const climateImpact =
            weather.rainfall > 20
                ? "Heavy Rain Risk"
                : weather.temperature > 35
                ? "Heat Stress"
                : "Favourable Conditions";

        const destinationForecast = [

            {
                destination:
                    "Kaziranga",

                visitors:
                    Math.round(
                        visitors * 0.40
                    ),

                status:
                    "High"
            },

            {
                destination:
                    "Majuli",

                visitors:
                    Math.round(
                        visitors * 0.25
                    ),

                status:
                    "Medium"
            },

            {
                destination:
                    "Manas",

                visitors:
                    Math.round(
                        visitors * 0.20
                    ),

                status:
                    "Medium"
            },

            {
                destination:
                    "Pobitora",

                visitors:
                    Math.round(
                        visitors * 0.15
                    ),

                status:
                    "Low"
            }
        ];

        const alerts =
            generateAlerts(
                visitors,
                weather.rainfall,
                occupancy
            );

        return res.json({

            visitors,

            crowdLevel:
                forecast.crowdLevel,

            weather,

            climateImpact,

            occupancy,

            weeklyForecast:
                forecast.weeklyForecast,

            destinationForecast,

            alerts
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message:
                "Dashboard Error"
        });
    }
}