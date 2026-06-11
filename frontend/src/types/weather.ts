export interface WeatherData {

    visitors: number;

    crowdLevel: string;

    occupancy: number;

    climateImpact: string;

    weather: {

        temperature: number;

        humidity: number;

        rainfall: number;

        wind: number;

        condition: string;
    };

    weeklyForecast: {

        day: string;

        visitors: number;

    }[];

    destinationForecast: {

        destination: string;

        visitors: number;

        status: string;

    }[];

    alerts: {

        type: string;

        title: string;

    }[];
}