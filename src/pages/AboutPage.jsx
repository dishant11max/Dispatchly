import React from "react";
import { ShieldCheck, Users, Target, Rocket } from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";

const AboutPage = () => {
  return (
    <NeoLayout>
      {/* Hero */}
      <section className="bg-black text-white border-b-4 border-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 leading-none">
            We move <span className="text-[#FF8C00]">India</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-gray-300">
            Dispatchly is building the operating system for modern logistics. We
            connect businesses with verified pilots through technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-5xl font-black uppercase mb-6">Our Mission</h2>
            <p className="text-xl font-medium leading-relaxed mb-6">
              To organize the fragmented trucking industry in India and empower
              every pilot with technology, fair pay, and respect.
            </p>
            <p className="text-lg leading-relaxed">
              We started in 2024 with a simple idea: Truck booking should be as
              easy as booking a cab. Today, we manage over 150 tonnes of cargo
              daily across 50+ cities.
            </p>
          </div>
          <div className="flex-1">
            <NeoCard className="bg-[#FF8C00] p-12 text-center rotate-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-8xl font-black text-white block mb-2">
                10K+
              </span>
              <span className="text-2xl font-bold uppercase border-t-4 border-black pt-4 inline-block">
                Pilots Empowered
              </span>
            </NeoCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F4F4F5] border-y-4 border-black">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-black uppercase text-center mb-16">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "PILOT FIRST",
                desc: "We prioritize the welfare and earnings of our driver partners above all.",
                icon: <Users className="w-10 h-10" />,
                color: "#22C55E",
              },
              {
                title: "SPEED & TRUST",
                desc: "100% transparent pricing and real-time tracking for every shipment.",
                icon: <Rocket className="w-10 h-10" />,
                color: "#FF8C00",
              },
              {
                title: "SAFETY",
                desc: "Verified backgrounds and insured cargo for complete peace of mind.",
                icon: <ShieldCheck className="w-10 h-10" />,
                color: "#FFFFFF",
              },
            ].map((value, index) => (
              <NeoCard key={index} className="h-full flex flex-col">
                <div
                  className="w-16 h-16 border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundColor: value.color }}
                >
                  {value.icon}
                </div>
                <h3 className="text-3xl font-black uppercase mb-4">
                  {value.title}
                </h3>
                <p className="text-lg font-medium">{value.desc}</p>
              </NeoCard>
            ))}
          </div>
        </div>
      </section>
    </NeoLayout>
  );
};

export default AboutPage;
