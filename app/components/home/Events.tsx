const image = new URL("./Events.png", import.meta.url).href;

export default function Events() {
    return (
        <section className="relative w-full overflow-hidden pt-10 pb-40 min-h-screen bg-white">
            {/* Circles */}
            <div className="absolute top-[-633px] left-[-607px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full opacity-80"></div>
            <div className="absolute top-[838px] left-[1116px] w-[961px] h-[961px] bg-[#CCB5E3] rounded-full"></div>
            <div className="absolute top-[935px] left-[756px] w-[961px] h-[961px] bg-[#E6DBF2] rounded-full"></div>
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4">
                {/* Event Title and Description */}
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
                {/* Cards */}
                <div className="mt-20 flex flex-row justify-between items-center w-full max-w-7xl mx-auto px-4">
                    {/* Left Card */}
                    <div className="relative w-[250px] h-[452px]">
                        <div className="absolute top-0 left-[-50px] w-[250px] h-[452px] bg-white border border-[#5A10A5] rounded-[32px] p-8 pr-14 z-0 flex flex-col justify-center text-left">
                            <h2 className="text-[#480D84] text-2xl font-bold mb-4">Event name</h2>
                            <p className="text-[#1C1A1A] text-sm leading-tight break-words">DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription</p>
                        </div>
                        <div className="relative w-[250px] h-[452px] z-10">
                            <img src={image} alt="Event" className="w-full h-full object-cover rounded-[40px]" />
                        </div>
                    </div>
                    {/* Middle Card */}
                    <div className="relative w-[250px] h-[452px]">
                        <div className="absolute top-0 left-[-150px] w-[250px] h-[452px] bg-white border border-[#5A10A5] rounded-[32px] p-8 pr-16 z-0 flex flex-col justify-center text-left">
                            <h2 className="text-[#480D84] text-2xl font-bold mb-4">Event name</h2>
                            <p className="text-[#1C1A1A] text-sm leading-tight break-words">DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription</p>
                        </div>
                        <div className="relative w-[250px] h-[452px] z-10 shadow-[25px_0_40px_-10px_#6D10A580] rounded-[40px]">
                            <img src={image} alt="Event" className="w-full h-full object-cover rounded-[40px]" />
                        </div>
                    </div>
                    {/* Right Card */}
                    <div className="relative w-[250px] h-[452px]">
                        <div className="absolute top-0 left-[-50px] w-[250px] h-[452px] bg-white border border-[#5A10A5] rounded-[32px] p-8 pr-14 z-0 flex flex-col justify-center text-left">
                            <h2 className="text-[#480D84] text-2xl font-bold mb-4">Event name</h2>
                            <p className="text-[#1C1A1A] text-sm leading-tight break-words">DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription</p>
                        </div>
                        <div className="relative w-[250px] h-[452px] z-10">
                            <img src={image} alt="Event" className="w-full h-full object-cover rounded-[40px]" />
                        </div>
                    </div>
                </div>
                {/* Slider Dots */}
                <div className="mt-12 flex justify-center items-center gap-3">
                    <div className="w-[18px] h-[18px] bg-[#5A10A5] rounded-full shadow-sm"></div>
                    <div className="w-[18px] h-[18px] bg-[#CCB5E3] rounded-full opacity-60"></div>
                    <div className="w-[18px] h-[18px] bg-[#CCB5E3] rounded-full opacity-60"></div>
                </div>
                {/* Discover More Button */}
                <div className="mt-10 flex justify-center">
                    <button className="bg-[#5A10A5] text-white text-lg font-semibold px-16 py-2 rounded-full hover:bg-[#480D84] transition-colors shadow-lg min-w-[250px]">
                        Discover more
                    </button>
                </div>
            </div>
        </section>
    );
}