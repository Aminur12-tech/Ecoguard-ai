import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import ForecastCard from "../components/ForecastCard";
import CrowdLevelCard from "../components/CrowdLevelCard";
import OccupancyCard from "../components/OccupancyCard";
import ClimateImpactCard from "../components/ClimateImpactCard";
import ForecastChart from "../components/ForecastChart";
import WeeklyForecast from "../components/WeeklyForecast";
import DestinationForecast from "../components/DestinationForecast";
import ActionAlerts from "../components/ActionAlerts";
import RevenueCard from "../components/RevenueCard";

import { getWeather } from "../services/weatherService";
import { WeatherData } from "../types/weather";

function CrowdForecasting() {

    const [location,
        setLocation] =
        useState(
            "Kaziranga"
        );

    const [weather, setWeather] =
        useState<WeatherData | null>(null);

    const [loading, setLoading] =
        useState(true);



    useEffect(() => {

        loadWeather();

        const timer = setInterval(
            loadWeather,
            300000
        );

        return () => clearInterval(timer);

    }, []);

    const loadWeather = async () => {

        try {

            const data =
                await getWeather();

            console.log(
                "API Response:",
                data
            );

            setWeather(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {

        return (
            <>
                <Navbar
                    role="traveller"
                    userName="Aminur"
                />

                <div
                    className="
                    flex
                    justify-center
                    items-center
                    h-screen
                    "
                >
                    <h2
                        className="
                        text-2xl
                        font-bold
                        "
                    >
                        Loading Dashboard...
                    </h2>
                </div>
            </>
        );
    }

    if (!weather) {

        return (
            <>
                <Navbar
                    role="traveller"
                    userName="Aminur"
                />

                <div className="p-10">
                    Unable to load dashboard
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar
                role="traveller"
                userName="Aminur"
            />

            <div
                className="
                min-h-screen
                bg-slate-100
                p-4
                md:p-6
                "
            >

                {/* Hero */}

                <div
                    className="
    relative
    overflow-hidden
    rounded-3xl
    shadow-2xl
    mb-8
    "
                >

                    {/* Background Image */}

                    <div
                        className="
        absolute
        inset-0
        bg-cover
        bg-center
        "
                        style={{
                            backgroundImage:
                                "url('https://indiatravel.app/wp-content/uploads/2024/05/Assam-Seasons-1024x585.jpg')"
                        }}
                    />

                    {/* Dark Overlay */}

                    <div
                        className="
        absolute
        inset-0
        bg-black/40
        backdrop-blur-sm
        "
                    />

                    {/* Content */}

                    <div
                        className="
        relative
        z-10
        p-8
        md:p-12
        text-white
        "
                    >

                        <h1
                            className="
            text-4xl
            md:text-6xl
            font-bold
            "
                        >
                            🌿 EcoGuard AI
                        </h1>

                        <p
                            className="
            mt-3
            text-lg
            md:text-xl
            text-green-100
            "
                        >
                            Real-Time Tourism Intelligence Dashboard
                        </p>

                        <p
                            className="
            mt-2
            text-sm
            md:text-base
            text-gray-200
            "
                        >
                            AI-powered sustainable tourism forecasting and environmental monitoring
                        </p>

                        {/* Weather Stats */}

                        <div
                            className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
            mt-10
            "
                        >

                            <div
                                className="
                bg-white/10
                backdrop-blur-md
                rounded-2xl
                p-5
                border
                border-white/20
                "
                            >

                                <p className="text-green-100">
                                    🌡 Temperature
                                </p>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                                >
                                    {weather.weather?.temperature ?? 0}°C
                                </h2>

                            </div>

                            <div
                                className="
                bg-white/10
                backdrop-blur-md
                rounded-2xl
                p-5
                border
                border-white/20
                "
                            >

                                <p className="text-green-100">
                                    💧 Humidity
                                </p>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                                >
                                    {weather.weather?.humidity ?? 0}%
                                </h2>

                            </div>

                            <div
                                className="
                bg-white/10
                backdrop-blur-md
                rounded-2xl
                p-5
                border
                border-white/20
                "
                            >

                                <p className="text-green-100">
                                    🌧 Rainfall
                                </p>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                                >
                                    {weather.weather?.rainfall ?? 0} mm
                                </h2>

                            </div>

                            <div
                                className="
                bg-white/10
                backdrop-blur-md
                rounded-2xl
                p-5
                border
                border-white/20
                "
                            >

                                <p className="text-green-100">
                                    📊 Crowd Level
                                </p>

                                <h2
                                    className="
                    text-3xl
                    font-bold
                    mt-2
                    "
                                >
                                    {weather.crowdLevel ?? "Low"}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>
                {/* KPI Cards */}

                <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-5
                    gap-6
                    mb-8
                    "
                >

                    <ForecastCard
                        visitors={
                            weather.visitors ?? 0
                        }
                    />

                    <CrowdLevelCard
                        level={
                            weather.crowdLevel ??
                            "Low"
                        }
                    />

                    <OccupancyCard
                        occupancy={
                            weather.occupancy ?? 0
                        }
                    />

                    <RevenueCard
                        visitors={
                            weather.visitors ?? 0
                        }
                    />

                    <ClimateImpactCard
                        climateImpact={
                            weather.climateImpact ??
                            "Moderate"
                        }
                        temperature={
                            weather.weather?.temperature ??
                            0
                        }
                        humidity={
                            weather.weather?.humidity ??
                            0
                        }
                        rainfall={
                            weather.weather?.rainfall ??
                            0
                        }
                    />

                </div>

                {/* Chart */}

                <ForecastChart
                    data={
                        weather.weeklyForecast ??
                        []
                    }
                />

                {/* Weekly + Alerts */}

                <div
                    className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-6
                    mt-8
                    "
                >

                    <WeeklyForecast
                        data={
                            weather.weeklyForecast ??
                            []
                        }
                    />

                    <ActionAlerts
                        alerts={
                            weather.alerts ??
                            []
                        }
                    />

                </div>

                {/* Destination */}

                <div className="mt-8">

                    <DestinationForecast
                        data={
                            weather.destinationForecast ??
                            []
                        }
                    />

                </div>

            </div>
        </>
    );
}

export default CrowdForecasting;