import { useState, useEffect, useMemo, memo, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router";
import { useIntro } from "../../context/IntroContext";

// ── استيراد الخلفيات والصور ──────────────────────────────────────────
import hero_bg from "../../assets/images/heroBg1.png";
import hero_bg_2 from "../../assets/images/heroBg2.png";
import hero_bg_3 from "../../assets/images/heroBg3.png";

import hero_image_1 from "../../assets/images/heroImage1.png";
import hero_image_2 from "../../assets/images/heroImage2.png";
import hero_image_3 from "../../assets/images/heroImage3.png";
import hero_image_4 from "../../assets/images/heroImage4.png";

// ─────────────────────────────────────────────────────
// 1. Types & interfaces
// ─────────────────────────────────────────────────────
interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

// ─────────────────────────────────────────────────────
// 2. Constants & Data
// ─────────────────────────────────────────────────────
const HERO_SLIDES: readonly Slide[] = [
  {
    id: "future-tech",
    title: "Shaping the Future of Technology with IEEE Beni Suef",
    subtitle: "IEEE Beni Suef Student Branch empowers students to explore technology, develop their skills, and connect with a community passionate about innovation and engineering.",
    image: hero_bg,
  },
  {
    id: "global-leadership",
    title: "Innovate, Build, and Lead the Global Community",
    subtitle: "Join a network of professional engineers. Participate in hackathons, publish research, and accelerate your career in the tech industry.",
    image: hero_bg_2,
  },
  {
    id: "world-solutions",
    title: "Transforming Ideas into Real World Solutions",
    subtitle: "We bridge the gap between academic theory and industry practice through hands-on workshops, hardware labs, and software engineering bootcamps.",
    image: hero_bg_3,
  },
];

const HERO_IMAGES = [hero_image_1, hero_image_2, hero_image_3, hero_image_4];

// ترتيب الصور كما هو
const IMAGE_PAIRS: readonly [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
];

const ACCENTS: Readonly<Record<string, string>> = {
  Innovation: "text-[var(--color-primary-normal)]",
  Technology: "text-[var(--color-primary-normal)]",
  Community: "text-[var(--color-primary-normal)]",
  Future: "text-[var(--color-primary-normal)]",
  Solutions: "text-[var(--color-primary-normal)]",
  IEEE: "text-[var(--color-primary-normal)]",
  BNS: "text-[var(--color-primary-normal)]",
};

const SLIDE_DURATION_MS = 3000; // faster loop, 3 seconds
const ALPHA_REGEX = /[^a-zA-Z]/g;

// ─────────────────────────────────────────────────────
// 3. Animation Variants
// ─────────────────────────────────────────────────────

// حركة الخلفية
const backgroundVariants: Variants = {
  enter: { opacity: 0 },
  center: { 
    opacity: 1, 
    transition: { duration: 1.2, ease: "easeInOut" } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.8, ease: "easeInOut" } 
  }
};

// حركة العنوان (يأتي من اليسار)
const titleVariants: Variants = {
  enter: { opacity: 0, x: -100, transition: { duration: 0.8, ease: "easeOut" } },
  center: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.0, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    x: -100, 
    transition: { duration: 0.8, ease: "easeIn" } 
  }
};

// حركة النص الفرعي (يأتي من اليسار بتأخير بسيط)
const subtitleVariants: Variants = {
  enter: { opacity: 0, x: -100, transition: { duration: 0.6 } },
  center: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1.4, ease: "easeInOut", delay: 0.3 } 
  },
  exit: { 
    opacity: 0, 
    x: -100,
    transition: { duration: 1.0, ease: "easeInOut" } 
  }
};


// حركة المجموعة بأكملها (تأتي من اليمين وتذهب لليسار)
const imageGroupVariants: Variants = {
  enter: { opacity: 0, x: 100 },
  center: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    x: -100, 
    transition: { duration: 0.6, ease: "easeIn" } 
  }
};

// تأثير الوميض/النبضة السوداء الفردية داخل كل صورة
const flashVariants: Variants = {
  enter: { opacity: 1 },
  center: { 
    opacity: 0, 
    transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } 
  },
  exit: { opacity: 0 }
};


// ─────────────────────────────────────────────────────
// 4. Sub-Components
// ─────────────────────────────────────────────────────

