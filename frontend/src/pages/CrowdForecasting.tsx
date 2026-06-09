import { useEffect, useState } from "react";
import {
    getForecast,
    ForecastData,
    getWeeklyForecast,
    getOccupancy,
    
} from "../services/forecastService";
import CrowdLevelCard from "../components/CrowdLevelCard";
import ForecastCard from "../components/ForecastCard";
import ForecastChart from "../components/ForecastChart";
import WeeklyForecast from "../components/WeeklyForecast";
import OccupancyCard from "../components/OccupancyCard";
import RevenueCard from "../components/RevenueCard";


function CrowdForecasting() {
    const [forecast, setForecast] =
        useState<ForecastData | null>(null);
    const [weeklyForecast,
        setWeeklyForecast] = useState([]);
    const [occupancy, setOccupancy] = useState<number | null>(null);

    useEffect(() => {
        getForecast()
            .then((data) => {
                setForecast(data);
            })
            .catch((err) => {
                console.error(err);
            });

        getWeeklyForecast()
            .then((data) => {
                setWeeklyForecast(data);
            });

        getOccupancy()
            .then((data) => {
                setOccupancy(data.occupancyRate);
            })
    }, []);

    return (
        <div
            style={{
                padding: "20px",
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
                            "repeat(2,1fr)",
                        gap: "20px",
                        marginTop: "20px",
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
                    <OccupancyCard 
                        occupancy={
                            occupancy ?? 0
                        }
                    />
                    <RevenueCard
                        visitors={ forecast.predictedVisitors}/>
                
                </div>
            )}
            <ForecastChart
                data={weeklyForecast}
            />
            <WeeklyForecast
                data={weeklyForecast}
            />
        </div>
    );
}

export default CrowdForecasting;