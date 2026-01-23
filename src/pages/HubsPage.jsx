import React from "react";
import { MapPin, Activity, Truck, BarChart3, Clock } from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";

const HubsPage = () => {
  const hubs = [
    { city: "MUMBAI", fleet: "2500+", vol: "150T", sla: "99.8%" },
    { city: "DELHI NCR", fleet: "3200+", vol: "180T", sla: "99.9%" },
    { city: "BANGALORE", fleet: "1800+", vol: "120T", sla: "99.5%" },
    { city: "HYDERABAD", fleet: "1500+", vol: "90T", sla: "99.7%" },
    { city: "PUNE", fleet: "1200+", vol: "85T", sla: "99.6%" },
    { city: "CHENNAI", fleet: "1400+", vol: "95T", sla: "99.4%" },
    { city: "KOLKATA", fleet: "900+", vol: "60T", sla: "99.2%" },
  ];

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {hubs.map((hub, index) => (
            <NeoCard key={index} className="bg-white relative">
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-2 bg-[#22C55E] text-white px-3 py-1 border-2 border-black font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Activity className="w-4 h-4 animate-pulse" /> ACTIVE
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8 text-[#FF8C00]" />
                <h3 className="text-3xl font-black uppercase">{hub.city}</h3>
              </div>

              <div className="space-y-4 bg-gray-50 border-2 border-black p-4 font-mono text-sm font-bold">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span className="flex items-center gap-2 opacity-70">
                    <Truck className="w-4 h-4" /> FLEET SIZE
                  </span>
                  <span className="text-lg">{hub.fleet}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                  <span className="flex items-center gap-2 opacity-70">
                    <BarChart3 className="w-4 h-4" /> VOLUME/DAY
                  </span>
                  <span className="text-lg">{hub.vol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 opacity-70">
                    <Clock className="w-4 h-4" /> SLA MET
                  </span>
                  <span className="text-[#22C55E] text-lg">{hub.sla}</span>
                </div>
              </div>
            </NeoCard>
          ))}
        </div>
      </div>
    </NeoLayout>
  );
};

export default HubsPage;
