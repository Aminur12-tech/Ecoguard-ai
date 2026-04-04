import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

declare global {
    interface Window {
        google: any;
    }
}

export default function TravellerDashboard() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<any>(null);
    const currentPolyline = useRef<any>(null);

    const [origin, setOrigin] = useState('26.1445,91.7362');
    const [destination, setDestination] = useState('26.5775,93.1711');
    const [bestRoute, setBestRoute] = useState<any>(null);
    const [alternatives, setAlternatives] = useState<any[]>([]);

    useEffect(() => {
        async function initMap() {
            try {
                const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

                if (!mapsKey) {
                    console.error('Missing REACT_APP_GOOGLE_MAPS_API_KEY');
                    return;
                }

                await loadGoogleMaps(mapsKey);

                mapInstance.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 26.5, lng: 92.2 },
                    zoom: 8,
                });
            } catch (error) {
                console.error('Map init failed:', error);
            }
        }

        initMap();
    }, []);

    const drawRoute = (encodedPolyline: string, color = '#0f766e') => {
        if (!mapInstance.current || !window.google?.maps?.geometry) return;

        const path = window.google.maps.geometry.encoding.decodePath(encodedPolyline);

        if (currentPolyline.current) {
            currentPolyline.current.setMap(null);
        }

        const polyline = new window.google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: 0.9,
            strokeWeight: 6
        });

        polyline.setMap(mapInstance.current);
        currentPolyline.current = polyline;

        const bounds = new window.google.maps.LatLngBounds();
        path.forEach((p: any) => bounds.extend(p));
        mapInstance.current.fitBounds(bounds);
    };

    const handleSearch = async () => {
        const res = await axios.get('http://127.0.0.1:5000/api/routes/eco-score', {
            params: { origin, destination }
        });

        setBestRoute(res.data.bestRoute);
        setAlternatives(res.data.alternatives);
        drawRoute(res.data.bestRoute.polyline);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
                <input
                    className="border rounded-xl p-3"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="lat,lng"
                />
                <input
                    className="border rounded-xl p-3"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="lat,lng"
                />
                <button
                    className="bg-teal-700 text-white rounded-xl px-4 py-3"
                    onClick={handleSearch}
                >
                    Find eco route
                </button>
            </div>

            <div ref={mapRef} className="w-full h-[500px] rounded-2xl border" />

            {bestRoute && (
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50">
                        Eco Score: {bestRoute.ecoScore}
                    </div>
                    <div className="p-4 rounded-xl bg-blue-50">
                        Distance: {bestRoute.distanceKm} km
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50">
                        Duration: {bestRoute.durationMin} min
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50">
                        Carbon: {bestRoute.estimatedCarbonKg} kg
                    </div>
                </div>
            )}

            {alternatives.length > 0 && (
                <div className="space-y-3">
                    {alternatives.map((route) => (
                        <button
                            key={route.id}
                            onClick={() => drawRoute(route.polyline, route.id === bestRoute?.id ? '#0f766e' : '#475569')}
                            className="block w-full text-left border rounded-xl p-4"
                        >
                            Route {route.id} — Eco {route.ecoScore} — {route.distanceKm} km — {route.durationMin} min
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const loadGoogleMaps = (apiKey: string) =>
    new Promise<void>((resolve, reject) => {
        if (!apiKey) {
            reject(new Error('Google Maps API key is missing'));
            return;
        }

        if (window.google?.maps) {
            resolve();
            return;
        }

        const existingScript = document.querySelector(
            'script[data-google-maps="true"]'
        ) as HTMLScriptElement | null;

        if (existingScript) {
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', () =>
                reject(new Error('Google Maps script failed to load'))
            );
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
        script.async = true;
        script.defer = true;
        script.setAttribute('data-google-maps', 'true');
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google Maps script failed to load'));
        document.body.appendChild(script);
    });