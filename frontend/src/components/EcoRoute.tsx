import { useState } from "react";
import axios from 'axios';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export default function EcoRoute() {
    const [origin, setOrigin] = useState('Silchar, Assam');
    const [destination, setDestination] = useState('Kaziranga, Assam');
    const [bestRoute, setBestRoute] = useState<any>(null);
    const [alternatives, setAlternatives] = useState<any[]>([]);
    const [originCoords, setOriginCoords] = useState<any>(null);
    const [destinationCoords, setDestinationCoords] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const redIcon = new L.Icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const handleSearch = async () => {
        try {
            setLoading(true);

            const res = await axios.get('http://localhost:5000/api/routes/eco', {
                params: { origin, destination }
            });

            setBestRoute(res.data.bestRoute);
            setAlternatives(res.data.alternatives);
            setOriginCoords(res.data.origin);
            setDestinationCoords(res.data.destination);
        } catch (error: any) {
            console.log(error?.response?.data || error.message);
            alert(error?.response?.data?.error || 'Failed to fetch route');
        } finally {
            setLoading(false);
        }
    };

    const routePositions = bestRoute?.geometry?.coordinates?.map((coord: number[]) =>
        [coord[1], coord[0]]) || [];

    return (
        <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-4 bg-">
                <input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="border rounded-xl p-3"
                    placeholder="Enter origin"
                />
                <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border rounded-xl p-3"
                    placeholder="Enter destination"
                />
                <button
                    onClick={handleSearch}
                    className="bg-green-700 text-white rounded-xl px-4 py-3"
                >
                    {loading ? 'Finding...' : 'Find eco route'}
                </button>
            </div>

            <MapContainer
                center={[24.83, 92.78]}
                zoom={7}
                style={{ height: '500px', width: '100%', borderRadius: '16px' }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {originCoords && (
                    <Marker position={[originCoords.lat, originCoords.lon]} icon={redIcon}>
                        <Popup>Origin: {originCoords.display_name}</Popup>
                    </Marker>
                )}

                {destinationCoords && (
                    <Marker position={[destinationCoords.lat, destinationCoords.lon]} icon={redIcon}>
                        <Popup>Destination: {destinationCoords.display_name}</Popup>
                    </Marker>
                )}

                {routePositions.length > 0 && (
                    <Polyline
                        positions={routePositions as any}
                        pathOptions={{ color: "#ff0000" }}
                        weight={5}
                    />
                )}
            </MapContainer>

            {bestRoute && (
                <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-green-50">Eco Score: {bestRoute.ecoScore}</div>
                    <div className="p-4 rounded-xl bg-blue-50">Distance: {bestRoute.distanceKm} km</div>
                    <div className="p-4 rounded-xl bg-yellow-50">Duration: {bestRoute.durationMin} min</div>
                    <div className="p-4 rounded-xl bg-slate-50">
                        Carbon: {bestRoute.estimatedCarbonKg} kg
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
    )
}