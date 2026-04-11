import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import Navbar from "./Navbar";
import { useMap } from "react-leaflet";

export default function PlanRoute() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [bestRoute, setBestRoute] = useState<any>(null);
    const [alternatives, setAlternatives] = useState<any[]>([]);
    const [originCoords, setOriginCoords] = useState<any>(null);
    const [destinationCoords, setDestinationCoords] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const generateRoute = async () => {
        try {
            setLoading(true);

            const res = await axios.get('http://localhost:5000/api/routes/eco', {
                params: { origin, destination }
            });

            setBestRoute(res.data.bestRoute);
            setOriginCoords(res.data.origin);
            setAlternatives(res.data.alternatives);
            setDestinationCoords(res.data.destination);
        } catch (error: any) {
            alert(error?.response?.data?.error || 'Failed to fetch route');
        } finally {
            setLoading(false);
        }
    };

    const routePositions = bestRoute?.geometry?.coordinates?.map((coord: number[]) =>
        [coord[1], coord[0]]) || [];



    return (
        <div className="w-full h-screen relative">

            <Navbar role="traveller" userName="Aminur" />

            {/* FULLSCREEN MAP */}
            <MapContainer
                center={[24.83, 92.78]}
                zoom={7}
                className="absolute inset-0 w-full h-full z-0"
            >
                <AutoFitBounds routePositions={routePositions} />

                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {originCoords && (
                    <Marker position={[originCoords.lat, originCoords.lon]}>
                        <Popup autoClose={false} closeOnClick={false}>
                            📍 {originCoords.displayName}
                        </Popup>
                    </Marker>
                )}

                {destinationCoords && (
                    <Marker position={[destinationCoords.lat, destinationCoords.lon]}>
                        <Popup autoClose={false} closeOnClick={false}>
                            📍 {destinationCoords.displayName}
                        </Popup>
                    </Marker>
                )}

                {routePositions.length > 0 && (
                    <Polyline positions={routePositions} color="green" weight={3} />
                )}
            </MapContainer>

            {/* FLOATING INPUT PANEL (LIKE UBER) */}
            <div className="absolute top-40 left-4 md:left-10 w-[50%] md:w-[340px] bg-white/50 backdrop-blur rounded-3xl p-6 shadow-xl z-10">
                <h2 className="text-2xl font-serif text-gray-900">Plan Route</h2>

                <div className="mt-4">
                    <p className="text-xs text-gray-500 uppercase">Origin</p>
                    <div className="w-full flex gap-2 items-center rounded-full bg-white outline-none mt-2 px-4 py-2">
                        <i className="fa-solid fa-location-dot text-green-500"></i>
                        <input
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Enter origin"
                            className="w-full bg-white outline-none"
                        />
                    </div>
                </div>

                <div className="mt-3">
                    <p className="text-xs text-gray-500 uppercase">Destination</p>
                    <div className="w-full flex gap-2 items-center rounded-full bg-white  outline-none mt-2 px-4 py-2">
                        <i className="fa-solid fa-map-pin text-red-700"></i>
                        <input
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination"
                            className="w-full bg-white  outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={generateRoute}
                    className="mt-5 w-full bg-gradient-to-br from-[#69e6b2]  to-[#46a57a]  hover:bg-green-400 text-white py-3 rounded-full">
                    {loading ? 'Finding...' : '✨ Generate Route'}
                </button>
            </div>

            {/* FLOATING BOTTOM PANEL */}
            {bestRoute && (
                <div className="absolute bottom-4 left-0 w-full px-4 md:px-10 z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div className="bg-white/50 backdrop-blur p-4 rounded-2xl shadow">
                            <p className="text-xs text-green-600">Eco Score</p>
                            <h3 className="text-xl font-bold">{bestRoute.ecoScore}</h3>
                        </div>

                        <div className="bg-white/50 backdrop-blur p-4 rounded-2xl shadow">
                            <p className="text-xs text-red-500">CO₂ Savings</p>
                            <h3 className="text-xl font-bold">{bestRoute.estimatedCarbonKg}kg</h3>
                        </div>

                        <div className="bg-white/50 backdrop-blur p-4 rounded-2xl shadow">
                            <p className="text-xs text-green-600">Recommended</p>
                            <h3 className="font-semibold">{bestRoute.recommendedRoute}</h3>
                            <p className="text-xs">{bestRoute.recommendedTime} • {bestRoute.recommendedImpact}</p>
                        </div>

                        <div className="bg-white/50 backdrop-blur p-4 rounded-2xl shadow">
                            <p className="text-xs">Fastest</p>
                            <h3 className="font-semibold">Distance: {bestRoute.distanceKm} km</h3>
                            <p className="text-xs">Duration: {bestRoute.durationMin} min</p>
                        </div>
                    </div>
                </div>
            )}
            {alternatives.length > 0 && (
                <div className="space-y-2">
                    {alternatives.map((route) => (
                        <div key={route.id} className="border rounded-xl p-4">
                            Route {route.id} — Eco {route.ecoScore} — {route.distanceKm} km — {route.durationMin} min
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function AutoFitBounds({ routePositions }: any) {
    const map = useMap();

    useEffect(() => {
        if (routePositions && routePositions.length > 0) {
            map.flyToBounds(routePositions, { padding: [50, 50], duration: 1.5 });
        }
    }, [routePositions, map]);

    return null;
}