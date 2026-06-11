import React from "react";
import {
  MapPin,
  CloudSun,
  Users,
  Leaf,
  Route,
  ArrowRight,
} from "lucide-react";

const PlaceDetailsPage = () => {
  const routes = [
    {
      name: "Central Range Safari Route",
      distance: "12 km",
      ecoScore: 9.8,
    },
    {
      name: "Western Range Rhino Trail",
      distance: "8 km",
      ecoScore: 9.5,
    },
  ];

  const homestays = [
    {
      id: 1,
      name: "Kaziranga Eco Village",
      price: "₹3,200",
      ecoScore: 9.6,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    {
      id: 2,
      name: "Rhino View Homestay",
      price: "₹2,800",
      ecoScore: 9.1,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F6]">

      {/* HERO */}
      <div className="relative h-[420px]">

        <img
          src="https://images.unsplash.com/photo-1516939884455-1445c8652f83"
          alt="Kaziranga"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-10 left-10 text-white">

          <div className="inline-flex bg-green-700 px-4 py-1 rounded-full text-sm">
            UNESCO WORLD HERITAGE SITE
          </div>

          <h1 className="text-5xl font-bold mt-4">
            Kaziranga National Park
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <MapPin size={18} />
            Golaghat & Nagaon, Assam
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6">

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 shadow">

              <h2 className="text-2xl font-bold mb-4">
                The Rhino Kingdom
              </h2>

              <p className="text-gray-600 leading-relaxed">
                Kaziranga National Park is one of India's most
                famous wildlife reserves and a UNESCO World
                Heritage Site. Home to the world's largest
                population of the One-Horned Rhinoceros,
                Kaziranga protects rich biodiversity including
                tigers, elephants, swamp deer, and over 500
                bird species.
              </p>

            </div>

            {/* Routes */}
            <div className="bg-white rounded-3xl p-6 shadow">

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Curated Eco Routes
                </h2>

                <button className="text-green-700">
                  View All
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">

                {routes.map((route, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-5 hover:shadow-lg transition"
                  >
                    <Route className="text-green-700 mb-3" />

                    <h3 className="font-semibold">
                      {route.name}
                    </h3>

                    <div className="flex justify-between mt-3">

                      <span>{route.distance}</span>

                      <span className="font-bold text-green-700">
                        Eco {route.ecoScore}
                      </span>

                    </div>
                  </div>
                ))}

              </div>

            </div>

            {/* Nearby Homestays */}
            <div className="bg-white rounded-3xl p-6 shadow">

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">
                  Nearby Eco Homestays
                </h2>

                <button className="text-green-700">
                  Explore More
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">

                {homestays.map((home) => (
                  <div
                    key={home.id}
                    className="rounded-2xl overflow-hidden border hover:shadow-lg"
                  >

                    <img
                      src={home.image}
                      alt={home.name}
                      className="h-48 w-full object-cover"
                    />

                    <div className="p-4">

                      <h3 className="font-semibold text-lg">
                        {home.name}
                      </h3>

                      <div className="flex justify-between mt-3">

                        <span>{home.price}/night</span>

                        <span className="font-bold text-green-700">
                          Eco {home.ecoScore}
                        </span>

                      </div>

                      <button className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl">
                        View Stay
                      </button>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Weather */}
            <div className="bg-green-900 text-white rounded-3xl p-6">

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-sm opacity-80">
                    Current Weather
                  </p>

                  <h2 className="text-5xl font-bold mt-3">
                    28°
                  </h2>
                </div>

                <CloudSun size={42} />

              </div>

              <div className="mt-5">
                Humidity: 84%
              </div>

              <div>Partly Cloudy</div>

            </div>

            {/* Crowd Intelligence */}
            <div className="bg-white rounded-3xl p-6 shadow">

              <div className="flex items-center gap-3">

                <Users className="text-orange-500" />

                <h3 className="font-bold">
                  Crowd Intelligence
                </h3>

              </div>

              <p className="mt-4 text-gray-600">
                Moderate visitor activity
              </p>

              <div className="bg-orange-50 mt-4 p-4 rounded-xl">
                <strong>1850</strong> visitors predicted
                this week
              </div>

            </div>

            {/* Sustainability */}
            <div className="bg-[#063B2D] text-white rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <Leaf />

                <h3 className="font-bold">
                  Sustainability Impact
                </h3>

              </div>

              <div className="mt-6 space-y-5">

                <div>
                  <div className="flex justify-between">
                    <span>Water Conservation</span>
                    <span>88%</span>
                  </div>

                  <div className="h-2 bg-white/20 rounded-full mt-2">
                    <div className="h-2 w-[88%] bg-green-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Renewable Energy</span>
                    <span>76%</span>
                  </div>

                  <div className="h-2 bg-white/20 rounded-full mt-2">
                    <div className="h-2 w-[76%] bg-green-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <span>Wildlife Protection</span>
                    <span>94%</span>
                  </div>

                  <div className="h-2 bg-white/20 rounded-full mt-2">
                    <div className="h-2 w-[94%] bg-green-400 rounded-full" />
                  </div>
                </div>

              </div>

            </div>

            {/* Conservation Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6">

              <h3 className="font-bold text-amber-700">
                Conservation Advisory
              </h3>

              <p className="mt-3 text-sm text-amber-800">
                Maintain safe distance from wildlife.
                Feeding animals is prohibited.
                Follow designated safari routes.
              </p>

            </div>

            {/* CTA */}
            <button className="w-full bg-[#8B5E34] hover:bg-[#734b27] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
              Explore Homestays
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;