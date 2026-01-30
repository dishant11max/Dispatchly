import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import {
  Briefcase,
  Plus,
  Package,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Search,
  Filter,
  CheckCircle,
  Truck,
  AlertTriangle,
} from "lucide-react";

// Address Autocomplete Component
const CityAutocomplete = ({ label, value, onChange, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const cities = [
    "MUMBAI",
    "DELHI NCR",
    "BANGALORE",
    "HYDERABAD",
    "CHENNAI",
    "PUNE",
    "KOLKATA",
    "AHMEDABAD",
    "JAIPUR",
    "LUCKNOW",
    "CHANDIGARH",
    "INDORE",
    "KOCHI",
    "VISAKHAPATNAM",
    "SURAT",
    "VADODARA",
    "NAGPUR",
    "LUDHIANA",
    "NASHIK",
    "PATNA",
  ];

  const handleInput = (e) => {
    const val = e.target.value.toUpperCase();
    onChange(val);
    if (val.length > 0) {
      setSuggestions(cities.filter((c) => c.includes(val) && c !== val));
    } else {
      setSuggestions([]);
    }
  };

  const selectCity = (city) => {
    onChange(city);
    setSuggestions([]);
  };

  return (
    <div className="space-y-2 relative">
      <label className="font-bold text-sm uppercase">{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-40 overflow-y-auto">
          {suggestions.map((city) => (
            <li
              key={city}
              className="p-2 hover:bg-[#FF8C00] hover:text-white cursor-pointer font-bold"
              onClick={() => selectCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ClientDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | new-booking | shipments | invoices
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("clientCompanyName") || "Acme Corp",
  );

  // Mock State for Shipments
  const [shipments, setShipments] = useState([
    {
      id: "SHP-001",
      origin: "MUMBAI",
      destination: "PUNE",
      status: "IN_TRANSIT",
      eta: "4 Hours",
      items: "Electronics",
      driver: "Rajesh K.",
    },
    {
      id: "SHP-004",
      origin: "DELHI NCR",
      destination: "JAIPUR",
      status: "PICKED_UP",
      eta: "Tomorrow",
      items: "Textiles",
      driver: "Vikram S.",
    },
  ]);

  // Calculate Stats
  const pendingShipments = shipments.filter(
    (s) => s.status === "SEARCHING_DRIVER",
  ).length;
  const inTransitShipments = shipments.filter(
    (s) => s.status === "IN_TRANSIT" || s.status === "PICKED_UP",
  ).length;
  const totalActive = pendingShipments + inTransitShipments;

  // Form State
  const [newBooking, setNewBooking] = useState({
    pickup: "",
    drop: "",
    items: "",
    weight: "",
    dimensions: "",
    vehicle: "",
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTracking, setActiveTracking] = useState(null);

  const handleBookShipment = (e) => {
    e.preventDefault();
    setBookingLoading(true);

    // Validate
    if (
      !newBooking.pickup ||
      !newBooking.drop ||
      !newBooking.items ||
      !newBooking.vehicle
    ) {
      alert("Please fill all required fields");
      setBookingLoading(false);
      return;
    }

    // Simulate API Call
    setTimeout(() => {
      const newShipment = {
        id: `SHP-${Math.floor(Math.random() * 10000)}`,
        origin: newBooking.pickup,
        destination: newBooking.drop,
        status: "SEARCHING_DRIVER",
        eta: "Calculating...",
        items: newBooking.items,
        driver: "Assigning...",
      };

      setShipments([newShipment, ...shipments]);
      setBookingLoading(false);

      // Show Success Modal
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setNewBooking({
          pickup: "",
          drop: "",
          items: "",
          weight: "",
          dimensions: "",
          vehicle: "",
        });
        setActiveTab("dashboard");
      }, 1500);
    }, 1500);
  };

  const recentHistory = [
    {
      id: "SHP-002",
      origin: "BANGALORE",
      destination: "CHENNAI",
      status: "DELIVERED",
      date: "Yesterday",
      cost: "₹12,400",
    },
    {
      id: "SHP-003",
      origin: "MUMBAI",
      destination: "NASHIK",
      status: "DELIVERED",
      date: "28 Jan",
      cost: "₹8,200",
    },
  ];

  return (
    <NeoLayout>
      <div className="bg-[#F4F4F5] min-h-screen pb-20">
        {/* Top Bar */}
        <div className="bg-white border-b-4 border-black px-6 py-6">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-black uppercase mb-1">
                Client Portal
              </h1>
              <p className="font-bold text-gray-500">
                Welcome back,{" "}
                <span className="text-[#FF8C00]">{companyName}</span>
              </p>
            </div>
            <div className="flex gap-3">
              <NeoButton
                onClick={() => setActiveTab("new-booking")}
                className={
                  activeTab === "new-booking"
                    ? "ring-2 ring-offset-2 ring-black"
                    : ""
                }
              >
                <Plus className="w-5 h-5 mr-2" /> New Shipment
              </NeoButton>
              <NeoButton
                variant="secondary"
                onClick={() => setActiveTab("invoices")}
                className={
                  activeTab === "invoices"
                    ? "ring-2 ring-offset-2 ring-black"
                    : ""
                }
              >
                <FileText className="w-5 h-5 mr-2" /> Invoices
              </NeoButton>
              <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center font-bold text-xl rounded-full cursor-pointer hover:bg-[#FF8C00] transition-colors">
                AC
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NeoCard className="bg-black text-white border-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Package className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold bg-[#FF8C00] text-black px-2 py-1 rounded">
                      LIVE
                    </span>
                  </div>
                  <div className="text-4xl font-black mb-1">
                    {shipments.length}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    Active Shipments
                  </div>
                </NeoCard>

                <NeoCard className="bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-100 border-2 border-black rounded-lg">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-green-600">
                      ↑ 12%
                    </span>
                  </div>
                  <div className="text-4xl font-black mb-1">₹45k</div>
                  <div className="text-sm font-medium text-gray-500">
                    Spend this Month
                  </div>
                </NeoCard>

                <NeoCard className="bg-white">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-100 border-2 border-black rounded-lg">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-4xl font-black mb-1">100%</div>
                  <div className="text-sm font-medium text-gray-500">
                    On-Time Delivery Rate
                  </div>
                </NeoCard>

                <NeoCard className="bg-[#FF8C00] border-black">
                  <div
                    className="flex flex-col h-full justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setActiveTab("new-booking")}
                  >
                    <div className="bg-black text-white p-3 rounded-full mb-2">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div className="font-black text-xl uppercase">
                      Quick Book
                    </div>
                  </div>
                </NeoCard>
              </div>

              {/* Active Shipments Table */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-black uppercase">
                    Active Shipments
                  </h2>
                  <button
                    className="font-bold underline"
                    onClick={() => setActiveTab("shipments")}
                  >
                    View All
                  </button>
                </div>
                <div className="grid gap-4">
                  {shipments.map((shipment) => (
                    <NeoCard
                      key={shipment.id}
                      className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white"
                    >
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="p-4 bg-gray-100 border-2 border-black">
                          <Truck className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black">{shipment.id}</h3>
                          <p className="text-sm font-bold text-gray-500">
                            {shipment.items}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
                        <div className="text-center md:text-left">
                          <div className="text-xs font-bold text-gray-400 uppercase">
                            Origin
                          </div>
                          <div className="font-black text-lg">
                            {shipment.origin}
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-300" />
                        <div className="text-center md:text-left">
                          <div className="text-xs font-bold text-gray-400 uppercase">
                            Destination
                          </div>
                          <div className="font-black text-lg">
                            {shipment.destination}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`w-2 h-2 rounded-full animate-pulse ${shipment.status === "SEARCHING_DRIVER" ? "bg-orange-500" : "bg-green-500"}`}
                            ></div>
                            <span className="text-xs font-black uppercase tracking-wider">
                              {shipment.status.replace("_", " ")}
                            </span>
                          </div>
                          <div className="text-sm font-medium">
                            ETA: {shipment.eta}
                          </div>
                        </div>

                        <NeoButton
                          variant="secondary"
                          className="px-4 py-2 text-sm"
                          onClick={() => setActiveTracking(shipment)}
                        >
                          Track
                        </NeoButton>
                      </div>
                    </NeoCard>
                  ))}
                  {shipments.length === 0 && (
                    <div className="text-center py-10 opacity-50 font-bold uppercase">
                      No active shipments
                    </div>
                  )}
                </div>
              </div>

              {/* Tracking Modal */}
              {activeTracking && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white border-4 border-black p-6 w-full max-w-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300 relative">
                    <button
                      onClick={() => setActiveTracking(null)}
                      className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
                    >
                      <div className="w-6 h-6 flex items-center justify-center font-black">
                        X
                      </div>
                    </button>

                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-2">
                      <MapPin className="w-6 h-6" /> Tracking Shipment
                    </h3>

                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                        <div>
                          <div className="text-xs font-bold text-gray-400 uppercase">
                            Current Status
                          </div>
                          <div className="text-xl font-black text-[#FF8C00]">
                            {activeTracking.status.replace("_", " ")}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-gray-400 uppercase">
                            Estimated Arrival
                          </div>
                          <div className="text-lg font-bold">
                            {activeTracking.eta}
                          </div>
                        </div>
                      </div>

                      <div className="relative pl-8 border-l-4 border-gray-200 space-y-8">
                        <div className="relative">
                          <div className="absolute -left-[38px] bg-black text-white p-1 rounded-full border-4 border-white">
                            <Truck className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-sm text-gray-500">
                            Current Location
                          </div>
                          <div className="font-black text-lg">
                            Crossing {activeTracking.origin} City Limits
                          </div>
                          <div className="text-xs font-bold text-gray-400">
                            Just now
                          </div>
                        </div>
                        <div className="relative opacity-50">
                          <div className="absolute -left-[38px] bg-gray-300 text-white p-1 rounded-full border-4 border-white">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="font-bold text-sm text-gray-500">
                            Destination
                          </div>
                          <div className="font-black text-lg">
                            {activeTracking.destination} Warehouse
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4 border-t-2 border-gray-100">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold border-2 border-black">
                          {activeTracking.driver.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-400 uppercase">
                            Driver
                          </div>
                          <div className="font-black text-lg">
                            {activeTracking.driver}
                          </div>
                        </div>
                        <NeoButton className="ml-auto" size="sm">
                          Call Driver
                        </NeoButton>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent History */}
              <div>
                <h2 className="text-3xl font-black uppercase mb-6">
                  Recent History
                </h2>
                <div className="bg-white border-4 border-black p-4">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-4 border-black text-gray-500 text-sm uppercase">
                        <th className="pb-4 font-black">ID</th>
                        <th className="pb-4 font-black">Route</th>
                        <th className="pb-4 font-black">Date</th>
                        <th className="pb-4 font-black">Status</th>
                        <th className="pb-4 font-black text-right">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="font-bold">
                      {recentHistory.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b-2 border-gray-100 last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-4">{item.id}</td>
                          <td className="py-4">
                            {item.origin} → {item.destination}
                          </td>
                          <td className="py-4 text-gray-500">{item.date}</td>
                          <td className="py-4">
                            <span className="bg-gray-200 px-2 py-1 text-xs">
                              {item.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Invoices View (New) */}
          {activeTab === "invoices" && (
            <div className="max-w-6xl mx-auto animate-in zoom-in duration-300">
              <button
                onClick={() => setActiveTab("dashboard")}
                className="mb-6 flex items-center font-bold hover:underline"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
                Dashboard
              </button>
              <h2 className="text-4xl font-black uppercase mb-8">
                Invoices & Billing
              </h2>
              <div className="grid gap-4">
                {[
                  {
                    id: "INV-2024-001",
                    date: "01 Feb 2026",
                    amount: "₹45,200",
                    status: "PAID",
                  },
                  {
                    id: "INV-2024-002",
                    date: "15 Jan 2026",
                    amount: "₹12,400",
                    status: "PAID",
                  },
                  {
                    id: "INV-2023-128",
                    date: "28 Dec 2025",
                    amount: "₹8,200",
                    status: "PAID",
                  },
                ].map((inv) => (
                  <NeoCard
                    key={inv.id}
                    className="bg-white flex justify-between items-center p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-100 border-2 border-black rounded-lg">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xl font-black">{inv.id}</div>
                        <div className="text-sm font-bold text-gray-500">
                          {inv.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black">{inv.amount}</div>
                      <div className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded inline-block mt-1">
                        {inv.status}
                      </div>
                    </div>
                    <NeoButton variant="secondary" className="hidden md:flex">
                      Download
                    </NeoButton>
                  </NeoCard>
                ))}
              </div>
            </div>
          )}

          {/* Booking View */}
          {activeTab === "new-booking" && (
            <div className="max-w-4xl mx-auto animate-in zoom-in duration-300">
              <button
                onClick={() => setActiveTab("dashboard")}
                className="mb-6 flex items-center font-bold hover:underline"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to
                Dashboard
              </button>

              <NeoCard className="bg-white p-8">
                <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">
                  Create New Shipment
                </h2>

                <form className="space-y-8" onSubmit={handleBookShipment}>
                  {showSuccess && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
                      <div className="bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-black uppercase mb-2">
                          Booking Confirmed!
                        </h3>
                        <p className="font-bold text-gray-500">
                          Redirecting to dashboard...
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Route */}
                  <div>
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" /> Route Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <CityAutocomplete
                        label="Pickup Location"
                        placeholder="Start typing city..."
                        value={newBooking.pickup}
                        onChange={(val) =>
                          setNewBooking({ ...newBooking, pickup: val })
                        }
                      />
                      <CityAutocomplete
                        label="Drop Location"
                        placeholder="Start typing city..."
                        value={newBooking.drop}
                        onChange={(val) =>
                          setNewBooking({ ...newBooking, drop: val })
                        }
                      />
                    </div>
                  </div>

                  {/* Cargo */}
                  <div>
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" /> Cargo Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">
                          Item Description
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-black p-3 font-bold focus:outline-none text-sm"
                          placeholder="e.g. Textiles, Electronics"
                          value={newBooking.items}
                          onChange={(e) =>
                            setNewBooking({
                              ...newBooking,
                              items: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">
                          Total Weight (kg)
                        </label>
                        <input
                          type="number"
                          className="w-full border-2 border-black p-3 font-bold focus:outline-none text-sm"
                          placeholder="0"
                          value={newBooking.weight}
                          onChange={(e) =>
                            setNewBooking({
                              ...newBooking,
                              weight: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-bold text-sm uppercase">
                          Dimensions (LxWxH)
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-black p-3 font-bold focus:outline-none text-sm"
                          placeholder="in ft."
                          value={newBooking.dimensions}
                          onChange={(e) =>
                            setNewBooking({
                              ...newBooking,
                              dimensions: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Selection - Simple Cards */}
                  <div>
                    <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5" /> Select Vehicle
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        "Tata Ace (750kg)",
                        "Pickup (1.5T)",
                        "Truck (19ft)",
                      ].map((v, i) => (
                        <div
                          key={i}
                          onClick={() =>
                            setNewBooking({ ...newBooking, vehicle: v })
                          }
                          className={`border-2 p-4 cursor-pointer hover:bg-gray-50 flex flex-col items-center text-center transition-all ${newBooking.vehicle === v ? "border-black bg-orange-50 ring-2 ring-black" : "border-gray-300"}`}
                        >
                          <Truck
                            className={`w-8 h-8 mb-2 ${newBooking.vehicle === v ? "text-[#FF8C00]" : "text-gray-400"}`}
                          />
                          <div className="font-black uppercase text-sm">
                            {v}
                          </div>
                          {i === 1 && (
                            <div className="text-xs font-bold text-[#FF8C00] mt-1">
                              Recommended
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-gray-100 flex justify-end gap-4">
                    <NeoButton
                      type="button"
                      variant="secondary"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      Cancel
                    </NeoButton>
                    <NeoButton
                      className="px-8"
                      disabled={bookingLoading}
                      type="submit"
                    >
                      {bookingLoading ? "Booking..." : "Get Quote & Book"}
                    </NeoButton>
                  </div>
                </form>
              </NeoCard>
            </div>
          )}
        </div>
      </div>
    </NeoLayout>
  );
};

export default ClientDashboardPage;
