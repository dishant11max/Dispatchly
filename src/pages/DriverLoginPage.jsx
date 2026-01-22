import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, ChevronLeft, Phone, ArrowRight } from "lucide-react";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";

const DriverLoginPage = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      alert(`OTP sent to ${mobile}`);
    } else {
      alert("Please enter a valid 10-digit mobile number");
    }
  };

  return (
    <div className="min-h-screen bg-[#FF8C00] font-['Space_Grotesk'] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 border-4 border-black bg-white/50 rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-4 border-black bg-white/50 -rotate-6"></div>
      </div>

      <NeoCard className="bg-white max-w-md w-full relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={() => navigate("/")}
          className="absolute -top-12 left-0 flex items-center gap-2 font-bold text-white hover:text-black transition-colors"
        >
          <div className="bg-black text-white p-1 border-2 border-black hover:bg-white hover:text-black">
            <ChevronLeft className="w-5 h-5" />
          </div>
          BACK TO HOME
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#22C55E] border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Truck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase mb-2">Driver Login</h1>
          <p className="font-medium text-gray-600">
            Enter your mobile number to easier access jobs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="font-black text-sm uppercase">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="tel"
                placeholder="98765 43210"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          <NeoButton className="w-full py-4 text-xl justify-center group">
            SEND OTP{" "}
            <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </NeoButton>
        </form>

        <div className="mt-8 text-center border-t-2 border-gray-200 pt-6">
          <p className="font-bold">New to Dispatchly?</p>
          <button className="text-[#FF8C00] font-black uppercase underline decoration-2 underline-offset-4 hover:decoration-4">
            Register as a Pilot
          </button>
        </div>
      </NeoCard>
    </div>
  );
};

export default DriverLoginPage;
