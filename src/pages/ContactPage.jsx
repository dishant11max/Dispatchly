import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Send,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";
import { NeoInput, NeoSelect, NeoTextarea } from "@/components/neo/NeoInput";

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const faqs = [
    {
      question: "What areas do you cover?",
      answer:
        "We currently operate in 50+ cities across India including Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad. We're expanding to more cities every month.",
    },
    {
      question: "How is the pricing calculated?",
      answer:
        "Pricing is based on distance, vehicle type, and cargo weight. We offer transparent pricing with no hidden charges. You can get an instant quote through our booking system before confirming.",
    },
    {
      question: "How do I track my shipment?",
      answer:
        "Once your shipment is picked up, you'll receive a tracking link via SMS and email. You can track your cargo in real-time through our platform showing live driver location and ETA.",
    },
    {
      question: "What documents are required for shipping?",
      answer:
        "For standard shipments, you need a valid invoice/bill. For certain goods like chemicals or electronics, additional permits may be required. Our team will guide you during booking.",
    },
    {
      question: "How do drivers get paid?",
      answer:
        "Drivers receive instant payment upon successful delivery completion. We support UPI, bank transfer, and wallet payments. No waiting for weeks - get paid the same day!",
    },
    {
      question: "Is my cargo insured?",
      answer:
        "Yes, all shipments are covered under our basic transit insurance. For high-value goods, we offer additional coverage options. Check with our team for premium insurance plans.",
    },
    {
      question: "What vehicle types are available?",
      answer:
        "We have Tata Ace (0.75 MT), Bolero Pickup (1.5 MT), 14ft-22ft trucks (4-9 MT), 32ft containers (14-21 MT), and trailers (28 MT). Choose based on your cargo size and weight.",
    },
    {
      question: "How do I become a Dispatchly driver?",
      answer:
        "Click on 'Driver Login' and register with your mobile number. You'll need to submit your Aadhar, Driving License, Vehicle RC, and bank details. Verification takes 24-48 hours.",
    },
  ];

  return (
    <NeoLayout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 border-b-4 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">
            Get in <span className="text-[#FF8C00]">Touch</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl">
            Have questions? We're here to help. Reach out to our team or find
            answers in our FAQ below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#FF8C00] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black uppercase">Send a Message</h2>
            </div>

            <NeoCard className="bg-white">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#22C55E] border-4 border-black mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Send className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-medium text-gray-600">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NeoInput
                      label="Your Name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <NeoInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NeoInput
                      label="Phone (Optional)"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={10}
                    />
                    <NeoSelect
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="pricing">Pricing Question</option>
                      <option value="driver">Driver Registration</option>
                      <option value="partnership">Partnership</option>
                      <option value="complaint">Complaint</option>
                      <option value="other">Other</option>
                    </NeoSelect>
                  </div>
                  <NeoTextarea
                    label="Message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                  <NeoButton type="submit" className="w-full">
                    Send Message <Send className="w-5 h-5" />
                  </NeoButton>
                </form>
              )}
            </NeoCard>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#22C55E] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase">Contact Info</h2>
            </div>

            <div className="space-y-6">
              <NeoCard className="bg-white flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase mb-1">Email Us</h3>
                  <p className="font-medium">support@dispatchly.in</p>
                  <p className="font-medium text-gray-500">
                    sales@dispatchly.in
                  </p>
                </div>
              </NeoCard>

              <NeoCard className="bg-white flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase mb-1">Call Us</h3>
                  <p className="font-medium">+91 80 1234 5678</p>
                  <p className="font-medium text-gray-500">
                    Toll Free: 1800-XXX-XXXX
                  </p>
                </div>
              </NeoCard>

              <NeoCard className="bg-white flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase mb-1">Working Hours</h3>
                  <p className="font-medium">Monday - Saturday</p>
                  <p className="font-medium text-gray-500">
                    9:00 AM - 9:00 PM IST
                  </p>
                </div>
              </NeoCard>

              <NeoCard className="bg-white flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black uppercase mb-1">Head Office</h3>
                  <p className="font-medium">
                    Dispatchly Technologies Pvt. Ltd.
                  </p>
                  <p className="font-medium text-gray-500">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </NeoCard>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-left font-bold text-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform flex-shrink-0 ml-4 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 border-t-2 border-gray-200 pt-4">
                    <p className="font-medium text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </NeoLayout>
  );
};

export default ContactPage;
