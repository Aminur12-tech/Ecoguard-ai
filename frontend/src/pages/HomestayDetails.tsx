import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Leaf,
  Wifi,
  Car,
  PawPrint,
  Sun,
  Users,
  Home,
} from "lucide-react";

interface Homestay {
  _id: string;
  homestay_id: string;
  vendor_id: string;

  homestay_name: string;
  host_name: string;

  district: string;
  village_town: string;

  property_type: string;

  room_count: number;
  max_guests: number;

  price_per_night_inr: number;

  wifi: boolean;
  parking: boolean;
  pet_friendly: boolean;
  local_food_available: boolean;

  eco_certified: boolean;
  solar_power: boolean;

  sustainability_score: number;

  amenities: string[];
  eco_features: string[];

  images: string[];
}

const BookingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [homestay, setHomestay] = useState<Homestay | null>(null);
  const [loading, setLoading] = useState(true);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);
  const [roomsBooked, setRoomsBooked] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/homestays/${id}`
        );

        setHomestay(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomestay();
  }, [id]);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diff =
      end.getTime() - start.getTime();

    return Math.max(
      0,
      Math.ceil(diff / (1000 * 60 * 60 * 24))
    );
  };

  const nights = calculateNights();

  const totalPrice =
    nights *
    (homestay?.price_per_night_inr || 0);

  const handleBooking = async () => {
    if (!homestay) return;

    try {
      setSubmitting(true);

      const payload = {
        homestay_id: homestay.homestay_id,
        guest_name: guestName,
        guest_email: guestEmail,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        rooms_booked: roomsBooked,
      };

      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        payload
      );

      alert(
        `Booking Confirmed!\nBooking ID: ${res.data.booking.booking_id}`
      );

      navigate("/bookings");
    } catch (err: any) {
      alert(
        err?.response?.data?.error ||
        "Booking failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!homestay) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Homestay not found
      </div>
    );
  }

  const imageUrl =
    homestay.images?.[0]
      ? `http://localhost:5000/${homestay.images[0]}`
      : "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  return (
    <div className="min-h-screen bg-[#F4F8F4] p-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-[420px_1fr] gap-8">

          {/* LEFT SIDE */}
          <div>

            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={
                  homestay.images?.[0] ||
                  "https://via.placeholder.com/400"
                }
                alt={homestay.homestay_name}
                className="w-full h-[320px] object-cover"
              />
            </div>

            <div className="mt-6">

              <h1 className="text-5xl font-bold text-[#21453A]">
                {homestay.homestay_name}
              </h1>

              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <MapPin size={18} />
                {homestay.village_town},{" "}
                {homestay.district}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="bg-white rounded-3xl p-5 shadow">
                  <p className="text-sm text-gray-500">
                    Sustainability
                  </p>

                  <h3 className="text-3xl font-bold text-green-700">
                    🌿 {homestay.sustainability_score}/10
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow">
                  <p className="text-sm text-gray-500">
                    Property Type
                  </p>

                  <h3 className="text-xl font-semibold">
                    {homestay.property_type}
                  </h3>
                </div>

              </div>

              <div className="mt-8">

                <h3 className="font-bold text-lg mb-4">
                  Sustainability Highlights
                </h3>

                <div className="flex flex-wrap gap-3">

                  {homestay.eco_certified && (
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      Eco Certified
                    </span>
                  )}

                  {homestay.solar_power && (
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      Solar Powered
                    </span>
                  )}

                  {homestay.eco_features?.map(
                    (feature, index) => (
                      <span
                        key={index}
                        className="bg-green-50 px-4 py-2 rounded-full"
                      >
                        {feature}
                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="mt-8 bg-white rounded-3xl p-6 shadow">

                <h3 className="font-bold text-lg mb-4">
                  Amenities
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  {homestay.wifi && (
                    <div className="flex items-center gap-2">
                      <Wifi size={18} />
                      WiFi
                    </div>
                  )}

                  {homestay.parking && (
                    <div className="flex items-center gap-2">
                      <Car size={18} />
                      Parking
                    </div>
                  )}

                  {homestay.pet_friendly && (
                    <div className="flex items-center gap-2">
                      <PawPrint size={18} />
                      Pet Friendly
                    </div>
                  )}

                  {homestay.local_food_available && (
                    <div className="flex items-center gap-2">
                      <Leaf size={18} />
                      Local Food
                    </div>
                  )}

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-[32px] shadow-xl p-8">

            <div className="flex justify-between items-start">

              <div>
                <p className="text-gray-500 uppercase text-sm">
                  Booking Details
                </p>

                <h2 className="text-4xl font-bold text-[#21453A]">
                  Confirm Your Stay
                </h2>
              </div>

              <div className="text-right">

                <div className="text-5xl font-bold text-green-700">
                  ₹{homestay.price_per_night_inr}
                </div>

                <p className="text-gray-500">
                  / night
                </p>

              </div>

            </div>

            <div className="mt-8 space-y-4">

              <input
                type="text"
                placeholder="Guest Name"
                value={guestName}
                onChange={(e) =>
                  setGuestName(e.target.value)
                }
                className="w-full border rounded-2xl p-4"
              />

              <input
                type="email"
                placeholder="Guest Email"
                value={guestEmail}
                onChange={(e) =>
                  setGuestEmail(e.target.value)
                }
                className="w-full border rounded-2xl p-4"
              />

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="text-sm text-gray-500">
                    Check In
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) =>
                      setCheckIn(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Check Out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                  />
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  type="number"
                  min="1"
                  max={homestay.max_guests}
                  value={guests}
                  onChange={(e) =>
                    setGuests(Number(e.target.value))
                  }
                  className="border rounded-2xl p-4"
                  placeholder="Guests"
                />

                <input
                  type="number"
                  min="1"
                  value={roomsBooked}
                  onChange={(e) =>
                    setRoomsBooked(Number(e.target.value))
                  }
                  className="border rounded-2xl p-4"
                  placeholder="Rooms"
                />

              </div>

            </div>

            <div className="mt-8 border-t pt-6">

              <div className="flex justify-between mb-3">
                <span>Nights</span>
                <span>{nights}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Price / Night</span>
                <span>
                  ₹{homestay.price_per_night_inr}
                </span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-green-700">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

            </div>

            <button
              onClick={handleBooking}
              disabled={submitting}
              className="w-full mt-8 bg-[#0F4A3C] hover:bg-[#123f35] text-white py-5 rounded-2xl text-lg font-semibold"
            >
              {submitting
                ? "Booking..."
                : "Confirm Booking"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;