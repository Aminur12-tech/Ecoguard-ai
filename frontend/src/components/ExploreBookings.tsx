import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";



// ============================================
// TYPES
// ============================================
type Homestay = {
  _id: string;

  homestay_name: string;

  district: string;

  property_type: string;

  price_per_night_inr: number;

  avg_rating: number;

  sustainability_score: number;

  eco_certified: boolean;

  amenities: string[];

  eco_features: string[];

  nearest_attraction: string;

  images: string[];
};



type FilterKeys =
  | "ecoCertified"
  | "solarPower"
  | "wifi"
  | "parking";

type FiltersType = {
  ecoCertified: boolean;

  solarPower: boolean;

  wifi: boolean;

  parking: boolean;

  price: number;
};



export default function ExploreAllPlaces() {

  const navigate = useNavigate();

  const [homestays, setHomestays] =
    useState<Homestay[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sort, setSort] =
    useState("rating");

  const [page, setPage] =
    useState(1);

  const [showFilters, setShowFilters] =
    useState(false);

  const [filters, setFilters] =
    useState<FiltersType>({
      ecoCertified: false,

      solarPower: false,

      wifi: false,

      parking: false,

      price: 5000,
    });



  // ============================================
  // TOGGLE FILTER
  // ============================================
  const toggle = (
    key: FilterKeys
  ) => {
    setFilters((prev) => ({
      ...prev,

      [key]: !prev[key],
    }));
  };



  // ============================================
  // FETCH HOMESTAYS
  // ============================================
  useEffect(() => {

    const fetchHomestays = async () => {

      try {

        const response =
          await fetch(
            "http://localhost:5000/api/homestays"
          );

        const data =
          await response.json();

        setHomestays(data);

      } catch (err) {

        setError(
          "Failed to fetch homestays"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchHomestays();

  }, []);




  // ============================================
  // FILTER + SORT
  // ============================================
  const filtered =
    useMemo(() => {

      return homestays
        .filter((p: any) => {

          if (
            filters.ecoCertified &&
            !p.eco_certified
          )
            return false;

          if (
            filters.solarPower &&
            !p.eco_features?.includes(
              "Solar Power"
            )
          )
            return false;

          if (
            filters.wifi &&
            !p.amenities?.includes(
              "WiFi"
            )
          )
            return false;

          if (
            filters.parking &&
            !p.amenities?.includes(
              "Parking"
            )
          )
            return false;

          if (
            p.price_per_night_inr >
            filters.price
          )
            return false;

          return true;
        })

        .sort((a, b) => {

          if (sort === "price") {
            return (
              a.price_per_night_inr -
              b.price_per_night_inr
            );
          }

          return (
            b.avg_rating -
            a.avg_rating
          );
        });

    }, [homestays, filters, sort]);




  // ============================================
  // PAGINATION
  // ============================================
  const perPage = 6;

  const totalPages =
    Math.ceil(
      filtered.length / perPage
    );

  const paginated =
    filtered.slice(
      (page - 1) * perPage,
      page * perPage
    );



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Loading Homestays...
      </div>
    );
  }



  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }



  return (
    <div className="bg-[#f7faf8] min-h-screen">

      <Navbar
        role="traveller"
        userName="Aminur"
      />



      {/* HERO */}
      <div className="relative h-[280px] lg:h-[380px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45 flex flex-col justify-center px-6 lg:px-16">

          <h1 className="text-white text-4xl lg:text-6xl font-bold max-w-3xl leading-tight">
            Discover Eco-Friendly
            Homestays in Assam
          </h1>

          <p className="text-gray-200 mt-4 text-lg max-w-2xl">
            Stay with nature, support local
            communities, and experience
            sustainable tourism across Assam.
          </p>

        </div>
      </div>



      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden px-4 mt-4">

        <button
          onClick={() =>
            setShowFilters(
              !showFilters
            )
          }
          className="w-full bg-green-700 text-white py-3 rounded-2xl font-medium shadow-md"
        >
          {showFilters
            ? "Close Filters"
            : "Open Filters"}
        </button>

      </div>



      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-8 py-8">

        {/* SIDEBAR */}
        <div
          className={`
            w-full lg:w-[300px]
            ${showFilters
              ? "block"
              : "hidden lg:block"}
          `}
        >

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 lg:sticky lg:top-24">

            <h2 className="text-2xl font-bold mb-6">
              Filters
            </h2>



            {/* PRICE */}
            <div>

              <div className="flex justify-between items-center">

                <p className="font-medium">
                  Max Price
                </p>

                <span className="text-green-700 font-semibold">
                  ₹{filters.price}
                </span>

              </div>

              <input
                type="range"
                min="1000"
                max="5000"
                value={filters.price}
                onChange={(e) =>
                  setFilters({
                    ...filters,

                    price:
                      +e.target.value,
                  })
                }
                className="w-full mt-3 accent-green-700"
              />

            </div>



            {/* FEATURES */}
            <div className="mt-8">

              <p className="font-medium mb-4">
                Eco Features
              </p>



              {(
                [
                  [
                    "ecoCertified",
                    "Eco Certified",
                  ],

                  [
                    "solarPower",
                    "Solar Power",
                  ],

                  [
                    "wifi",
                    "WiFi",
                  ],

                  [
                    "parking",
                    "Parking",
                  ],
                ] as [
                  FilterKeys,
                  string
                ][]
              ).map(([key, label]) => (

                <label
                  key={key}
                  className="flex items-center justify-between bg-[#f5f8f6] px-4 py-3 rounded-2xl mb-3 cursor-pointer hover:bg-green-50 transition"
                >

                  <span className="text-sm font-medium">
                    {label}
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      filters[key]
                    }
                    onChange={() =>
                      toggle(key)
                    }
                    className="w-4 h-4 accent-green-700"
                  />

                </label>
              ))}

            </div>
          </div>
        </div>



        {/* MAIN */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Explore Homestays
              </h2>

              <p className="text-gray-500 mt-1">
                {filtered.length} eco stays
                available
              </p>

            </div>



            <select
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
              className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm"
            >

              <option value="rating" className="bg-white border border-gray-200 px-4 py-3 rounded-3xl shadow-sm">
                Top Rated
              </option>

              <option value="price" className="bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm">
                Lowest Price
              </option>

            </select>
          </div>



          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

            {paginated.map((p) => (

              <div
                key={p._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden">

                  <img
                    src={
                      p.images?.[0] ||
                      "https://via.placeholder.com/400"
                    }
                    alt={
                      p.homestay_name
                    }
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                  />



                  {/* ECO BADGE */}
                  {p.eco_certified && (

                    <div className="absolute top-4 left-4 bg-green-700 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      Eco Certified
                    </div>
                  )}



                  {/* RATING */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow">
                    ⭐ {p.avg_rating}
                  </div>

                </div>



                {/* CONTENT */}
                <div className="p-5">

                  <p className="text-green-700 text-sm font-medium">
                    {p.district}
                  </p>



                  <h3 className="text-xl font-bold mt-1 text-gray-900">
                    {p.homestay_name}
                  </h3>



                  <p className="text-gray-500 text-sm mt-1">
                    {
                      p.property_type
                    }
                  </p>



                  {/* FEATURES */}
                  <div className="flex flex-wrap gap-2 mt-4">

                    {p.amenities
                      ?.slice(0, 3)
                      .map(
                        (
                          item,
                          i
                        ) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                          >
                            {item}
                          </span>
                        )
                      )}

                  </div>



                  {/* ATTRACTION */}
                  <p className="text-sm text-gray-500 mt-4">
                    Near:
                    {" "}
                    {
                      p.nearest_attraction
                    }
                  </p>



                  {/* FOOTER */}
                  <div className="flex justify-between items-center mt-6">

                    <div>

                      <p className="text-2xl font-bold text-green-700">
                        ₹
                        {
                          p.price_per_night_inr
                        }
                      </p>

                      <p className="text-xs text-gray-500">
                        per night
                      </p>

                    </div>



                    <button onClick={() => navigate(`/homestays/${p._id}`)} className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl font-medium shadow-md transition">
                      Book Now
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>



          {/* PAGINATION */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">

            {[...Array(totalPages)].map(
              (_, i) => (

                <button
                  key={i}
                  onClick={() =>
                    setPage(i + 1)
                  }
                  className={`w-11 h-11 rounded-2xl font-medium transition ${
                    page === i + 1
                      ? "bg-green-700 text-white shadow-lg"
                      : "bg-white text-gray-700 border border-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

          </div>
        </div>
      </div>
    </div>
  );
}