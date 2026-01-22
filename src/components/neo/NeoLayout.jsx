import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeoButton from "./NeoButton";

const NeoLayout = ({ children }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black selection:bg-[#FF8C00] selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b-4 border-black bg-white px-6 py-4 flex items-center">
        {/* Logo - Left */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-[#FF8C00] border-2 border-black flex items-center justify-center text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            IN
          </div>
          <span className="text-2xl font-bold tracking-tighter uppercase hidden md:block">
            Dispatchly
          </span>
        </div>

        {/* Navigation - Center */}
        <div className="hidden md:flex gap-6 font-bold uppercase tracking-tight items-center absolute left-1/2 transform -translate-x-1/2">
          <button
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF8C00]"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF8C00]"
            onClick={() => navigate("/services")}
          >
            Services
          </button>
          <button
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF8C00]"
            onClick={() => navigate("/hubs")}
          >
            Hubs
          </button>
          <button
            className="hover:underline decoration-4 underline-offset-4 decoration-[#FF8C00]"
            onClick={() => navigate("/about")}
          >
            About
          </button>
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="md:hidden ml-auto p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          onClick={() => setMobileMenuOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Action Buttons - Right - Desktop Only */}
        <div className="hidden md:flex gap-4 ml-auto">
          <NeoButton
            variant="secondary"
            className="py-2 px-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            onClick={() => navigate("/driver-login")}
          >
            Driver Login
          </NeoButton>
          <NeoButton
            variant="dark"
            className="py-2 px-4 shadow-[3px_3px_0px_0px_rgba(128,128,128,1)]"
          >
            Admin
          </NeoButton>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-64 bg-white border-l-4 border-black shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.1)] p-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mt-16 flex flex-col gap-6">
              <button
                className="text-left text-xl font-bold uppercase hover:text-[#FF8C00] border-b-2 border-black pb-2"
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </button>
              <button
                className="text-left text-xl font-bold uppercase hover:text-[#FF8C00] border-b-2 border-black pb-2"
                onClick={() => {
                  navigate("/services");
                  setMobileMenuOpen(false);
                }}
              >
                Services
              </button>
              <button
                className="text-left text-xl font-bold uppercase hover:text-[#FF8C00] border-b-2 border-black pb-2"
                onClick={() => {
                  navigate("/hubs");
                  setMobileMenuOpen(false);
                }}
              >
                Hubs
              </button>
              <button
                className="text-left text-xl font-bold uppercase hover:text-[#FF8C00] border-b-2 border-black pb-2"
                onClick={() => {
                  navigate("/about");
                  setMobileMenuOpen(false);
                }}
              >
                About
              </button>

              <div className="mt-8 flex flex-col gap-4">
                <NeoButton
                  variant="secondary"
                  className="w-full py-3"
                  onClick={() => {
                    navigate("/driver-login");
                    setMobileMenuOpen(false);
                  }}
                >
                  Driver Login
                </NeoButton>
                <NeoButton
                  variant="dark"
                  className="w-full py-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </NeoButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#FF8C00] border-t-4 border-black py-12 px-6 text-center mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
            <div>
              <h3 className="font-black text-2xl mb-4 uppercase">Dispatchly</h3>
              <p className="font-medium">India's modern logistics network.</p>
            </div>
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Links</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <a href="#" className="hover:underline">
                    Join as Driver
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Partner with us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Contact</h3>
              <p className="font-medium">support@dispatchly.in</p>
              <p className="font-medium">+91 80 1234 5678</p>
            </div>
          </div>
          <div className="font-mono text-sm opacity-80 pt-8 border-t-2 border-black/20">
            © 2026 DISPATCHLY INDIA.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeoLayout;
