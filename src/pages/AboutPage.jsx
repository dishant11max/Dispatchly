import React from "react";
import {
  ShieldCheck,
  Users,
  Rocket,
  Code,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import NeoLayout from "@/components/neo/NeoLayout";
import NeoCard from "@/components/neo/NeoCard";
import NeoButton from "@/components/neo/NeoButton";

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

      {/* Built By Section */}
      <section className="py-20 bg-black text-white border-y-4 border-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black uppercase mb-4">Built By</h2>
            <p className="text-xl font-medium text-gray-400">
              A solo developer passionate about solving real problems
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <NeoCard className="bg-white text-black p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="w-32 h-32 bg-gradient-to-br from-[#FF8C00] to-[#22C55E] border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex-shrink-0">
                  <Code className="w-16 h-16 text-white" />
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-3xl font-black uppercase mb-2">
                    {/* UPDATE YOUR NAME HERE */}
                    The Developer
                  </h3>
                  <p className="text-lg font-bold text-[#FF8C00] mb-4">
                    Founder & Full Stack Developer
                  </p>
                  <p className="font-medium text-gray-600 mb-6">
                    Building Dispatchly from ground up — designing, coding, and
                    shipping every feature. Passionate about creating technology
                    that empowers businesses and drivers alike.
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <a
                      href="https://github.com/YOUR_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white border-2 border-black font-bold hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      <Github className="w-5 h-5" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/YOUR_USERNAME"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white border-2 border-black font-bold hover:bg-white hover:text-[#0077B5] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                    >
                      <Linkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </NeoCard>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-black uppercase mb-6 text-gray-400">
              Built With
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React",
                "Vite",
                "Tailwind CSS",
                "React Router",
                "Lucide Icons",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/10 border-2 border-white/30 font-bold text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F4F4F5] border-b-4 border-black">
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
