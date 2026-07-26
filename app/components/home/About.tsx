import React, { useMemo } from 'react';
import { Cpu, Users, Rocket, ArrowRight } from 'lucide-react';

import heroBg1 from "../../assets/images/heroBg1.png";

// ── Deterministic pseudo-random helper (no external lib needed) ──────────────
// Uses a simple LCG so star positions are identical on every render/hydration.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  dur: number;
  delay: number;
  opacity: number;
}

const IEEEAboutSection: React.FC = () => {
  // Generate 45 stars once – stable across re-renders
  const stars = useMemo<Star[]>(() => {
    const rand = seededRandom(42);
    return Array.from({ length: 45 }, (_, i) => ({
      id: i,
      top: `${rand() * 100}%`,
      left: `${rand() * 100}%`,
      size: 1 + rand() * 2.5,           // 1 – 3.5 px
      dur: 2.5 + rand() * 4,            // 2.5 – 6.5 s
      delay: -(rand() * 5),             // stagger start positions
      opacity: 0.2 + rand() * 0.55,     // 0.2 – 0.75
    }));
  }, []);

  const cards = [
    {
      title: "Hands On Workshops",
      Icon: Cpu,
      description: "From embedded systems to AI, our technical sessions bridge the gap between theory and real-world engineering applications.",
      bgColor: "bg-purple-600",
      decorativeColor: "text-purple-600",
    },
    {
      title: "Global Community",
      Icon: Users,
      description: "Connect with a diverse network of students and professionals. Experience the power of collaboration within the world's largest technical organization.",
      bgColor: "bg-blue-600",
      decorativeColor: "text-blue-600",
    },
    {
      title: "Infinite Opportunities",
      Icon: Rocket,
      description: "Unlock access to international competitions, IEEE Xplore, exclusive internships, and professional certification programs to boost your career.",
      bgColor: "bg-indigo-700",
      decorativeColor: "text-indigo-700",
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#F9F7FF] py-16 px-4 overflow-hidden font-sans">

      {/* ── Animated Star Background ─────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star) => (
          <span
            key={star.id}
            className="about-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              // CSS custom props consumed by .about-star animation
              ['--dur' as string]: `${star.dur}s`,
              ['--delay' as string]: `${star.delay}s`,
            }}
          />
        ))}

        {/* Two large soft glow orbs for extra depth */}
        <div
          className="absolute rounded-full"
          style={{
            width: 320, height: 320,
            top: '8%', left: '-6%',
            background: 'radial-gradient(circle, rgba(90,16,165,0.07) 0%, transparent 70%)',
            animation: 'star-drift 9s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 260, height: 260,
            bottom: '10%', right: '-4%',
            background: 'radial-gradient(circle, rgba(68,96,239,0.07) 0%, transparent 70%)',
            animation: 'star-drift 11s ease-in-out infinite 2s',
          }}
        />
      </div>
      {/* ─────────────────────────────────────────────────────────────────── */}

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Top Badge */}
        <div className="mb-6 px-4 py-1 rounded-full border border-purple-200 bg-white shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700">
            • Advancing Technology for Humanity
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-[#1A1A40] leading-tight mb-6">
          Empowering the Next <br />
          Generation of <span className="text-indigo-600">Engineers</span>
        </h1>

        {/* Description */}
        <p className="max-w-3xl text-center text-[#3348B3] text-sm md:text-base mb-12 font-medium leading-relaxed">
          IEEE Beni Suef Student Branch Is More Than Just A Community; It's A Launchpad
          For Innovation. We Connect Aspiring Engineering Students With The Global
          Standard Of IEEE, Fostering A Culture Of Technical Excellence And Collaborative Growth.
        </p>

        {/* Main Image */}
        <div className="relative group w-full max-w-4xl mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative overflow-hidden rounded-2xl shadow-[6px_6px_34px_rgba(90,16,165,0.7)]">
            <img
              src={heroBg1}
              alt="IEEE Beni Suef Team"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-8 left-8">
              <div className="w-full h-1.5 bg-[var(--color-primary-normal)] mb-2 rounded-full" />
              <p className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                Beni Suef, Egypt
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {cards.map((card, index) => {
            const { Icon } = card;
            return (
              <div
                key={index}
                className="relative overflow-hidden bg-white p-8 rounded-2xl border border-[#BABBBF] shadow-sm hover:border-[#707073] transition-colors duration-200"
              >
                {/* Decorative background icon */}
                <div
                  aria-hidden="true"
                  className={`absolute -bottom-4 -right-4 ${card.decorativeColor} opacity-[0.07] pointer-events-none`}
                >
                  <Icon className="w-36 h-36" />
                </div>

                {/* Badge icon */}
                <div className={`${card.bgColor} w-10 h-10 rounded-lg flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <button className="flex items-center gap-2 bg-[var(--color-primary-normal)] hover:bg-[var(--color-primary-normal-hover)] text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
          Join Our Team
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default IEEEAboutSection;