const HighlightedTitle = memo(({ title }: { title: string }) => {
  return (
    <>
      {title.split(" ").map((word, i) => {
        const clean = word.replace(ALPHA_REGEX, "");
        const hasAccent = clean in ACCENTS;
        return (
          <span key={`word-${i}`} className={hasAccent ? ACCENTS[clean] : ""}>
            {word}{" "}
          </span>
        );
      })}
    </>
  );
});

HighlightedTitle.displayName = "HighlightedTitle";

// ─────────────────────────────────────────────────────
// 5. Main Component
// ─────────────────────────────────────────────────────

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = useMemo(() => HERO_SLIDES[slideIndex], [slideIndex]);
  const [bigImageIdx, smallImageIdx] = useMemo(() => IMAGE_PAIRS[slideIndex], [slideIndex]);
  
  const { introReady } = useIntro();

  // ─── Auto-rotate Timer (Stops at the last slide) ───────────
  useEffect(() => {
    if (isPaused || !introReady) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSlideIndex((prev) => {
        if (prev >= HERO_SLIDES.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev; // stay on last slide
        }
        return prev + 1;
      });
    }, SLIDE_DURATION_MS);


    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, introReady]);

  // ─── Manual Slide Change ───────────────────────────────────
  const handleSlideChange = useCallback((index: number) => {
    setSlideIndex(index);
    // لا نوقف المؤقت لتستمر الدورة تلقائياً بعد التبديل اليدوي

  }, []);

  // ─── Render ────────────────────────────────────────────────────
  return (
    <motion.section
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-roledescription="carousel"
    >
      {/* ═══════════════════════════════════════════════════════════
          LAYER 1: BACKGROUND IMAGE
          ═══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={`bg-${currentSlide.id}`}
            src={currentSlide.image}
            alt=""
            aria-hidden="true"
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2: SLIDE INDICATORS
          ═══════════════════════════════════════════════════════════ */}
      {introReady && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40"
          role="tablist"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={`indicator-${slide.id}`}
              role="tab"
              onClick={() => handleSlideChange(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slideIndex
                  ? "w-8 h-2 bg-blue-400"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === slideIndex}
            />
          ))}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3: MAIN CONTENT
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {introReady && (
          <motion.div 
            className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-6 lg:px-8 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
        
            {/* ─── LEFT SECTION: TEXT ─── */}
            <div className="flex-1 flex flex-col justify-center h-full">
              <div className="relative space-y-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`text-group-${currentSlide.id}`}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* Title Animation */}
                    <motion.h1
                      variants={titleVariants}
                      className="text-5xl md:text-4xl lg:text-7xl font-bold leading-tight text-white max-w-4xl block"
                    >
                      <HighlightedTitle title={currentSlide.title} />
                    </motion.h1>

                    {/* Subtitle Animation */}
                    <motion.p
                      variants={subtitleVariants}
                      className="text-gray-200 text-base lg:text-lg leading-relaxed max-w-lg block mt-6"
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <Link
                  to="/events"
                  className="bg-white hover:bg-[var(--color-primary-normal)] text-black font-semibold px-8 py-3 rounded-lg transition-all hover:text-white duration-300 hover:shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 active:translate-y-0"
                >
                  Explore Events
                </Link>
              </motion.div>
            </div>

            {/* ─── RIGHT SECTION: IMAGES ─── */}
            <div className="flex-1 relative h-full hidden lg:flex items-center justify-center  ">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`images-container-${slideIndex}`}
                  variants={imageGroupVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative w-[450px] h-[480px] xl:w-[500px] xl:h-[530px]"
                >
                  {/* Big Image */}
                  <div className="absolute top-2/5 left-0 w-2/3 h-2/3 rounded-[2.5rem] overflow-hidden shadow-2xl border-[3px] border-amber-400/80 z-10">
                    <img
                      src={HERO_IMAGES[bigImageIdx]}
                      alt="Hero showcase"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                    <motion.div
                      variants={flashVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 bg-black z-20 pointer-events-none"
                    />
                  </div>

                  {/* Small Image */}
                  <div className="absolute top-2/3 left-4/6 w-[55%] h-[45%] rounded-[2.5rem] overflow-hidden shadow-2xl border-[4px] border-white/10 z-20">
                    <img
                      src={HERO_IMAGES[smallImageIdx]}
                      alt="Hero detail"
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      variants={flashVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 bg-black z-20 pointer-events-none"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}