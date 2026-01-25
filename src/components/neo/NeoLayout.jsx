import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NeoButton from "./NeoButton";

// Simple SVG icons for social media
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const NeoLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items with paths
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Hubs", path: "/hubs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Check if a path is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-white font-['Space_Grotesk'] text-black selection:bg-[#FF8C00] selection:text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b-4 border-black bg-white px-6 py-4 flex items-center">
        {/* Logo - Left */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-[#FF8C00] border-4 border-black flex items-center justify-center text-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            IN
          </div>
          <span className="text-2xl font-bold tracking-tighter uppercase hidden md:block">
            Dispatchly
          </span>
        </div>

        {/* Navigation - Center */}
        <div className="hidden md:flex gap-6 font-bold uppercase tracking-tight items-center absolute left-1/2 transform -translate-x-1/2 text-sm">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`transition-all ${
                isActive(item.path)
                  ? "underline decoration-4 underline-offset-4 decoration-[#FF8C00] text-[#FF8C00]"
                  : "hover:underline decoration-2 underline-offset-4 decoration-[#FF8C00]"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          className="md:hidden ml-auto p-2 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
            className="py-2 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm"
            onClick={() => navigate("/driver-login")}
          >
            Driver Login
          </NeoButton>
          <NeoButton
            variant="dark"
            className="py-2 px-4 shadow-[4px_4px_0px_0px_rgba(128,128,128,1)] text-sm"
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
              className="absolute top-4 right-4 p-2 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className={`text-left text-xl font-bold uppercase border-b-4 border-black pb-2 transition-colors ${
                    isActive(item.path)
                      ? "text-[#FF8C00]"
                      : "hover:text-[#FF8C00]"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 text-left">
            {/* Brand */}
            <div>
              <h3 className="font-black text-2xl mb-4 uppercase">Dispatchly</h3>
              <p className="font-medium mb-4">
                India's modern logistics network.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <InstagramIcon />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Quick Links</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:underline text-left"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/hubs")}
                    className="hover:underline text-left"
                  >
                    Hub Locations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="hover:underline text-left"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* For Drivers */}
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">For Drivers</h3>
              <ul className="space-y-2 font-bold">
                <li>
                  <button
                    onClick={() => navigate("/driver-login")}
                    className="hover:underline text-left"
                  >
                    Driver Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/driver-login")}
                    className="hover:underline text-left"
                  >
                    Register as Pilot
                  </button>
                </li>
                <li>
                  <span className="opacity-60">Driver Support</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-black text-xl mb-4 uppercase">Contact</h3>
              <p className="font-medium">support@dispatchly.in</p>
              <p className="font-medium">+91 80 1234 5678</p>
              <p className="font-medium mt-4 text-sm opacity-80">
                Mon - Sat: 9AM - 9PM IST
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t-2 border-black/20">
            <div className="font-mono text-sm opacity-80">
              © 2026 DISPATCHLY INDIA. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm font-bold">
              <button className="hover:underline opacity-80 hover:opacity-100">
                Privacy Policy
              </button>
              <button className="hover:underline opacity-80 hover:opacity-100">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NeoLayout;
