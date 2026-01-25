import React, { useState } from "react";
import { MapPin, Truck, BarChart3, Activity } from "lucide-react";

const IndiaHubMap = ({ hubs, onHubSelect, selectedHub }) => {
  const [hoveredHub, setHoveredHub] = useState(null);

  // Hub coordinates on the map (approximate positions on a 400x450 viewBox)
  const hubPositions = {
    MUMBAI: { x: 115, y: 280, region: "Maharashtra" },
    "DELHI NCR": { x: 175, y: 130, region: "NCR" },
    BANGALORE: { x: 145, y: 360, region: "Karnataka" },
    HYDERABAD: { x: 170, y: 305, region: "Telangana" },
    PUNE: { x: 125, y: 295, region: "Maharashtra" },
    CHENNAI: { x: 185, y: 375, region: "Tamil Nadu" },
    KOLKATA: { x: 290, y: 230, region: "West Bengal" },
    AHMEDABAD: { x: 105, y: 215, region: "Gujarat" },
  };

  const activeHub = hoveredHub || selectedHub;
  const activeHubData = hubs.find((h) => h.city === activeHub);

  return (
    <div className="relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Map */}
        <div className="flex-1 relative">
          <svg
            viewBox="0 0 400 450"
            className="w-full h-auto max-h-[500px]"
            style={{ filter: "drop-shadow(2px 2px 0px rgba(0,0,0,0.1))" }}
          >
            {/* Simplified India outline */}
            <path
              d="M175 50 L220 45 L260 55 L295 70 L320 100 L340 130 L350 170 L345 200 L330 220 L310 235 L295 250 L305 280 L295 310 L280 340 L260 370 L230 400 L200 420 L170 425 L140 415 L120 390 L100 360 L85 320 L75 280 L70 240 L75 200 L85 160 L100 120 L120 90 L150 65 Z"
              fill="#F4F4F5"
              stroke="black"
              strokeWidth="3"
            />

            {/* State divisions (simplified) */}
            <path
              d="M150 150 L200 140 L230 160 L210 200 L160 190 Z"
              fill="#E4E4E7"
              stroke="black"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d="M100 250 L150 240 L170 280 L140 310 L95 290 Z"
              fill="#E4E4E7"
              stroke="black"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d="M130 320 L180 310 L200 360 L160 390 L120 370 Z"
              fill="#E4E4E7"
              stroke="black"
              strokeWidth="1"
              opacity="0.5"
            />
            <path
              d="M260 200 L310 210 L320 260 L280 270 L250 240 Z"
              fill="#E4E4E7"
              stroke="black"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Connection lines between hubs */}
            {Object.entries(hubPositions).map(([city, pos], i) => {
              const cities = Object.keys(hubPositions);
              const nextCity = cities[(i + 1) % cities.length];
              const nextPos = hubPositions[nextCity];
              return (
                <line
                  key={`line-${city}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="#FF8C00"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.3"
                />
              );
            })}

            {/* Hub markers */}
            {Object.entries(hubPositions).map(([city, pos]) => {
              const isActive = activeHub === city;
              const isSelected = selectedHub === city;

              return (
                <g
                  key={city}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredHub(city)}
                  onMouseLeave={() => setHoveredHub(null)}
                  onClick={() => onHubSelect?.(city)}
                >
                  {/* Pulse animation for active hubs */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 20 : 12}
                    fill={isActive ? "#FF8C00" : "#22C55E"}
                    opacity={isActive ? 0.3 : 0.2}
                    className={isActive ? "animate-pulse" : ""}
                  />

                  {/* Main marker */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 12 : 8}
                    fill={
                      isSelected ? "#FF8C00" : isActive ? "#FF8C00" : "#22C55E"
                    }
                    stroke="black"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />

                  {/* Inner dot */}
                  <circle cx={pos.x} cy={pos.y} r={3} fill="white" />

                  {/* City label */}
                  <rect
                    x={pos.x - 35}
                    y={pos.y + 15}
                    width="70"
                    height="18"
                    fill={isActive ? "black" : "white"}
                    stroke="black"
                    strokeWidth="1"
                    rx="0"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 27}
                    textAnchor="middle"
                    className="text-[8px] font-bold uppercase"
                    fill={isActive ? "white" : "black"}
                  >
                    {city.length > 10 ? city.slice(0, 8) + ".." : city}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white border-2 border-black p-3 text-xs font-bold">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#22C55E] border border-black"></div>
              <span>Active Hub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF8C00] border border-black"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>

        {/* Hub Info Panel */}
        <div className="lg:w-72 space-y-4">
          <div className="border-4 border-black bg-black text-white p-4">
            <h3 className="text-xl font-black uppercase mb-2">
              {activeHubData ? activeHubData.city : "SELECT A HUB"}
            </h3>
            {activeHubData && (
              <p className="text-sm font-medium text-[#22C55E]">
                <Activity className="w-4 h-4 inline mr-1 animate-pulse" />
                Hub Active • 24/7
              </p>
            )}
          </div>

          {activeHubData ? (
            <div className="border-4 border-black bg-gray-50 p-4 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold opacity-70">
                  <Truck className="w-4 h-4" />
                  FLEET SIZE
                </div>
                <span className="text-2xl font-black">
                  {activeHubData.fleet}
                </span>
              </div>
              <div className="flex items-center justify-between border-b-2 border-gray-200 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold opacity-70">
                  <BarChart3 className="w-4 h-4" />
                  VOLUME/DAY
                </div>
                <span className="text-2xl font-black">{activeHubData.vol}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold opacity-70">
                  <MapPin className="w-4 h-4" />
                  SLA MET
                </div>
                <span className="text-2xl font-black text-[#22C55E]">
                  {activeHubData.sla}
                </span>
              </div>
            </div>
          ) : (
            <div className="border-4 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-bold text-gray-400">
                Hover or click on a hub marker to see details
              </p>
            </div>
          )}

          {/* Coverage Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border-4 border-black bg-[#FF8C00] p-3 text-center">
              <div className="text-2xl font-black">
                {Object.keys(hubPositions).length}
              </div>
              <div className="text-xs font-bold uppercase">Active Hubs</div>
            </div>
            <div className="border-4 border-black bg-[#22C55E] text-white p-3 text-center">
              <div className="text-2xl font-black">50+</div>
              <div className="text-xs font-bold uppercase">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaHubMap;
