import React from 'react';
import { Cpu, Users, Rocket, ArrowRight, Sparkles } from 'lucide-react';

import heroBg1 from "../../assets/images/heroBg1.png"

const IEEEAboutSection: React.FC = () => {
  const cards = [
    {
      title: "Hands On Workshops",
      icon: <Cpu className="w-6 h-6 text-white" />,
      description: "From embedded systems to AI, our technical sessions bridge the gap between theory and real-world engineering applications.",
      bgColor: "bg-purple-600"
    },
    {
      title: "Global Community",
      icon: <Users className="w-6 h-6 text-white" />,
      description: "Connect with a diverse network of students and professionals. Experience the power of collaboration within the world's largest technical organization.",
      bgColor: "bg-blue-600"
    },
    {
      title: "Infinite Opportunities",
      icon: <Rocket className="w-6 h-6 text-white" />,
      description: "Unlock access to international competitions, IEEE Xplore, exclusive internships, and professional certification programs to boost your career.",
      bgColor: "bg-indigo-700"
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#F9F7FF] py-16 px-4 overflow-hidden font-sans">
      {/* Decorative Sparkles/Stars */}
      <Sparkles className="absolute top-10 left-10 text-purple-200 w-8 h-8 opacity-50" />
      <Sparkles className="absolute bottom-20 right-10 text-purple-200 w-12 h-12 opacity-50" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
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
        <p className="max-w-3xl text-center text-indigo-900/70 text-sm md:text-base mb-12 font-medium leading-relaxed">
          IEEE Beni Suef Student Branch Is More Than Just A Community; It's A Launchpad 
          For Innovation. We Connect Aspiring Engineering Students With The Global 
          Standard Of IEEE, Fostering A Culture Of Technical Excellence And Collaborative Growth.
        </p>

        {/* Main Image Component */}
        <div className="relative group w-full max-w-4xl mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={heroBg1} 
              alt="IEEE Beni Suef Team" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-8 left-8">
              <div className="w-full h-1.5 bg-[var(--color-primary-normal)] mb-2 rounded-full"></div>
              <p className="text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                Beni Suef, Egypt
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {cards.map((card, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${card.bgColor} w-10 h-10 rounded-lg flex items-center justify-center mb-6`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg">
          Join Our Team
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default IEEEAboutSection;