import { useEffect, useState } from "react";

import {
    getForecast,
    getWeeklyForecast,
    ForecastData,
    WeeklyForecastData
} from "../services/forecastService";

import ForecastCard from "../components/ForecastCard";
import CrowdLevelCard from "../components/CrowdLevelCard";
import ForecastChart from "../components/ForecastChart";
import WeeklyForecast from "../components/WeeklyForecast";

import Navbar from "../components/Navbar";

function CrowdForecasting() {

    const [forecast, setForecast] =
        useState<ForecastData | null>(null);

    const [weeklyForecast,
        setWeeklyForecast] =
        useState<WeeklyForecastData[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadData = async () => {

            try {

                const forecastData =
                    await getForecast();

                const weeklyData =
                    await getWeeklyForecast();

                setForecast(
                    forecastData
                );

                setWeeklyForecast(
                    weeklyData
                );

            } catch (error) {

                console.error(
                    "Error loading forecast:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        loadData();

    }, []);

    

    return (
        <>
            <Navbar role="traveller" userName="Aminur" />
            <div
                style={{
                    padding: "20px"
                }}
            >
                <h1>
                    EcoGuard AI Crowd Forecasting
                </h1>

                {forecast && (

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(250px,1fr))",
                            gap: "20px",
                            marginTop: "20px"
                        }}
                    >

                        <ForecastCard
                            visitors={
                                forecast.predictedVisitors
                            }
                        />

                        <CrowdLevelCard
                            level={
                                forecast.crowdLevel
                            }
                        />

                    </div>

                )}

                <div
                    style={{
                        marginTop: "40px"
                    }}
                >
                    <ForecastChart
                        data={weeklyForecast}
                    />
                </div>

                <div
                    style={{
                        marginTop: "40px"
                    }}
                >
                    <WeeklyForecast
                        data={weeklyForecast}
                    />
                </div>

            </div>
        </>
    );
}

export default CrowdForecasting;