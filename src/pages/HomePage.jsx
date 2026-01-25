import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  MapPin,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";
import QuoteModal from "@/components/neo/QuoteModal";

const HomePage = () => {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <NeoLayout>
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* Hero Section */}
      <header className="pt-8 pb-20 px-6 container mx-auto text-center max-w-5xl">
        <div className="inline-block mb-6 px-4 py-2 bg-[#FF8C00] border-4 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
          NOW LIVE IN MUMBAI & DELHI
        </div>
        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter uppercase">
          India's Fastest <br />
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] via-black to-[#22C55E] stroke-black"
            style={{ WebkitTextStroke: "1px black" }}
          >
            Logistics Network
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed border-l-4 border-black pl-6 text-left md:text-center md:border-none md:pl-0">
          Connect with 10,000+ verified pilots across 50+ cities. Real-time
          tracking, instant payouts, and zero commission tailored for the Indian
          market.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <NeoButton
            onClick={() => {
              document
                .getElementById("cta-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full md:w-auto text-xl py-4 px-8"
          >
            JOIN AS DRIVER <Truck className="w-6 h-6" />
          </NeoButton>
          <NeoButton
            variant="secondary"
            onClick={() => setQuoteModalOpen(true)}
            className="w-full md:w-auto text-xl py-4 px-8"
          >
            BOOK A TRUCK <ArrowRight className="w-6 h-6" />
          </NeoButton>
        </div>
      </header>

      {/* Marquee */}
      <div className="border-y-4 border-black py-4 bg-[#F4F4F5] overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-scroll gap-12 text-2xl font-bold uppercase">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span>⚡ INSTANT PAYOUTS</span>
              <span>📍 LIVE TRACKING</span>
              <span>🛡️ INSURED TRIPS</span>
              <span>🇮🇳 PAN INDIA COVERAGE</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <section className="py-20 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin className="w-10 h-10" />,
              label: "CITIES COVERED",
              value: "50+",
              color: "bg-[#FF8C00]",
            },
            {
              icon: <IndianRupee className="w-10 h-10" />,
              label: "DRIVER EARNINGS",
              value: "₹2Cr+",
              color: "bg-white",
            },
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              label: "SAFE TRIPS",
              value: "100%",
              color: "bg-[#22C55E]",
              contentClass: "text-white",
            },
          ].map((stat, index) => (
            <NeoCard
              key={index}
              className={`${stat.color} flex flex-col justify-between`}
            >
              <div className="mb-4 bg-black text-white w-16 h-16 flex items-center justify-center border-4 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                {stat.icon}
              </div>
              <div>
                <h3
                  className={`text-5xl font-black mb-2 ${stat.contentClass || ""}`}
                >
                  {stat.value}
                </h3>
                <p
                  className={`font-bold text-xl tracking-widest ${stat.contentClass || ""}`}
                >
                  {stat.label}
                </p>
              </div>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
            How It <span className="text-[#FF8C00]">Works</span>
          </h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">
            Simple, fast, and transparent. Get your shipment moving in 4 easy
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "BOOK YOUR TRUCK",
              description:
                "Select vehicle type and enter pickup & delivery locations",
            },
            {
              step: "02",
              title: "MATCH WITH DRIVER",
              description:
                "Our AI instantly matches you with verified pilots nearby",
            },
            {
              step: "03",
              title: "LIVE TRACKING",
              description:
                "Track your shipment in real-time from pickup to delivery",
            },
            {
              step: "04",
              title: "DELIVERED",
              description:
                "Instant payment to driver upon successful completion",
            },
          ].map((item, index) => (
            <NeoCard key={index} className="relative overflow-hidden group">
              <div className="absolute top-4 right-4 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity">
                {item.step}
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#FF8C00] border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="text-3xl font-black">{item.step}</span>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">
                  {item.title}
                </h3>
                <p className="font-medium text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </NeoCard>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-6 container mx-auto bg-[#F4F4F5] border-y-4 border-black">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Trusted By <span className="text-[#FF8C00]">Businesses</span>
          </h2>
          <p className="text-lg font-medium">
            Join 500+ companies shipping with Dispatchly
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {["FLIPKART", "ZOMATO", "SWIGGY", "BIGBASKET", "AMAZON", "DUNZO"].map(
            (company, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-6 flex items-center justify-center h-24 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
              >
                <span className="font-black text-xl text-center">
                  {company}
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      {/* Features / Locations */}
      <section className="py-20 bg-black text-white border-t-4 border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-gray-700 pb-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase">
              Operating <br />
              <span className="text-[#FF8C00]">Hubs</span>
            </h2>
            <div className="text-right mt-4 md:mt-0">
              <NeoButton variant="primary" onClick={() => navigate("/hubs")}>
                VIEW ALL HUBS <ArrowRight className="w-4 h-4" />
              </NeoButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "MUMBAI",
              "DELHI NCR",
              "BANGALORE",
              "HYDERABAD",
              "CHENNAI",
              "PUNE",
              "KOLKATA",
              "AHMEDABAD",
            ].map((city) => (
              <div
                key={city}
                className="group relative overflow-hidden border-4 border-white p-6 hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold">{city}</h4>
                <p className="text-sm font-mono mt-2 opacity-60 group-hover:opacity-100">
                  Hub Active • 24/7
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta-section" className="py-20 px-6 container mx-auto">
        <NeoCard className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase mb-6 leading-tight">
                READY TO <span className="text-[#FF8C00]">SHIP?</span>
              </h2>
              <p className="text-xl font-medium mb-6 leading-relaxed">
                Join thousands of businesses already using Dispatchly for their
                logistics needs. Fast, reliable, and transparent.
              </p>
              <div className="flex flex-wrap gap-4 font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#22C55E] border-4 border-black"></div>
                  <span>Instant Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#22C55E] border-4 border-black"></div>
                  <span>Zero Commission</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#22C55E] border-4 border-black"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <NeoButton
                className="w-full text-2xl py-6 px-8"
                onClick={() => setQuoteModalOpen(true)}
              >
                GET STARTED NOW
              </NeoButton>
              <NeoButton
                variant="secondary"
                className="w-full text-xl py-4 px-8"
                onClick={() =>
                  (window.location.href = "mailto:sales@dispatchly.in")
                }
              >
                TALK TO SALES
              </NeoButton>
              <p className="text-sm font-medium text-center opacity-60 mt-2">
                No setup fees. Start shipping in minutes.
              </p>
            </div>
          </div>
        </NeoCard>
      </section>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </NeoLayout>
  );
};

export default HomePage;
