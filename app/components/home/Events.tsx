import React, { useState, useEffect } from 'react';
import { useAllArticles } from '../../hooks/useApi';
import { Link } from 'react-router';

const defaultImage = new URL("./Events.png", import.meta.url).href;

export default function Events() {
    const { data: articles, isLoading, error } = useAllArticles();
    
    // Filter for events and take only the first 3
    const eventsData = articles
        ? articles.filter(article => article.categoryName === "Events").slice(0, 3)
        : [];


    // State لتتبع الدورة الحالية (0 = المنتصف مفتوح، 1 = الأطراف مفتوحة)
    const [cycleStep, setCycleStep] = useState<number>(0);
    // State لتتبع العنصر الذي يقع عليه مؤشر الماوس (Hover)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // 2. إدارة التبديل التلقائي (Auto-sliding) باستخدام useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            // تبديل الحالة بين 0 و 1 كل 4 ثوانٍ
            setCycleStep((prev) => (prev === 0 ? 1 : 0));
        }, 4000); 

        // تنظيف الـ Interval عند تدمير المكون لتجنب Memory Leaks
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full overflow-hidden pt-10 pb-40 min-h-screen bg-white">
            {/* الدوائر الخلفية */}
            <div className="absolute top-[-633px] left-[-607px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-80 pointer-events-none"></div>
            <div className="absolute top-[838px] left-[1116px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full pointer-events-none"></div>
            <div className="absolute top-[935px] left-[756px] w-[961px] h-[961px] bg-[#E6DBF2] rounded-full pointer-events-none"></div>
            
            {/* المحتوى */}
            <div className="relative z-10 container mx-auto px-4">
                {/* العنوان والوصف */}
                <div className="mx-auto max-w-4xl space-y-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#000640]">
                        Our Events & <span className="text-[#5A10A5]">Activities</span>
                    </h1>
                    <p className="text-[#293A8F] leading-relaxed text-lg max-w-2xl mx-auto">
                        Explore the events, workshops, and activities organized or participated in by our IEEE branch.
                        These events reflect our commitment to knowledge sharing, technical development,
                        and building a strong community of future engineers and innovators.
                    </p>
                </div>

                {/* الكروت (Cards) */}
                <div className="mt-20 flex flex-row justify-center gap-[120px] items-center w-full max-w-7xl mx-auto px-4">
                    {eventsData.map((event, index) => {
                        // تحديد ما إذا كان الكارت هو الأوسط
                        const isCenter = index === 1;
                        
                        // تحديد الحالة الافتراضية بناءً على الدورة الحالية (اللفة)
                        // اللفة 0: الأوسط مفتوح. اللفة 1: الأطراف مفتوحة.
                        const isDefaultOpen = cycleStep === 0 ? isCenter : !isCenter;
                        
                        // التحقق من حالة الـ Hover لعكس الحالة (XOR Logic)
                        const isHovered = hoveredIndex === index;
                        const isOpen = isHovered ? !isDefaultOpen : isDefaultOpen;

                        return (
                            <div 
                                key={event.id}
                                className="relative ml-10 mr-10 w-[250px] h-[452px] group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* حاوية النص (الكتاب المفتوح) */}
                                {/* استخدمنا transform: translateX للحصول على أداء أفضل في الأنيميشن */}
                                <div className={`absolute top-0 left-0 w-[280px] h-[452px] bg-white border border-[#5A10A5] rounded-[32px] p-8 pr-16 z-0 flex flex-col justify-center text-left transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] 
                                    ${isOpen ? '-translate-x-[160px] opacity-100 shadow-xl' : 'translate-x-0 opacity-0 pointer-events-none'}`}>
                                    <h2 className="text-[#480D84] text-2xl font-bold mb-4 line-clamp-2">{event.title}</h2>
                                    <p className="text-[#1C1A1A] text-sm leading-relaxed line-clamp-6">{event.description}</p>
                                </div>

                                {/* حاوية الصورة */}
                                <div className={`relative ة w-[250px] h-[452px] z-10 transition-all duration-700 ease-in-out bg-white rounded-[40px] overflow-hidden
                                    ${isOpen ? 'shadow-[25px_0_40px_-10px_#6D10A580]' : 'shadow-md'}`}>
                                    <img src={event.photo || defaultImage} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                                    
                                    {/* زر Discover - يظهر فقط عندما يكون الكارت مفتوحاً */}
                                    <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6 transition-all duration-700 delay-100 
                                        ${isOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-10 opacity-0 invisible'}`}>
                                        <Link to={`/article/${event.id}`} className="flex items-center justify-center gap-2 w-full bg-[#5A10A5] text-white text-base font-semibold py-3 rounded-full hover:bg-[#480D84] transition-colors shadow-lg backdrop-blur-sm bg-opacity-95">
                                            Discover
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 16 16 12 12 8"></polyline>
                                                <line x1="8" y1="12" x2="16" y2="12"></line>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* مؤشرات الحركة (Slider Dots) تعكس الدورة الحالية */}
                <div className="mt-24 flex justify-center items-center gap-3">
                    <div onClick={() => setCycleStep(0)} className={`w-[18px] h-[18px] rounded-full shadow-sm cursor-pointer transition-colors duration-300 ${cycleStep === 0 ? 'bg-[#5A10A5]' : 'bg-[#CCB5E3] opacity-60 hover:opacity-100'}`}></div>
                    <div onClick={() => setCycleStep(1)} className={`w-[18px] h-[18px] rounded-full shadow-sm cursor-pointer transition-colors duration-300 ${cycleStep === 1 ? 'bg-[#5A10A5]' : 'bg-[#CCB5E3] opacity-60 hover:opacity-100'}`}></div>
                </div>

                {/* الزر الرئيسي */}
                <div className="mt-10 flex justify-center">
                    <Link to="/events" className="inline-block bg-[#5A10A5] text-white text-center text-lg font-semibold px-16 py-3 rounded-full hover:bg-[#480D84] transition-colors shadow-lg min-w-[250px]">
                        Discover more
                    </Link>
                </div>
            </div>
        </section>
    );
}