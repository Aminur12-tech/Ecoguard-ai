import express from 'express';
import { getAlternativeRoutes } from '../services/googleRoutes';
import { getWeatherScore } from '../services/weather';
import { calculateEcoScore } from '../services/ecoScore';


const router  = express.Router();

router.get('/eco-score', async (req, res) => {
    try{
        const { origin, destination } = req.query as {
            origin: string;
            destination: string;
        };

        console.log("origin:", origin, "destination:", destination);

        if(!origin || !destination){
            return res.status(400).json({ error: 'origin and destination are required'});
        }

        const routes = await getAlternativeRoutes(origin, destination);
        console.log("Received routes from Google: ", routes);

        const scoredRoutes = await Promise.all(
            routes.map(async (route: any, index: number) => {
                const firstLeg = route.legs?.[0];
                const startlat = firstLeg?.startLocation?.latLng?.latitude;
                const startLng =  firstLeg?.startLocation?.latLng?.longitude;

                const weather = await getWeatherScore(startlat, startLng);
                console.log(`weather for route ${index + 1}:`, weather);

                const score = calculateEcoScore({
                    distanceMeters: route.distanceMeters,
                    durationSeconds: Number(String(route.duration).replace('s', '')),
                    rainMm: weather.rainMm,
                    rainProbability: weather.rainProbability
                });
                console.log(`eco score for route ${index +1}: `, score);

                return {
                    id: index + 1,
                    polyline: route.polyline?.encodedPolyline,
                    ...weather,
                    ...score
                };
            })
        );


        scoredRoutes.sort((a, b) => b.ecoScore - a.ecoScore);

        return res.json({
            bestRoute:scoredRoutes[0],
            alternatives: scoredRoutes
        });

    }catch (error: any){
        return res.status(500).json({ error: error.message || 'Failed to compute eco route'
        });
    }
});


export default router;