import express from 'express';
import axios from 'axios';


const router = express.Router();

async function geocodePlace(place: string){
    const url = 'https://nominatim.openstreetmap.org/search';
    console.log(`Geocoding place: ${place}`);
    const res = await axios.get(url, {
        params: {
            q: place,
            format: 'json',
            limit: 1
        },
        headers: {
            'User-Agent': 'eco-route-app/1.0'
        }
    });

    if(!res.data?.length){
        throw new Error(`Place not found: ${place}`);
    }

    return {
        lat: Number(res.data[0].lat),
        lon: Number(res.data[0].lon),
        displayName: res.data[0].display_name
    };
}


async function getRoutes(origin: {lat: number; lon: number}, destination: {lat: number; lon: number}){
    const url =`https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}`;
    const res = await axios.get(url, {
        params: {
            overview: 'full',
            geometries: 'geojson',
            alternatives: true,
            steps: false
        }
    });
    return res.data.routes || [];
}

async function getWeather(lat:number, lon: number) {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const res =  await axios.get(url, {
        params: {
            latitude: lat, 
            longitude: lon,
            hourly: 'rain,precipitation_probability',
            forecast_days: 1,
            timezone: 'auto'
        }
    });

    return {
        rainMm: Number(res.data?.hourly?.rain?.[0] ?? 0),
        rainProbability: Number(res.data?.hourly?.precipitation_probability?.[0] ?? 0)
    };
}


function calculateEcoScore(input: {
    distanceMeters: number;
    durationSeconds: number;
    rainMm: number;
    rainProbability: number;
}){
    const distanceKm =  input.distanceMeters/1000;
    const durationMin =  input.durationSeconds/60;

    const distancePenalty = distanceKm * 0.5;
    const durationPenalty = durationMin * 0.3;
    const rainPenalty = input.rainMm * 7;
    const rainProbPenalty =  input.rainProbability * 0.08;


    const ecoScore = Math.max( 0, 100 - distancePenalty - durationPenalty - rainPenalty - rainProbPenalty);

    return {
        ecoScore: +ecoScore.toFixed(2),
        distanceKm: +distanceKm.toFixed(2),
        durationMin: +durationMin.toFixed(0),
        estimatedCarbonKg: +(distanceKm * 0.2).toFixed(2)
    };
}

router.get('/eco', async (req, res) => {
    try{
        const {origin, destination} = req.query as {
            origin:  string;
            destination: string;
        };
        console.log(`Received eco route request: origin=${origin}, destination=${destination}`);
        if(!origin || !destination){
            return res.status(400).json({
                error: 'origin and destination are required'
            });
        }

        const originCoords = await geocodePlace(origin);
        const destinationCoords = await geocodePlace(destination);
        console.log(`origincoordes: ${originCoords.lat}, ${originCoords.lon}, destinationCoords: ${destinationCoords.lat}, ${destinationCoords.lon}`);

        const routes = await getRoutes(originCoords, destinationCoords);
        console.log(`Found ${routes.length} routes from OSRM`);

        if(!routes.length){
            return res.status(404).json({error: 'No routes found'});

        }

        const scoredRoutes = await Promise.all(
            routes.map(async (route: any, index: number) => {
                const weather = await getWeather(originCoords.lat, originCoords.lon);
                console.log('weather data:',weather);
                
                const score = calculateEcoScore({
                    distanceMeters: route.distance,
                    durationSeconds: route.duration,
                    rainMm: weather.rainMm,
                    rainProbability: weather.rainProbability
                });

                console.log( 'Score for route:', score);

                return{
                    id: index + 1,
                    geometry:  route. geometry,
                    ...weather,
                    ...score
                };
            })
        );

        scoredRoutes.sort((a, b) => b.ecoScore - a.ecoScore);

        return res.json({
            origin: originCoords,
            destination: destinationCoords,
            bestRoute: scoredRoutes[0],
            alternatives: scoredRoutes
        });
    }catch(error: any){
        console.error('Eco route error: ', error.message);
        return res.status(500).json({
            error: error.message || 'Failed to compute eco route'
        });
    }
});


export default router;