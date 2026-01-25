import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  ChevronLeft,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  UserPlus,
  LogIn,
  AlertCircle,
} from "lucide-react";
import NeoButton from "@/components/neo/NeoButton";
import NeoCard from "@/components/neo/NeoCard";
import { supabase } from "@/lib/supabase";

const DriverLoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Check if driver profile exists
      const { data: driver } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (driver) {
        setSuccess("Login successful! Redirecting...");
        setTimeout(() => navigate("/driver-dashboard"), 1500);
      } else {
        // User exists but no driver profile - redirect to dashboard to complete profile
        setSuccess("Login successful! Please complete your profile.");
        setTimeout(() => navigate("/driver-dashboard"), 1500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: "driver",
          },
        },
      });

      if (error) throw error;

      // Create driver profile
      if (data.user) {
        await supabase.from("drivers").insert({
          user_id: data.user.id,
          name: formData.name,
          email: formData.email,
          phone: "",
          status: "pending_verification",
        });
      }

      setSuccess("Account created! You can now login.");
      setIsLogin(true);
      setFormData({ ...formData, password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
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
          <h1 className="text-4xl font-black uppercase mb-2">
            {isLogin ? "Driver Login" : "Join as Pilot"}
          </h1>
          <p className="font-medium text-gray-600">
            {isLogin
              ? "Login to access jobs and manage trips."
              : "Create your account to start earning."}
          </p>
        </div>

        {/* Toggle Login/Signup */}
        <div className="flex mb-6 border-4 border-black">
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setSuccess(null);
            }}
          >
            <LogIn className="w-5 h-5 inline mr-2" />
            Login
          </button>
          <button
            className={`flex-1 py-3 font-black uppercase text-center transition-colors ${
              !isLogin ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setSuccess(null);
            }}
          >
            <UserPlus className="w-5 h-5 inline mr-2" />
            Sign Up
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border-4 border-green-500 p-4 mb-6 text-center">
            <p className="font-bold text-green-700">{success}</p>
          </div>
        )}

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
          {/* Name - Only for signup */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                className="w-full bg-gray-50 border-2 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="font-black text-sm uppercase">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="driver@email.com"
                className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
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
                minLength={6}
              />
            </div>
          </div>

          {/* Confirm Password - Only for signup */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="font-black text-sm uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border-2 border-black p-4 pl-12 font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  minLength={6}
                />
              </div>
            </div>
          )}

          <NeoButton
            type="submit"
            className="w-full py-4 text-xl justify-center group mt-6"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </>
            ) : (
              <>
                {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </NeoButton>
        </form>

        {isLogin && (
          <div className="mt-6 text-center">
            <button className="text-gray-500 font-bold hover:text-black underline decoration-2 underline-offset-4">
              Forgot Password?
            </button>
          </div>
        )}
      </NeoCard>
    </div>
  );
};

export default DriverLoginPage;
