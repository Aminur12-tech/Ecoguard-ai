import axios from 'axios';


export async function getAlternativeRoutes(origin: string, destination: string){
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const [oLat, oLng] = origin.split(',').map(Number);
    const [dLat, dLng] = destination.split(',').map(Number);

    const body = {
        origin: {
            location: { latLng: { latitude: oLat, longitude: oLng}}
        },
        destination: {
            location: { latLng: { latitude: dLat, longitude: dLng}}
        },
        travelMode: 'Drive',
        routingPreference: 'TRAFFIC_AWARE',
        computerAlternativeRoutes: true
    };

    const headers = {
        'Content-Type' : 'application/json',
        'X-Goog-Api-Key' : apiKey,
        'X-Goog-FieldMask' : 'routes.duration,routes.distanceMeters,routes.Polyline.encodedPoliline,routes.legs'
    };

    const res = await axios.post(
        'https://routes.googleapis.com/directions/v2:computeRoutes',
        body,
        { headers }
    );


    return res.data.routes || [];
}