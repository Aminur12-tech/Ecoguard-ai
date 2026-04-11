import Navbar from "./Navbar";

export default function MyTrips() {
    return (
        <>
            <div className="w-full h-screen">
                <Navbar role="traveller" userName="Aminur" />
                <div className="min-h-screen bg-[#eef1ed] px-6 md:px-12 py-10 font-sans text-gray-900">
                    {/* Header */}
                    <div className="mb-10">
                        <p className="text-xs tracking-widest text-green-600 uppercase">
                            Conservation Journey
                        </p>
                        <h1 className="text-3xl md:text-5xl font-serif mt-2">
                            My Expeditions
                        </h1>
                        <p className="text-sm text-gray-600 mt-3 max-w-xl">
                            Track your travel experiences and see how your journeys contribute
                            to sustainability and conservation.
                        </p>
                    </div>
                    {/* Section Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">Upcoming</h2>
                        <span className="text-xs text-gray-500">2 Scheduled</span>
                    </div>
                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 1 */}
                        <div className="bg-white rounded-3xl shadow overflow-hidden">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200"
                                    alt="lion"
                                    className="w-full h-56 object-cover"
                                />
                                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                                    Sustainability Certificate
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Great Hornbill Sanctuary
                                        </h3>
                                        <p className="text-sm text-green-600">
                                            Eastern Range, Kaziranga
                                        </p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500">
                                        <p>Oct 12 - Oct 18</p>
                                        <p>2024 Expedition</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-xs text-gray-500">
                                        <p>Carbon Offset</p>
                                        <p className="font-semibold text-gray-900">1.2 Tons</p>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        <p>Eco Impact</p>
                                        <p className="font-semibold text-gray-900">Tier 1</p>
                                    </div>
                                    <button className="text-sm border px-4 py-1 rounded-full hover:bg-gray-100">
                                        View Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white rounded-3xl shadow overflow-hidden">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200"
                                    alt="tiger"
                                    className="w-full h-56 object-cover"
                                />
                                <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
                                    Certification Pending
                                </span>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            Brahmaputra Delta Survey
                                        </h3>
                                        <p className="text-sm text-green-600">
                                            Riverine Conservation Zone
                                        </p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500">
                                        <p>Nov 04 - Nov 07</p>
                                        <p>2024 Survey</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="text-xs text-gray-500">
                                        <p>Carbon Offset</p>
                                        <p className="font-semibold text-gray-900">0.8 Tons</p>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        <p>Eco Impact</p>
                                        <p className="font-semibold text-gray-900">Tier 2</p>
                                    </div>
                                    <button className="text-sm border px-4 py-1 rounded-full hover:bg-gray-100">
                                        View Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#eef1ed] px-6 md:px-12 py-12">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl md:text-2xl font-serif">Past Memories</h2>
                        <span className="text-xs text-gray-500 uppercase">Last 12 Months</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Memory Card 1 */}
                        <div className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition">
                            <img
                                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800"
                                alt="memory"
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
                                    Certified
                                </span>
                                <h3 className="mt-2 font-semibold">Dibru Saikhowa Wetland</h3>
                                <p className="text-xs text-gray-500">July 14 – July 18, 2024</p>
                                <p className="text-xs text-green-600 mt-2">24 Trees Planted</p>
                            </div>
                        </div>
                        {/* Memory Card 2 */}
                        <div className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition">
                            <img
                                src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800"
                                alt="gibbon"
                                className="w-full h-40 object-cover m-auto"
                            />
                            <div className="p-4">
                                <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
                                    Certified
                                </span>
                                <h3 className="mt-2 font-semibold">Gibbon Canopy Trail</h3>
                                <p className="text-xs text-gray-500">May 20 – May 25, 2024</p>
                                <p className="text-xs text-green-600 mt-2">Bio-Net Zero</p>
                            </div>
                        </div>
                        {/* Add New Card */}
                        <div className="flex items-center justify-center border-2 border-dashed rounded-2xl text-center p-6 hover:bg-gray-50 transition cursor-pointer">
                            <div>
                                <p className="text-sm text-gray-500">Record a local expedition</p>
                                <p className="text-xs text-gray-400 mt-1">Earn eco-points</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-white/30" />

                </div>
            </div>
        
            </>
            );
}