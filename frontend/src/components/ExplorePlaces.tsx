import React from "react";
import Navbar from "./Navbar";

export default function ExplorePlaces() {

    const openGeoMap = () => {
        window.location.href = "/plane-route";
    }

    return (
        <div className="w-full min-h-screen">
            <Navbar role="traveller" userName="Aminur" />

            {/* HERO SECTION */}
            <div className="px-6 md:px-16 py-16 md:py-24 bg-[#f5f7f4]">
                <p className="text-xs tracking-widest text-green-600 uppercase mb-4">
                    Sustainable Expeditions
                </p>

                <h1 className="text-4xl md:text-7xl font-serif leading-tight text-gray-900">
                    Discover <span className="text-green-500 italic">Untouched</span>
                    <br /> Assam.
                </h1>

                <p className="mt-6 max-w-2xl text-gray-600 text-sm md:text-lg leading-relaxed">
                    Embark on a journey through the lungs of the East. Our AI-curated
                    selection prioritizes conservation, minimal footprint, and deep
                    cultural immersion.
                </p>
            </div>

            <div className="px-6 md:px-16 pb-16 bg-[#f5f7f4] rounded-b-3xl">

                {/* Tabs */}
                <div className="flex gap-6 text-sm mb-6 border-b pb-2">
                    <button className="text-green-600 border-b-2 border-green-600 pb-1">
                        All Destinations
                    </button>
                    <button className="text-gray-500 hover:text-green-600">Wilderness</button>
                    <button className="text-gray-500 hover:text-green-600">Culture</button>
                    <button className="text-gray-500 hover:text-green-600">Tea Estates</button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Large Card */}
                    <div className="md:col-span-2 relative rounded-3xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600"
                            className="w-full h-[300px] md:h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs uppercase">Wilderness • Eco-Rating 9.6</p>
                            <h3 className="text-2xl font-serif mt-1">Kaziranga Sanctuary</h3>
                            <p className="text-sm text-gray-200">
                                The legendary home of one-horned rhinoceros.
                            </p>
                        </div>

                        <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur px-4 py-2 rounded-xl text-white text-sm">
                            Low Density • 12 travelers
                        </div>
                    </div>

                    {/* Map Card */}
                    <div className="relative bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 text-white flex items-end">
                        <div>
                            <p className="text-xs uppercase">Culture</p>
                            <h3 className="text-xl font-semibold mt-2">Majuli Island</h3>
                            <p className="text-sm text-white/80">
                                World's largest river island & neo-Vaishnavite hub.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative rounded-3xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?q=80&w=800"
                            className="w-full h-64 object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs uppercase">Wilderness</p>
                            <h3 className="text-lg font-semibold">Manas Forest</h3>
                            <p className="text-xs">UNESCO World Heritage site</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="md:col-span-2 relative rounded-3xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?q=80&w=1600"
                            className="w-full h-[300px] object-cover group-hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 bg-black/30" />

                        <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-xs uppercase">Tea Estates</p>
                            <h3 className="text-2xl font-serif mt-1">Hoollongapar Trails</h3>
                            <p className="text-sm text-gray-200">
                                Explore tea gardens and gibbon habitats.
                            </p>
                        </div>

                        <button className="absolute bottom-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm hover:bg-gray-200">
                            View Details →
                        </button>
                    </div>

                </div>
            </div>
            {/* SECTION 1 */}
            <div className="w-full flex flex-col md:flex-row gap-6 px-4 md:px-10 py-10 my-10 bg-white">

                {/* LEFT */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/3 text-center">
                    <div className="bg-emerald-200 w-16 h-16 md:w-20 md:h-20 p-4 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-leaf text-green-500 text-xl md:text-2xl"></i>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold mt-3">84%</h1>
                    <p className="text-sm md:text-base text-gray-600">CONSERVATION OFFSET</p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center w-full md:w-2/3 md:px-10 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-serif mb-3">
                        Travel with Intelligence.
                    </h1>
                    <p className="font-serif text-gray-500 text-sm md:text-lg leading-relaxed">
                        "EcoGuard AI utilizes real-time satellite imagery and ground sensors
                        to redirect foot traffic, ensuring that Assam's delicate ecosystems
                        remain undisturbed while providing you the most serene experience."
                    </p>
                </div>
            </div>


            {/* SECTION 2 */}
            <div className="w-full flex items-center justify-center px-4 md:px-10 py-10 my-10 bg-white">

                <div className="relative rounded-3xl overflow-hidden group w-full md:w-[80%]">

                    <img
                        src="https://techcrunch.com/wp-content/uploads/2022/07/GettyImages-1392356345.jpg"
                        className="w-full h-48 sm:h-64 md:h-80 object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute inset-0 bg-black/60" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 gap-4">
                        <h1 className="font-serif font-bold text-lg sm:text-xl md:text-3xl">
                            Explore Interactive Geo-Map
                        </h1>

                        <button
                            onClick={openGeoMap}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 md:px-6 md:py-3 rounded-3xl flex gap-2 items-center"
                        >
                            <i className="fa-solid fa-map"></i>
                            Open Geo-Map
                        </button>
                    </div>

                </div>
            </div>
        </div >
    );
}
