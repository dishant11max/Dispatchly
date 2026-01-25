import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Truck,
  CreditCard,
  FileText,
  LogOut,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3,
  IndianRupee,
  MapPin,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import { NeoInput } from "@/components/neo/NeoInput";
import { supabase } from "@/lib/supabase";

const DriverDashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_number: "",
    vehicle_type: "",
    aadhar_number: "",
    license_number: "",
    bank_account: "",
    ifsc_code: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/driver-login");
        return;
      }

      setUser(user);

      // Fetch driver profile
      const { data: driverData, error } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (driverData) {
        setDriver(driverData);
        setFormData({
          name: driverData.name || "",
          phone: driverData.phone || "",
          email: driverData.email || user.email || "",
          vehicle_number: driverData.vehicle_number || "",
          vehicle_type: driverData.vehicle_type || "",
          aadhar_number: driverData.aadhar_number || "",
          license_number: driverData.license_number || "",
          bank_account: driverData.bank_account || "",
          ifsc_code: driverData.ifsc_code || "",
        });
      }
    } catch (err) {
      console.error("Auth check error:", err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("drivers")
        .update({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          vehicle_number: formData.vehicle_number,
          vehicle_type: formData.vehicle_type,
          aadhar_number: formData.aadhar_number,
          license_number: formData.license_number,
          bank_account: formData.bank_account,
          ifsc_code: formData.ifsc_code,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      setSuccess("Profile updated successfully!");
      setEditing(false);

      // Refresh driver data
      const { data } = await supabase
        .from("drivers")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setDriver(data);

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Save error:", err);
      setError(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/driver-login");
  };

  if (loading) {
    return (
      <NeoLayout>
        <div className="container mx-auto px-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
            <p className="font-bold text-xl">Loading your profile...</p>
          </div>
        </div>
      </NeoLayout>
    );
  }

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8 border-b-4 border-black pb-6 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-black uppercase mb-2">
              Driver <span className="text-[#FF8C00]">Dashboard</span>
            </h1>
            <p className="text-xl font-medium">
              Welcome back,{" "}
              <span className="font-black">{formData.name || "Pilot"}</span>!
            </p>
          </div>
          <NeoButton variant="secondary" onClick={handleLogout}>
            <LogOut className="w-5 h-5" /> Logout
          </NeoButton>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <NeoCard className="bg-[#22C55E] text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 border-2 border-white flex items-center justify-center">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold opacity-80">Total Trips</p>
                <p className="text-4xl font-black">
                  {driver?.total_trips || 0}
                </p>
              </div>
            </div>
          </NeoCard>

          <NeoCard className="bg-[#FF8C00]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 border-2 border-black flex items-center justify-center">
                <IndianRupee className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold opacity-80">Total Earnings</p>
                <p className="text-4xl font-black">
                  ₹{driver?.total_earnings?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </NeoCard>

          <NeoCard className="bg-black text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 border-2 border-white flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold opacity-80">Status</p>
                <p className="text-2xl font-black uppercase">
                  {driver?.status?.replace(/_/g, " ") || "Pending"}
                </p>
              </div>
            </div>
          </NeoCard>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border-4 border-green-500 p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <p className="font-bold text-green-700">{success}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-4 border-red-500 p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="font-bold text-red-700">{error}</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left - Profile Card */}
          <div className="lg:col-span-1">
            <NeoCard className="bg-white text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF8C00] to-[#22C55E] border-4 border-black mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-1">
                {formData.name || "Pilot"}
              </h3>
              <p className="font-medium text-gray-500 mb-4">{formData.email}</p>

              <div className="border-t-2 border-gray-200 pt-4 mt-4 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">
                    {formData.phone || "Not added"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">
                    {formData.vehicle_number || "Not added"}
                  </span>
                </div>
              </div>

              {!editing && (
                <NeoButton
                  variant="secondary"
                  className="w-full mt-6"
                  onClick={() => setEditing(true)}
                >
                  <Edit2 className="w-5 h-5" /> Edit Profile
                </NeoButton>
              )}
            </NeoCard>
          </div>

          {/* Right - Profile Details */}
          <div className="lg:col-span-2">
            <NeoCard className="bg-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black uppercase">
                  Profile Details
                </h3>
                {editing && (
                  <div className="flex gap-2">
                    <NeoButton
                      variant="secondary"
                      className="py-2 px-4"
                      onClick={() => setEditing(false)}
                    >
                      <X className="w-4 h-4" /> Cancel
                    </NeoButton>
                    <NeoButton
                      className="py-2 px-4"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save
                    </NeoButton>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-gray-500 border-b-2 border-gray-200 pb-2">
                    Personal Information
                  </h4>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.name || "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Phone
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.phone || "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Email
                    </label>
                    <p className="font-bold text-lg">{formData.email}</p>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-gray-500 border-b-2 border-gray-200 pb-2">
                    Vehicle Information
                  </h4>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Vehicle Number
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="vehicle_number"
                        value={formData.vehicle_number}
                        onChange={handleChange}
                        placeholder="MH 01 AB 1234"
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.vehicle_number || "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Vehicle Type
                    </label>
                    {editing ? (
                      <select
                        name="vehicle_type"
                        value={formData.vehicle_type}
                        onChange={handleChange}
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      >
                        <option value="">Select Vehicle</option>
                        <option value="tata-ace">Tata Ace (0.75 MT)</option>
                        <option value="bolero">Bolero Pickup (1.5 MT)</option>
                        <option value="14ft">14 ft Truck (4 MT)</option>
                        <option value="17ft">17 ft Truck (5 MT)</option>
                        <option value="22ft">22 ft Truck (9 MT)</option>
                        <option value="32ft">32 ft Container</option>
                      </select>
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.vehicle_type || "—"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Documents */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-gray-500 border-b-2 border-gray-200 pb-2">
                    Documents
                  </h4>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Aadhar Number
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="aadhar_number"
                        value={formData.aadhar_number}
                        onChange={handleChange}
                        placeholder="1234 5678 9012"
                        maxLength={14}
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.aadhar_number
                          ? `****${formData.aadhar_number.slice(-4)}`
                          : "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      License Number
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="license_number"
                        value={formData.license_number}
                        onChange={handleChange}
                        placeholder="DL-1234567890"
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.license_number || "—"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                  <h4 className="font-black text-sm uppercase text-gray-500 border-b-2 border-gray-200 pb-2">
                    Bank Details
                  </h4>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      Account Number
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="bank_account"
                        value={formData.bank_account}
                        onChange={handleChange}
                        placeholder="Account number"
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.bank_account
                          ? `****${formData.bank_account.slice(-4)}`
                          : "—"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-sm uppercase text-gray-600">
                      IFSC Code
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleChange}
                        placeholder="BANK0001234"
                        className="w-full border-2 border-black p-3 font-bold mt-1"
                      />
                    ) : (
                      <p className="font-bold text-lg">
                        {formData.ifsc_code || "—"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </NeoCard>
          </div>
        </div>
      </div>
    </NeoLayout>
  );
};

export default DriverDashboardPage;
