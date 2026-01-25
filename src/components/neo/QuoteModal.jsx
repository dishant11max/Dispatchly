import React, { useState } from "react";
import {
  MapPin,
  Package,
  Calendar,
  Phone,
  User,
  Truck,
  Weight,
  CheckCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import NeoModal from "./NeoModal";
import NeoButton from "./NeoButton";
import { NeoInput, NeoSelect, NeoTextarea } from "./NeoInput";
import { quoteService } from "@/lib/services";

const QuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quoteId, setQuoteId] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1 - Locations
    pickupCity: "",
    pickupAddress: "",
    deliveryCity: "",
    deliveryAddress: "",
    // Step 2 - Cargo
    cargoType: "",
    weight: "",
    vehicleType: "",
    specialInstructions: "",
    // Step 3 - Contact
    name: "",
    phone: "",
    email: "",
    preferredDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await quoteService.submitQuote(formData);
      setQuoteId(result.id);
      setSubmitted(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      setError(err.message || "Failed to submit quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSubmitted(false);
    setLoading(false);
    setError(null);
    setQuoteId(null);
    setFormData({
      pickupCity: "",
      pickupAddress: "",
      deliveryCity: "",
      deliveryAddress: "",
      cargoType: "",
      weight: "",
      vehicleType: "",
      specialInstructions: "",
      name: "",
      phone: "",
      email: "",
      preferredDate: "",
    });
    onClose();
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const cities = [
    "Mumbai",
    "Delhi NCR",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  const cargoTypes = [
    "General Goods",
    "Electronics",
    "Furniture",
    "Machinery",
    "Perishables",
    "Pharmaceuticals",
    "Textiles",
    "Raw Materials",
    "Other",
  ];

  const vehicleTypes = [
    { value: "tata-ace", label: "Tata Ace (0.75 MT)" },
    { value: "bolero", label: "Bolero Pickup (1.5 MT)" },
    { value: "14ft", label: "14 ft Truck (4 MT)" },
    { value: "17ft", label: "17 ft Truck (5 MT)" },
    { value: "19ft", label: "19 ft Truck (7 MT)" },
    { value: "22ft", label: "22 ft Truck (9 MT)" },
    { value: "32ft-sxl", label: "32 ft SXL (14 MT)" },
    { value: "32ft-mxl", label: "32 ft MXL (21 MT)" },
    { value: "trailer", label: "Trailer (28 MT)" },
  ];

  // Success state
  if (submitted) {
    return (
      <NeoModal
        isOpen={isOpen}
        onClose={handleClose}
        title="Quote Requested"
        size="md"
      >
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-[#22C55E] border-4 border-black mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-black uppercase mb-4">
            Request Received!
          </h3>
          <p className="text-lg font-medium mb-2">
            Quote ID:{" "}
            <span className="font-black font-mono">
              {quoteId ? quoteId.slice(0, 8).toUpperCase() : "—"}
            </span>
          </p>
          <p className="text-gray-600 mb-8">
            Our team will contact you within{" "}
            <span className="font-bold">2 hours</span> with a detailed quote.
          </p>
          <div className="bg-gray-50 border-4 border-black p-4 text-left mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
              <div>
                <span className="opacity-60">From:</span>
                <p className="font-bold">{formData.pickupCity}</p>
              </div>
              <div>
                <span className="opacity-60">To:</span>
                <p className="font-bold">{formData.deliveryCity}</p>
              </div>
              <div>
                <span className="opacity-60">Cargo:</span>
                <p className="font-bold">{formData.cargoType}</p>
              </div>
              <div>
                <span className="opacity-60">Contact:</span>
                <p className="font-bold">{formData.phone}</p>
              </div>
            </div>
          </div>
          <NeoButton onClick={handleClose} className="w-full">
            Done
          </NeoButton>
        </div>
      </NeoModal>
    );
  }

  return (
    <NeoModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Get a Quote"
      size="lg"
    >
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 border-4 border-black flex items-center justify-center font-black text-lg transition-colors ${
                s <= step ? "bg-[#FF8C00]" : "bg-gray-100"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 md:w-24 h-1 border-y-2 border-black ${
                  s < step ? "bg-[#FF8C00]" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-6 text-sm font-bold uppercase">
        <span className={step >= 1 ? "text-[#FF8C00]" : "text-gray-400"}>
          Locations
        </span>
        <span className={step >= 2 ? "text-[#FF8C00]" : "text-gray-400"}>
          Cargo
        </span>
        <span className={step >= 3 ? "text-[#FF8C00]" : "text-gray-400"}>
          Contact
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1 - Locations */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[#22C55E]/10 border-4 border-[#22C55E] p-4 mb-6">
              <div className="flex items-center gap-2 font-bold text-[#22C55E]">
                <MapPin className="w-5 h-5" />
                <span>PICKUP LOCATION</span>
              </div>
            </div>
            <NeoSelect
              label="Pickup City"
              name="pickupCity"
              value={formData.pickupCity}
              onChange={handleChange}
              icon={MapPin}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </NeoSelect>
            <NeoInput
              label="Pickup Address"
              name="pickupAddress"
              placeholder="Street, Area, Landmark"
              value={formData.pickupAddress}
              onChange={handleChange}
              required
            />

            <div className="bg-[#FF8C00]/10 border-4 border-[#FF8C00] p-4 mt-8">
              <div className="flex items-center gap-2 font-bold text-[#FF8C00]">
                <MapPin className="w-5 h-5" />
                <span>DELIVERY LOCATION</span>
              </div>
            </div>
            <NeoSelect
              label="Delivery City"
              name="deliveryCity"
              value={formData.deliveryCity}
              onChange={handleChange}
              icon={MapPin}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </NeoSelect>
            <NeoInput
              label="Delivery Address"
              name="deliveryAddress"
              placeholder="Street, Area, Landmark"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Step 2 - Cargo Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <NeoSelect
              label="Cargo Type"
              name="cargoType"
              value={formData.cargoType}
              onChange={handleChange}
              icon={Package}
              required
            >
              <option value="">Select Cargo Type</option>
              {cargoTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </NeoSelect>

            <NeoInput
              label="Approximate Weight (in KG)"
              name="weight"
              type="number"
              placeholder="e.g., 500"
              value={formData.weight}
              onChange={handleChange}
              icon={Weight}
              required
            />

            <NeoSelect
              label="Preferred Vehicle Type"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              icon={Truck}
              required
            >
              <option value="">Select Vehicle</option>
              {vehicleTypes.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </NeoSelect>

            <NeoTextarea
              label="Special Instructions (Optional)"
              name="specialInstructions"
              placeholder="Fragile items, stacking restrictions, loading/unloading requirements..."
              value={formData.specialInstructions}
              onChange={handleChange}
              rows={3}
            />
          </div>
        )}

        {/* Step 3 - Contact Info */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <NeoInput
              label="Your Name"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              icon={User}
              required
            />

            <NeoInput
              label="Mobile Number"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
              maxLength={10}
              required
            />

            <NeoInput
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <NeoInput
              label="Preferred Pickup Date"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              icon={Calendar}
              required
            />

            <div className="bg-gray-50 border-4 border-black p-4 mt-6">
              <h4 className="font-black uppercase mb-2">Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm font-medium">
                <div>
                  <span className="opacity-60">Route:</span>
                  <p className="font-bold">
                    {formData.pickupCity || "—"} →{" "}
                    {formData.deliveryCity || "—"}
                  </p>
                </div>
                <div>
                  <span className="opacity-60">Cargo:</span>
                  <p className="font-bold">{formData.cargoType || "—"}</p>
                </div>
                <div>
                  <span className="opacity-60">Weight:</span>
                  <p className="font-bold">
                    {formData.weight ? `${formData.weight} KG` : "—"}
                  </p>
                </div>
                <div>
                  <span className="opacity-60">Vehicle:</span>
                  <p className="font-bold">
                    {vehicleTypes.find((v) => v.value === formData.vehicleType)
                      ?.label || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-4 border-red-500 p-4 mt-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <p className="font-bold text-red-700">{error}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <NeoButton
              type="button"
              variant="secondary"
              onClick={prevStep}
              className="flex-1"
              disabled={loading}
            >
              Back
            </NeoButton>
          )}
          {step < 3 ? (
            <NeoButton type="button" onClick={nextStep} className="flex-1">
              Next <ArrowRight className="w-5 h-5" />
            </NeoButton>
          ) : (
            <NeoButton
              type="submit"
              variant="success"
              className="flex-1"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Submit Request <CheckCircle className="w-5 h-5" />
                </>
              )}
            </NeoButton>
          )}
        </div>
      </form>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </NeoModal>
  );
};

export default QuoteModal;
