import React, { useState } from "react";
import { Search, Filter, Download, Check, X } from "lucide-react";
import Navbar from "../components/Navbar";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

type Booking = {
    id: number;
    guestName: string;
    guests: string;
    type: string;
    dates: string;
    property: string;
    status: BookingStatus;
};

const bookings: Booking[] = [
    {
        id: 1,
        guestName: "Alex Johnson",
        guests: "2 guests",
        type: "Luxury Stay",
        dates: "Oct 12 - Oct 15, 2024",
        property: "Alpine Pine Eco-Cabin",
        status: "PENDING",
    },
    {
        id: 2,
        guestName: "Sarah Rivera",
        guests: "4 guests",
        type: "Family Travel",
        dates: "Nov 02 - Nov 08, 2024",
        property: "Solar Lakeside Lodge",
        status: "CONFIRMED",
    },
    {
        id: 3,
        guestName: "Marcus Knight",
        guests: "1 guest",
        type: "Business Trip",
        dates: "Oct 20 - Oct 22, 2024",
        property: "Alpine Pine Eco-Cabin",
        status: "PENDING",
    },
    {
        id: 4,
        guestName: "Jane Doe",
        guests: "2 guests",
        type: "Couple Stay",
        dates: "Oct 05 - Oct 06, 2024",
        property: "Solar Lakeside Lodge",
        status: "CANCELLED",
    },
];

export default function BookingManagement() {
    const [tab, setTab] = useState("ALL");

    const filtered = bookings.filter((b) => {
        if (tab === "ALL") return true;
        if (tab === "PENDING") return b.status === "PENDING";
        if (tab === "CONFIRMED") return b.status === "CONFIRMED";
        return true;
    });

    return (
        <>
            <Navbar role="vendor" userName="Aminur" />
            <div className="flex min-h-screen bg-gray-100">               
                {/* Main */}
                <main className="flex-1 p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-3xl font-bold">Booking Requests</h2>
                            <p className="text-gray-500 text-sm">
                                Efficiently manage and track your guest reservations.
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-sm text-gray-500">Total Pending</p>
                            <h3 className="text-xl font-bold text-orange-600">12</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-sm text-gray-500">Confirmed</p>
                            <h3 className="text-xl font-bold text-green-600">48</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow">
                            <p className="text-sm text-gray-500">Revenue Forecast</p>
                            <h3 className="text-xl font-bold">$8.4K</h3>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow bg-green-900 text-white">
                            <p className="text-sm">Eco Impact</p>
                            <h3 className="text-xl font-bold">2.4t CO₂</h3>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                        {/* Tabs */}
                        <div className="flex gap-2">
                            {["ALL", "PENDING", "CONFIRMED"].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`px-3 py-1 rounded-full text-sm ${tab === t
                                            ? "bg-green-700 text-white"
                                            : "bg-white text-gray-600"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow">
                                <Search size={16} className="text-gray-400" />
                                <input
                                    placeholder="Search guests or properties..."
                                    className="outline-none ml-2 text-sm"
                                />
                            </div>

                            <button className="bg-white p-2 rounded-lg shadow">
                                <Filter size={18} />
                            </button>

                            <button className="bg-green-700 text-white px-3 py-2 rounded-lg flex items-center gap-1">
                                <Download size={16} /> Export
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3">Guest</th>
                                    <th className="p-3">Stay</th>
                                    <th className="p-3">Property</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filtered.map((b) => (
                                    <tr key={b.id} className="border-b">
                                        <td className="p-3">
                                            <div className="font-medium">{b.guestName}</div>
                                            <div className="text-xs text-gray-500">{b.guests}</div>
                                        </td>

                                        <td className="p-3">{b.dates}</td>

                                        <td className="p-3">{b.property}</td>

                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${b.status === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : b.status === "CONFIRMED"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <div className="flex justify-end gap-2">
                                                {b.status === "PENDING" && (
                                                    <>
                                                        <button className="text-green-600 flex items-center gap-1">
                                                            <Check size={14} /> Approve
                                                        </button>
                                                        <button className="text-red-600 flex items-center gap-1">
                                                            <X size={14} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-between items-center p-4 text-sm">
                            <p className="text-gray-500">Showing 4 of 12 booking requests</p>

                            <div className="flex gap-2">
                                <button className="px-2 py-1 bg-gray-200 rounded">1</button>
                                <button className="px-2 py-1 bg-white border rounded">2</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}