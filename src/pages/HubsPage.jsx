import React, { useState } from "react";
import { MapPin, Activity, Truck, BarChart3, Clock } from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import IndiaHubMap from "@/components/neo/IndiaHubMap";

const HubsPage = () => {
  const [selectedHub, setSelectedHub] = useState(null);

  const hubs = [
    { city: "MUMBAI", fleet: "2500+", vol: "150T", sla: "99.8%" },
    { city: "DELHI NCR", fleet: "3200+", vol: "180T", sla: "99.9%" },
    { city: "BANGALORE", fleet: "1800+", vol: "120T", sla: "99.5%" },
    { city: "HYDERABAD", fleet: "1500+", vol: "90T", sla: "99.7%" },
    { city: "PUNE", fleet: "1200+", vol: "85T", sla: "99.6%" },
    { city: "CHENNAI", fleet: "1400+", vol: "95T", sla: "99.4%" },
    { city: "KOLKATA", fleet: "900+", vol: "60T", sla: "99.2%" },
    { city: "AHMEDABAD", fleet: "1100+", vol: "75T", sla: "99.3%" },
  ];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 border-b-4 border-black pb-8 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">
              Network <span className="text-[#FF8C00]">Status</span>
            </h1>
            <p className="text-xl font-medium">
              Live operational status of Dispatchly hubs across India.
            </p>
          </div>
          <div className="bg-black text-[#22C55E] border-2 border-black p-4 font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
            LAST UPDATED: {currentTime}
          </div>
        </div>

        {/* Interactive Map Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#FF8C00] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black uppercase">Hub Coverage Map</h2>
          </div>
          <IndiaHubMap
            hubs={hubs}
            selectedHub={selectedHub}
            onHubSelect={setSelectedHub}
          />
        </section>

        {/* Hub Cards Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">
            All Hubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub, index) => (
              <NeoCard
                key={index}
                className={`bg-white relative cursor-pointer transition-all ${
                  selectedHub === hub.city
                    ? "ring-4 ring-[#FF8C00] -translate-y-2"
                    : ""
                }`}
                onClick={() => setSelectedHub(hub.city)}
              >
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 bg-[#22C55E] text-white px-2 py-1 border-2 border-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Activity className="w-3 h-3 animate-pulse" /> ACTIVE
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-[#FF8C00]" />
                  <h3 className="text-xl font-black uppercase">{hub.city}</h3>
                </div>

                <div className="space-y-2 bg-gray-50 border-2 border-black p-3 font-mono text-xs font-bold">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 opacity-70">
                      <Truck className="w-3 h-3" /> FLEET
                    </span>
                    <span>{hub.fleet}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 opacity-70">
                      <BarChart3 className="w-3 h-3" /> VOL/DAY
                    </span>
                    <span>{hub.vol}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 opacity-70">
                      <Clock className="w-3 h-3" /> SLA
                    </span>
                    <span className="text-[#22C55E]">{hub.sla}</span>
                  </div>
                </div>
              </NeoCard>
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">
            Coming Soon
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "JAIPUR",
              "LUCKNOW",
              "INDORE",
              "CHANDIGARH",
              "KOCHI",
              "VADODARA",
            ].map((city) => (
              <div
                key={city}
                className="border-4 border-dashed border-gray-300 bg-gray-50 p-4 text-center"
              >
                <p className="font-black text-gray-400 uppercase">{city}</p>
                <p className="text-xs font-bold text-gray-400 mt-1">Q2 2026</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </NeoLayout>
  );
};

export default HubsPage;
