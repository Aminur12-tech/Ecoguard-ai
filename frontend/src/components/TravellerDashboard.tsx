import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Landing from "../pages/Landing";


export default function TravellerDashboard() {
    const user = { name: "Aminur" };
    return (
        <>
            {/*Hero section*/}
            <div className="w-full h-screen">
                <Navbar role="traveller" userName="Aminur" />
                <div className="relative w-full min-h-full font-sans text-white overflow-hidden rounded-bl-[5rem]">
                    <div
                        className="absolute inset-0 bg-cover bg-center "
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCnvGymadHvCha0X4J03eMVlN_9WXhBfDAE06nHyvu_kl54gCjB9FgzoxAuztkAs2m9b1aPK3F68dHlwosk3WSa-YLVwzoD_vRiUHnjS4EqFPPOr93ggWxG0JkA7_XKzsV7zcUafRtBzo74DQCnDUqRSet5S4LufynCqSEUjHKObcTDlGyM6lAULnBW1v6PcBAchEg8NnRFqSSrV_a4ra8nEe5apOZcZQUWzFu18RN0yC93F-aubpRcODfDuuRiXnyAse5g3A3g2q9q')",
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-between min-h-screen p-6 md:p-12">
                        {/* Top Section */}
                        <div className="max-w-3xl mt-10">


                            <h1 className="mt-6 text-4xl md:text-6xl font-serif leading-tight">
                                Namaste, <span className="text-green-400">{user?.name || "Traveler"}</span>
                            </h1>

                            <p className="mt-4 text-sm md:text-lg text-gray-200 max-w-xl">
                                Your sustainable journey through the pristine highlands and rivers of Assam starts here. Every step you take is tracked for conservation.
                            </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                            {/* Card */}
                            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 w-full md:w-96 shadow-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-300">Current Trip</p>
                                        <h3 className="text-lg font-semibold">Jorhat Highlands</h3>
                                    </div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                                </div>

                                <div className="mt-4">
                                    <div className="flex justify-between text-sm">
                                        <span>Sustainability Score</span>
                                        <span className="font-semibold">98/100</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/20 rounded-full mt-1">
                                        <div className="h-2 bg-green-400 rounded-full w-[98%]" />
                                    </div>
                                </div>

                                <div className="flex justify-between mt-4 text-sm text-gray-300">
                                    <div>
                                        <p>Elevation</p>
                                        <p className="text-white font-semibold">1,450m</p>
                                    </div>
                                    <div>
                                        <p>Air Quality</p>
                                        <p className="text-green-400 font-semibold">Pristine</p>
                                    </div>
                                </div>

                                <button className="mt-6 w-full py-2 rounded-full border border-white/30 hover:bg-white/20 transition">
                                    View Detailed Log →
                                </button>
                            </div>

                            {/* Button */}
                            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full text-sm md:text-base">
                                <span className="text-xl">+</span> New Expedition
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/*recomendation section*/}
            <div className="w-full  text-gray-900 px-6 md:px-12 py-12 relative top-16">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xs tracking-widest text-green-600 uppercase">
                            Curation
                        </p>
                        <h2 className="text-3xl md:text-4xl font-serif">
                            Recommended for You
                        </h2>
                    </div>
                    <button className="text-sm text-green-700 hover:underline">
                        Explore all places →
                    </button>
                </div>



                {/* Content Grid */}
                < div className="grid grid-cols-1 md:grid-cols-3 gap-6" >
                    {/* Left Large Card */}
                    < div className="h-[500px] md:col-span-2 relative rounded-2xl overflow-hidden group" >
                        <img
                            src="https://hikerwolf.com/wp-content/uploads/2020/07/Kaziranga-National-park.jpg"
                            alt="Kaziranga"
                            className="w-full h-[500px] md:h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="text-xs bg-yellow-400 text-black px-3 py-1 rounded-full">
                                Exclusive Access
                            </span>
                            <h3 className="text-xl md:text-2xl font-serif mt-2">
                                Hidden Sanctuaries of Kaziranga
                            </h3>
                            <p className="text-sm text-gray-200 mt-1">
                                A private, guided trek through untouched wetlands and wildlife.
                            </p>
                        </div>
                    </div >

                    {/* Right Side Cards */}
                    < div className="flex flex-col gap-6" >
                        {/* Card 1 */}
                        < div className="rounded-2xl overflow-hidden bg-white shadow" >
                            <img
                                src="https://guwahatiplus.com/storage/app/public/medias/large/10324dbf215641dc77bf974115732e6b.jpg"
                                alt="Ahom"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-semibold">
                                    Echoes of the Ahom Kingdom
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Heritage & Architecture • 4h from Jorhat
                                </p>
                            </div>
                        </div >

                        {/* Card 2 */}
                        < div className="rounded-2xl overflow-hidden bg-white shadow" >
                            <img
                                src="https://static.toiimg.com/thumb/msid-125514594,width-1280,height-720,resizemode-4/125514594.jpg"
                                alt="Silk"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-semibold">
                                    The Silk Artisans of Sualkuchi
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Culture & Craft • Sustainable Tourism
                                </p>
                            </div>
                        </div >
                    </div >
                </div >
            </div >
            {/*Sustainability Section*/}
            <div className="w-full bg-[#eef1ed] px-6 mt-12 md:px-12 py-12 rounded-t-3xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* Left Content */}
                    <div>
                        <p className="text-xs tracking-widest text-emerald-500 uppercase">
                            Your Legacy
                        </p>

                        <h2 className=" text-5xl lg:text-6xl md:text-4xl sm:text-6xl font-serif leading-tight mt-2">
                            Recent Sustainability Impact
                        </h2>

                        <p className="text-sm text-gray-600 mt-4 italic max-w-sm">
                            Nature does not hurry, yet everything is accomplished. Your
                            sustainable choices help preserve ecosystems and support local
                            communities.
                        </p>

                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-10 h-10 flex items-center justify-center bg-emerald-200 rounded-full text-2xl">
                                🌲
                            </div>
                            <div>
                                <p className="font-semibold">14.2 Hectares</p>
                                <p className="text-xs text-gray-500 uppercase">
                                    Forest Restored
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Middle Card */}
                    <div className="h-full bg-white  rounded-2xl p-6  shadow-lg flex flex-col justify-between">
                        <div className="text-emerald-500 text-3xl">
                            <i className="fa-regular fa-cloud"></i>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold">0.8 Tons</p>
                            <p className="text-lg text-gray-500 mt-1">
                                Carbon Offset This Month
                            </p>
                        </div>

                        <p className="text-sm text-emerald-500 mt-6 uppercase">
                            Top 5% of Travelers
                        </p>
                    </div>

                    {/* Right Card */}
                    <div className="h-full  bg-emerald-500 text-white rounded-2xl p-6  shadow-lg flex flex-col justify-between">
                        <div className="text-3xl">
                            <i className="fa-solid fa-hand-holding-heart"></i>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold">₹12k</p>
                            <p className="text-lg mt-1">
                                Direct Support to Local Villages
                            </p>
                        </div>

                        <p className="text-sm mt-6 uppercase">
                            3 Local Communities
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center md:flex-row  justify-between mt-12 p-2 gap-4 border-t-2 border-white">
                    <p className="text-xs text-gray-500">
                        © 2026 Sustainable Travel Platform
                    </p>

                    <div className="flex gap-6 text-xs text-gray-600">
                        <span className="hover:underline cursor-pointer">Privacy Policy</span>
                        <span className="hover:underline cursor-pointer">Safety Protocols</span>
                        <span className="hover:underline cursor-pointer">Community Guide</span>
                    </div>


                </div>
            </div>
        </>
    )
}