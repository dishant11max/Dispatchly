import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  ChevronLeft,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  Building,
} from "lucide-react";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";
import { supabase } from "@/lib/supabase";

const ClientLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulated login for now
    setTimeout(() => {
      setLoading(false);
      // In real app, we would verify role

      navigate("/client-dashboard");
    }, 1500);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulated signup
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("clientCompanyName", formData.companyName);
      navigate("/client-dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-['Space_Grotesk'] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF8C00] rounded-full blur-3xl opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#22C55E] rounded-full blur-3xl opacity-20 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

      <NeoCard className="bg-white max-w-md w-full relative z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={() => navigate("/")}
          className="absolute -top-12 left-0 flex items-center gap-2 font-bold text-gray-500 hover:text-black transition-colors"
        >
          <div className="bg-white text-black p-1 border-2 border-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          BACK TO HOME
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#FF8C00] border-4 border-black flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Briefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase mb-2">Client Portal</h1>
          <p className="font-medium text-gray-600">
            Manage your logistics with GTL.
          </p>
        </div>

        <div className="flex mb-6 border-4 border-black">
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(true);
              setError(null);
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              !isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(false);
              setError(null);
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-4 border-red-500 p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="font-bold text-red-700">{error}</p>
          </div>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {!isLogin && (
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Acme Corp"
                  className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="client@company.com"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <NeoButton
            type="submit"
            className="w-full py-4 text-xl justify-center group mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                {isLogin ? "Signing In..." : "Creating Account..."}
              </>
            ) : (
              <>
                {isLogin ? "ACCESS PORTAL" : "CREATE ACCOUNT"}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </NeoButton>
        </form>
      </NeoCard>
    </div>
  );
};

export default ClientLoginPage;
