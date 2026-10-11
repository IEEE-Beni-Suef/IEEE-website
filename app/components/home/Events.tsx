import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

import timeImg from "../../assets/images/Events/TimeImage.png";
import rymImg from "../../assets/images/Events/RYMImage.png";
import ewImg from "../../assets/images/Events/EnterpreneurshipWeekImage.png";
import defaultImage from "../../assets/images/heroImage1.png";

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  venue?: string;
  organizer?: string;
  photo: string;
}

const defaultEvents: EventItem[] = [
  {
    id: "time-event",
    title: "T.I.M.E",
    description:
      "T.I.M.E is an event that brings together Technology, Innovation, Management, and Entrepreneurship, offering students an opportunity to explore emerging ideas, broaden their perspectives, and discover new possibilities at the intersection of technology and business.",
    venue: "Creativa Hub, Beni Suef — Silicon Waha, Smart Village.",
    organizer: "IEEE Beni Suef Student Branch.",
    photo: timeImg,
  },
  {
    id: "rym-event",
    title: "RYM",
    subtitle: "Recode Your Mind",
    description:
      "Recode Your Mind (RYM) is an engaging event designed to encourage personal growth, reshape perspectives, and inspire positive change. Through interactive sessions and thought-provoking discussions, participants are encouraged to challenge their mindsets, unlock their potential, and develop a more focused and growth-oriented approach to their personal and academic journeys.",
    photo: rymImg,
  },
  {
    id: "entrepreneurship-week",
    title: "IEEE Entrepreneurship Week",
    description:
      "IEEE Beni Suef Student Branch participated in IEEE Entrepreneurship Week, an opportunity to explore entrepreneurship, exchange ideas, and connect with fellow IEEE members. The experience encouraged learning, collaboration, and exposure to new perspectives on innovation and entrepreneurial thinking.",
    photo: ewImg,
  },
];

export default function Events() {
    const eventsData = defaultEvents;

    // Default active index is the middle card (index 1)
    const defaultActiveIndex = 1;
    const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

    return (
        <section id="events" className="relative w-full overflow-hidden pt-8 sm:pt-10 pb-12 sm:pb-20 min-h-screen bg-white">
            {/* Background Circles */}
            <div className="absolute top-[-633px] left-[-607px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-40 sm:opacity-80 pointer-events-none" />
            <div className="absolute top-[838px] right-[-480px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-40 sm:opacity-100 pointer-events-none" />
            <div className="absolute top-[935px] right-[-200px] w-[961px] h-[961px] bg-[#E6DBF2] rounded-full opacity-40 sm:opacity-100 pointer-events-none" />
            
            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
                {/* Title & Description Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto max-w-4xl space-y-4 sm:space-y-6 text-center"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-[#000640]">
                        Our Events & <span className="text-[#5A10A5]">Activities</span>
                    </h1>
                    <p className="text-[#293A8F] leading-relaxed text-sm sm:text-lg max-w-2xl mx-auto px-2">
                        Explore the events, workshops, and activities organized or participated in by our IEEE branch.
                        These events reflect our commitment to knowledge sharing, technical development,
                        and building a strong community of future engineers and innovators.
                    </p>
                </motion.div>

                {/* 3-Column Cards Container */}
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            }
                        },
                        hidden: {}
                    }}
                    onMouseLeave={() => setActiveIndex(defaultActiveIndex)}
                    className="mt-10 sm:mt-20 flex flex-col md:flex-row justify-center items-center gap-10 sm:gap-14 md:gap-16 lg:gap-24 w-full max-w-[1440px] mx-auto min-h-[540px]"
                >
                    {eventsData.map((event, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <motion.div 
                                key={event.id}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.85, y: 30 },
                                    visible: { 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0,
                                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                                    }
                                }}
                                className={`relative h-[430px] sm:h-[480px] md:h-[520px] group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                                    ${isOpen ? 'w-[470px] sm:w-[530px] md:w-[570px]' : 'w-[230px] sm:w-[260px] md:w-[280px]'}`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                            >
                                {/* Card Inner Container */}
                                <div className="relative w-full h-full flex items-center">
                                    
                                    {/* Left Text Description Panel */}
                                    <div className={`absolute top-0 left-0 w-[245px] sm:w-[275px] md:w-[295px] h-full bg-white border border-[#5A10A5] rounded-[32px] sm:rounded-[40px] p-6 sm:p-7 z-0 flex flex-col justify-between text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] 
                                        ${isOpen ? 'opacity-100 translate-x-0 shadow-xl pointer-events-auto' : 'opacity-0 translate-x-8 pointer-events-none'}`}>
                                        
                                        <div className="space-y-2.5 sm:space-y-3">
                                            <h2 className="text-[#480D84] text-lg sm:text-xl md:text-2xl font-extrabold leading-snug line-clamp-2">{event.title}</h2>
                                            {event.subtitle && (
                                                <p className="text-[#5A10A5] text-xs sm:text-sm font-semibold tracking-wide">{event.subtitle}</p>
                                            )}
                                            <p className="text-[#1C1A1A] text-xs sm:text-sm md:text-base leading-relaxed overflow-y-auto max-h-[200px] sm:max-h-[240px] md:max-h-[270px] pr-1.5 font-normal">{event.description}</p>
                                            {event.venue && (
                                                <div className="pt-2 border-t border-purple-100 text-xs sm:text-sm space-y-0.5 text-[#5A6A8A]">
                                                    <p><span className="font-bold text-[#000640]">Venue:</span> {event.venue}</p>
                                                    {event.organizer && <p><span className="font-bold text-[#000640]">Organizer:</span> {event.organizer}</p>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Discover CTA Button */}
                                        <div className="pt-3">
                                            <Link 
                                                to={`/article/${event.id}`} 
                                                className="flex items-center justify-center gap-2 w-full bg-[#5A10A5] text-white text-xs sm:text-sm md:text-base font-semibold py-2.5 sm:py-3 rounded-full hover:bg-[#480D84] transition-all duration-200 shadow-md hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-95"
                                            >
                                                Discover
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <polyline points="12 16 16 12 12 8"></polyline>
                                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Right Front Image Card */}
                                    <div className={`absolute top-0 right-0 w-[230px] sm:w-[260px] md:w-[280px] h-full z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white rounded-[32px] sm:rounded-[40px] overflow-hidden
                                        ${isOpen ? 'shadow-[15px_0_30px_-10px_rgba(109,16,165,0.5)] scale-[1.01]' : 'shadow-md scale-100'}`}>
                                        <img 
                                            src={event.photo || defaultImage} 
                                            alt={event.title} 
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (target.src !== defaultImage) {
                                                    target.src = defaultImage;
                                                }
                                            }}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Slider Dots */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="mt-12 sm:mt-16 flex justify-center items-center gap-3"
                >
                    {eventsData.map((_, idx) => (
                        <button 
                            key={`dot-${idx}`}
                            onClick={() => setActiveIndex(idx)} 
                            aria-label={`Slide card ${idx + 1}`}
                            className={`w-[16px] sm:w-[18px] h-[16px] sm:h-[18px] rounded-full shadow-sm cursor-pointer transition-all duration-300 ${activeIndex === idx ? 'bg-[#5A10A5] scale-110' : 'bg-[#CCB5E3] opacity-60 hover:opacity-100 scale-100'}`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
