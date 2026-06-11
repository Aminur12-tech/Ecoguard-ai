import React from "react";
import { Plus, Edit, Trash2, MapPin, Star } from "lucide-react";
import Navbar from "../components/Navbar";

type Homestay = {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    beds: number;
    status: "AVAILABLE" | "BOOKED";
    image: string;
    tag: string;
};

const homestays: Homestay[] = [
    {
        id: 1,
        name: "Whispering Pines A-Frame",
        location: "Assam Hills",
        price: 240,
        rating: 4.9,
        beds: 2,
        status: "AVAILABLE",
        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        tag: "CARBON NEUTRAL",
    },
    {
        id: 2,
        name: "Azure Cliffside Retreat",
        location: "Coastal View",
        price: 385,
        rating: 4.7,
        beds: 3,
        status: "BOOKED",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        tag: "SOLAR POWERED",
    },
    {
        id: 3,
        name: "Verdant Urban Sanctuary",
        location: "City Green Zone",
        price: 195,
        rating: 4.8,
        beds: 1,
        status: "AVAILABLE",
        image:
            "https://images.unsplash.com/photo-1449844908441-8829872d2607",
        tag: "LOCAL SOURCED",
    },
];

export default function HomestayManagement() {
    return (
        <>
            <Navbar role="vendor" userName="Aminur" />
            <div className="flex min-h-screen bg-gray-100">
                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Top Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Manage Properties</h2>
                        <button className="bg-green-700 text-white px-4 py-2 rounded-xl flex items-center gap-2">
                            <Plus size={18} /> Add Homestay
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Total Listings</p>
                            <h3 className="text-xl font-bold">12</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">Active Bookings</p>
                            <h3 className="text-xl font-bold">28</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm">CO₂ Offset</p>
                            <h3 className="text-xl font-bold">4.2t</h3>
                        </div>
                    </div>

                    {/* Listings */}
                    <h3 className="text-lg font-semibold mb-4">Current Homestays</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        {homestays.map((h) => (
                            <div key={h.id} className="bg-white rounded-2xl shadow overflow-hidden">
                                <img src={h.image} className="h-40 w-full object-cover" />

                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                            {h.tag}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${h.status === "AVAILABLE"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {h.status}
                                        </span>
                                    </div>

                                    <h4 className="font-semibold mt-2">{h.name}</h4>

                                    <div className="flex items-center text-sm text-gray-500 gap-2">
                                        <MapPin size={14} /> {h.location}
                                    </div>

                                    <div className="flex justify-between text-sm mt-2">
                                        <span>${h.price}/night</span>
                                        <span className="flex items-center gap-1">
                                            <Star size={14} /> {h.rating}
                                        </span>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <button className="text-blue-600 flex items-center gap-1 text-sm">
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className="text-red-500 flex items-center gap-1 text-sm">
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sustainability Section */}
                    <div className="mt-10 bg-white p-6 rounded-2xl shadow">
                        <h3 className="text-lg font-semibold">Sustainability Impact</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Your properties have collectively offset 4.2 tons of CO₂ this quarter.
                        </p>

                        <div className="mt-4 bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div className="bg-green-600 h-3 w-[85%]" />
                        </div>

                        <div className="flex justify-between text-sm mt-2">
                            <span>Quarterly Progress</span>
                            <span>85%</span>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}