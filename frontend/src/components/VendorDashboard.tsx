import React from "react";
import Navbar from "./Navbar";

type StatCardProps = {
    title: string;
    value: string;
    subtitle?: string;
};

const StatCard = ({ title, value, subtitle }: StatCardProps) => (
    <div className="bg-white rounded-2xl shadow-md p-5">
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
        {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
    </div>
);

const VendorDashboard: React.FC = () => {
    return (
        <>
            <Navbar role="vendor" userName="Aminur" />
            <div className="min-h-screen bg-gray-100">

                {/* HERO SECTION */}
                <div
                    className="h-64 bg-cover bg-center relative flex items-end"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative p-6 text-white">
                        <h1 className="text-3xl font-bold">Verdant Valley</h1>
                        <p className="text-sm opacity-80">
                            Vendor Dashboard • Homestay Management Panel
                        </p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 -mt-10 relative z-10">

                    {/* LEFT SECTION */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* STATS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <StatCard title="Total Bookings" value="128" subtitle="+12 this week" />
                            <StatCard title="Occupancy Rate" value="78%" subtitle="This month" />
                            <StatCard title="Revenue" value="₹1,24,500" subtitle="Monthly earnings" />
                        </div>

                        {/* BOOKINGS OVERVIEW */}
                        <div className="bg-white rounded-2xl shadow-md p-5">
                            <h2 className="font-semibold text-lg mb-4">Booking Overview</h2>

                            <div className="space-y-3">
                                {[
                                    { name: "John Doe", status: "Confirmed", date: "12 Jun" },
                                    { name: "Amit Sharma", status: "Pending", date: "14 Jun" },
                                    { name: "Sara Khan", status: "Completed", date: "10 Jun" },
                                ].map((b, i) => (
                                    <div
                                        key={i}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                                    >
                                        <div>
                                            <p className="font-medium">{b.name}</p>
                                            <p className="text-xs text-gray-500">{b.date}</p>
                                        </div>

                                        <span
                                            className={`text-xs px-3 py-1 rounded-full ${b.status === "Confirmed"
                                                    ? "bg-green-100 text-green-600"
                                                    : b.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-600"
                                                        : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {b.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PROPERTY MANAGEMENT */}
                        <div className="bg-white rounded-2xl shadow-md p-5">
                            <h2 className="font-semibold text-lg mb-4">My Properties</h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "Forest Eco Cottage",
                                        location: "Kaziranga, Assam",
                                        img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
                                    },
                                    {
                                        name: "River View Homestay",
                                        location: "Jorhat, Assam",
                                        img: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
                                    },
                                ].map((p, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl overflow-hidden shadow-sm border"
                                    >
                                        <img
                                            src={p.img}
                                            className="h-32 w-full object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="font-semibold">{p.name}</h3>
                                            <p className="text-xs text-gray-500">{p.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <div className="space-y-6">

                        {/* CUSTOMER INSIGHT */}
                        <div className="bg-white rounded-2xl shadow-md p-5">
                            <h2 className="font-semibold mb-3">Customer Insights</h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span>Repeat Customers</span>
                                    <span className="font-semibold">34%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>New Visitors</span>
                                    <span className="font-semibold">66%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Avg Rating</span>
                                    <span className="font-semibold">4.6 ⭐</span>
                                </div>
                            </div>
                        </div>

                        {/* NOTIFICATION */}
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-5">
                            <h2 className="font-semibold">Notifications</h2>
                            <p className="text-sm mt-2 opacity-90">
                                You have 3 new booking requests waiting for approval.
                            </p>
                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="bg-white rounded-2xl shadow-md p-5">
                            <h2 className="font-semibold mb-3">Quick Actions</h2>

                            <div className="space-y-2">
                                <button className="w-full bg-black text-white py-2 rounded-xl">
                                    Add Property
                                </button>
                                <button className="w-full bg-gray-100 py-2 rounded-xl">
                                    View Analytics
                                </button>
                                <button className="w-full bg-gray-100 py-2 rounded-xl">
                                    Manage Bookings
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default VendorDashboard;