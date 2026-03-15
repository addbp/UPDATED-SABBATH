import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useScroll, MotionValue } from 'motion/react';
import { Heart, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';

// --- HELPER COMPONENTS FOR INTERACTIVITY ---

const MagneticElement = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={reset} 
      style={{ x: smoothX, y: smoothY }} 
      className={`inline-block ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};

const ParallaxImage = ({ src, alt, className, speed = 0.15 }: { src: string, alt: string, className: string, speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Added spring for buttery smooth parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });
  const y = useTransform(smoothProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  
  return (
    <div ref={ref} className={`relative overflow-hidden group ${className}`}>
      <motion.img 
        style={{ y, scale: 1.2 }} 
        src={src} 
        alt={alt} 
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-1000 ease-out mix-blend-multiply" />
    </div>
  );
};

const HorizontalParallaxImage = ({ src, progress }: { src: string, progress: MotionValue<number> }) => {
  // progress here is already smoothed by the parent's useSpring
  const x = useTransform(progress, [0, 1], ["-15%", "15%"]);
  return (
    <div className="w-full h-full relative overflow-hidden group">
      <motion.img 
        style={{ x, scale: 1.2 }} 
        src={src} 
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
        alt="" 
      />
      <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-1000 ease-out mix-blend-multiply" />
    </div>
  );
};

// --- HERO MARQUEE DATA ---
const col1Images = [
  "https://drive.google.com/thumbnail?id=1565AvhIxxofxDtnK246rTQOmU42UdXbt&sz=w1200",
  "https://drive.google.com/thumbnail?id=1EvrLWFj_lm44c58o0-ffySmA4XsgrIMa&sz=w1200",
  "https://drive.google.com/thumbnail?id=1GDyW6PYkm3GMS2mW6IhFROgm7GBIJlBQ&sz=w1200"
];
const col2Images = [
  "https://drive.google.com/thumbnail?id=1KCH_e_l_pq02uF9as6_-877JjCZr3CMa&sz=w1200",
  "https://drive.google.com/thumbnail?id=1_aJHeHy9G5ugravkziKdowXPHbK1sBNm&sz=w1200",
  "https://drive.google.com/thumbnail?id=1kSkvuTXluXTW3K2Cjc14RcHh9i0O1C0w&sz=w1200"
];
const col3Images = [
  "https://drive.google.com/thumbnail?id=1dpSc52TvF28GDqvJYBorWDucZXhFLdqk&sz=w1200",
  "https://drive.google.com/thumbnail?id=1DTG_Ub-YPbjuxcBZNRATmIqiBa8m5X3e&sz=w1200",
  "https://drive.google.com/thumbnail?id=1PSkF8ffdrZDrBndEikbGQNtdDwZWWCmV&sz=w1200"
];
const col4Images = [
  "https://drive.google.com/thumbnail?id=1m42Z_Wx2RLcUPhkfch_hAz_NpleYpPlS&sz=w1200",
  "https://drive.google.com/thumbnail?id=1565AvhIxxofxDtnK246rTQOmU42UdXbt&sz=w1200",
  "https://drive.google.com/thumbnail?id=1EvrLWFj_lm44c58o0-ffySmA4XsgrIMa&sz=w1200"
];

const horizontalPanels = [
  {
    title: "Signature Sabbath Spa and other Massages",
    desc: "Landscaped terraces with topiary trees, framed with glass, create the atmosphere of a miniature park floating above the City.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600",
    link: "/offerings/massages"
  },
  {
    title: "Le Nail Salon",
    desc: "Shady leafy-coniferous garden that evokes winding paths, branchy trees, and sunlit glades of forests surrounding the City.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1600",
    link: "/offerings/nail-salon"
  },
  {
    title: "Private Wellness Suite",
    desc: "Artfully designed recreation areas that delight you with diverse botanical decor: cascading garlands of runners, asymmetrical lawns, and exotic flowers.",
    img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1600",
    link: "/offerings/wellness-suites"
  },
  {
    title: "Sabasu",
    desc: "A culinary journey that complements your wellness experience. Savor our Ramyeon Noodle Bar, hearty meals, and refreshing beverages.",
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1600",
    link: "/sabasu/ramyeon"
  },
  {
    title: "See more of Sabbath Offers",
    desc: "Discover our exclusive memberships, gathering packages, and more ways to embrace the gift of rest.",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1600",
    link: "/offerings/memberships"
  }
];

const MarqueeColumn = ({ images, duration, reverse, yOffset }: { images: string[], duration: number, reverse?: boolean, yOffset: MotionValue<string> }) => {
  return (
    <motion.div className="flex flex-col w-1/4 overflow-visible" style={{ y: yOffset }}>
      <motion.div
        className="flex flex-col"
        animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
      >
        <div className="flex flex-col gap-4 md:gap-6 pb-4 md:pb-6 shrink-0">
          {images.map((src, i) => (
            <div key={`set1-${i}`} className="w-full h-[45vh] md:h-[65vh] relative overflow-hidden bg-primary/10 shrink-0">
              <img src={src} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity" style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'translate3d(0,0,0)' }} alt="" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-6 pb-4 md:pb-6 shrink-0">
          {images.map((src, i) => (
            <div key={`set2-${i}`} className="w-full h-[45vh] md:h-[65vh] relative overflow-hidden bg-primary/10 shrink-0">
              <img src={src} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity" style={{ WebkitBackfaceVisibility: 'hidden', WebkitTransform: 'translate3d(0,0,0)' }} alt="" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const springConfig = { damping: 40, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const gridMouseX = useTransform(smoothX, [-1, 1], ['-2%', '2%']);
  const gridMouseY = useTransform(smoothY, [-1, 1], ['-2%', '2%']);

  // --- GLOBAL SCROLL SPRING CONFIG ---
  // This adds physical inertia to all scroll-linked animations
  const scrollSpringConfig = { stiffness: 60, damping: 20, restDelta: 0.001 };

  // --- HERO ZOOM ANIMATION ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawHeroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroProgress = useSpring(rawHeroProgress, scrollSpringConfig);

  const gridScale = useTransform(heroProgress, [0, 1], [1, 6]);
  const gridOpacity = useTransform(heroProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const textOpacity = useTransform(heroProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(heroProgress, [0, 0.2], [0, -50]);

  const col1Y = useTransform(heroProgress, [0, 1], ['-10%', '-30%']);
  const col2Y = useTransform(heroProgress, [0, 1], ['5%', '25%']);
  const col3Y = useTransform(heroProgress, [0, 1], ['-5%', '-25%']);
  const col4Y = useTransform(heroProgress, [0, 1], ['10%', '30%']);

  // --- SECTION 2 ZOOM ANIMATION ---
  const s2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawS2Progress } = useScroll({ target: s2Ref, offset: ["start start", "end start"] });
  const s2Progress = useSpring(rawS2Progress, scrollSpringConfig);
  const s2Scale = useTransform(s2Progress, [0, 0.4, 1], [1, 1, 25]);
  const s2Opacity = useTransform(s2Progress, [0, 0.7, 0.95], [1, 1, 0]);

  // --- SECTION 3 ZOOM ANIMATION ---
  const s3Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawS3Progress } = useScroll({ target: s3Ref, offset: ["start start", "end start"] });
  const s3Progress = useSpring(rawS3Progress, scrollSpringConfig);
  const s3Scale = useTransform(s3Progress, [0, 0.4, 1], [1, 1, 25]);
  const s3Opacity = useTransform(s3Progress, [0, 0.7, 0.95], [1, 1, 0]);

  // --- SECTION 4 HORIZONTAL + ZOOM ANIMATION ---
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawHorizontalProgress } = useScroll({ target: horizontalRef, offset: ["start start", "end start"] });
  const horizontalProgress = useSpring(rawHorizontalProgress, scrollSpringConfig);
  
  // Scroll horizontally for the first 75% of the section
  const xTransform = useTransform(horizontalProgress, [0, 0.75], ["0%", "-80%"]);
  // Zoom in during the last 25%
  const s4Scale = useTransform(horizontalProgress, [0.75, 1], [1, 4]);
  const s4Opacity = useTransform(horizontalProgress, [0.75, 0.85, 0.95], [1, 1, 0]);

  const scrollToPanel = (direction: 'next' | 'prev') => {
    if (!horizontalRef.current) return;
    const rect = horizontalRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height;
    
    const horizontalScrollHeight = sectionHeight * 0.75;
    const panelHeight = horizontalScrollHeight / 4; // 4 transitions for 5 panels
    
    const currentScroll = window.scrollY - sectionTop;
    
    let currentIndex = Math.round(currentScroll / panelHeight);
    
    if (direction === 'next') {
      currentIndex = Math.min(4, currentIndex + 1);
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    
    const targetScroll = currentIndex * panelHeight;
    
    window.scrollTo({
      top: sectionTop + targetScroll,
      behavior: 'smooth'
    });
  };

  // --- REUSABLE TEXT ANIMATION CONFIG ---
  const textRevealVariants = {
    initial: { y: "110%", rotate: 2, opacity: 0 },
    whileInView: { y: 0, rotate: 0, opacity: 1 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="relative w-full bg-accent text-primary font-sans selection:bg-primary selection:text-accent">
      
      {/* SECTION 1: HERO ZOOM */}
      <section ref={heroRef} className="relative w-full h-[200vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-accent flex items-center justify-center">
          
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] flex gap-4 md:gap-6 p-4 pointer-events-none origin-center"
            style={{ 
              x: '-50%', 
              y: '-50%',
              rotate: -15, 
              scale: gridScale,
              opacity: gridOpacity,
              translateX: gridMouseX,
              translateY: gridMouseY,
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <MarqueeColumn images={col1Images} duration={40} yOffset={col1Y} />
            <MarqueeColumn images={col2Images} duration={50} reverse yOffset={col2Y} />
            <MarqueeColumn images={col3Images} duration={45} yOffset={col3Y} />
            <MarqueeColumn images={col4Images} duration={55} reverse yOffset={col4Y} />
          </motion.div>

          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#2A2118]/70 via-[#2A2118]/40 to-[#1A140F]/95 pointer-events-none"></div>

          <motion.div 
            className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-10 pointer-events-none"
            style={{ opacity: textOpacity, y: textY }}
          >
            <div className="h-24"></div>
            
            <main className="flex-1 relative">
              <div className="absolute bottom-[8%] right-0 md:right-[5%] text-right">
                <h2 
                  className="font-serif text-[70px] md:text-[100px] lg:text-[130px] leading-[0.85] tracking-[-0.02em] font-light text-[#FAF9F6]"
                >
                  <span className="opacity-95">Embrace the</span><br />
                  <span className="italic">Gift of</span> Rest
                </h2>
              </div>
            </main>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: PREMIUM LIVING ZOOM */}
      <section ref={s2Ref} className="relative w-full h-[250vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-accent flex items-center justify-center">
          <motion.div 
            className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 px-6 md:px-20 origin-[10%_50%] md:origin-[5%_50%] max-w-[1800px] mx-auto will-change-transform"
            style={{ scale: s2Scale, opacity: s2Opacity }}
          >
            <div className="w-full md:w-1/2 max-w-2xl flex flex-col justify-center mt-16 md:mt-0">
              <div className="mb-6 md:mb-8">
                <div className="overflow-hidden pt-2 pb-1">
                  <motion.h2 
                    {...textRevealVariants}
                    className="font-serif text-2xl md:text-4xl lg:text-[44px] leading-[1.1] font-light"
                  >Welcome to the</motion.h2>
                </div>
                <div className="overflow-hidden pt-1 pb-2 -mt-1">
                  <motion.h2 
                    {...textRevealVariants} transition={{ ...textRevealVariants.transition, delay: 0.1 }}
                    className="font-serif text-2xl md:text-4xl lg:text-[44px] leading-[1.1] font-light"
                  ><span className="italic pr-1">Sanctuary</span> of Grace.</motion.h2>
                </div>
                
                <div className="overflow-hidden pt-4 md:pt-5 pb-1">
                  <motion.h3 
                    {...textRevealVariants} transition={{ ...textRevealVariants.transition, delay: 0.2 }}
                    className="font-serif text-lg md:text-xl lg:text-[22px] leading-[1.3] font-light opacity-90"
                  >Honor your body, still your mind,</motion.h3>
                </div>
                <div className="overflow-hidden pt-1 pb-2 -mt-1">
                  <motion.h3 
                    {...textRevealVariants} transition={{ ...textRevealVariants.transition, delay: 0.3 }}
                    className="font-serif text-lg md:text-xl lg:text-[22px] leading-[1.3] font-light opacity-90"
                  >and enter the presence of Rest.</motion.h3>
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "0px" }} transition={{ delay: 0.4, duration: 1 }}>
                <MagneticElement className="mt-8 md:mt-12">
                  <button className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[1px] border-primary/40 flex items-center justify-center text-[11px] tracking-[0.25em] uppercase hover:border-primary hover:bg-primary hover:text-accent transition-all duration-700 relative overflow-hidden group">
                    <span className="absolute inset-0 bg-primary scale-0 rounded-full group-hover:scale-100 transition-transform duration-700 ease-out"></span>
                    <span className="relative z-10">Explore</span>
                  </button>
                </MagneticElement>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full md:w-1/2 h-[50vh] md:h-[85vh] mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" 
                alt="Spa interior" 
                className="w-full h-full rounded-sm"
                speed={0.15}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: OPEN THE DOORS ZOOM */}
      <section ref={s3Ref} className="relative w-full h-[250vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-accent flex items-center justify-center">
          <motion.div 
            className="w-full h-full flex flex-col md:flex-row items-center justify-between gap-16 px-6 md:px-20 origin-[80%_50%] md:origin-[90%_50%] max-w-[1800px] mx-auto will-change-transform"
            style={{ scale: s3Scale, opacity: s3Opacity }}
          >
            <div className="w-full md:w-1/2 max-w-2xl flex flex-col justify-center h-full">
              <div className="mb-12 md:mb-16">
                <div className="overflow-hidden pt-2 pb-1">
                  <motion.h2 {...textRevealVariants} className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-light">Open the doors</motion.h2>
                </div>
                <div className="overflow-hidden pt-1 pb-1 -mt-1">
                  <motion.h2 {...textRevealVariants} transition={{ ...textRevealVariants.transition, delay: 0.1 }} className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-light">of Sabbath and step</motion.h2>
                </div>
                <div className="overflow-hidden pt-1 pb-2 -mt-1">
                  <motion.h2 {...textRevealVariants} transition={{ ...textRevealVariants.transition, delay: 0.2 }} className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-[1.1] font-light">into your true self.</motion.h2>
                </div>
              </div>
              
              <div className="flex gap-8 items-end">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 1, delay: 0.4 }}
                  className="text-[12px] md:text-[13px] tracking-[0.1em] font-medium opacity-70 leading-[1.8] max-w-sm"
                >
                  Swedish Massage • Sabbath Signature Massage • Sabbath Signature Foot, Head, Neck & Shoulder • Le Nail Salon • Private Wellness Suite
                </motion.p>
              </div>
            </div>
            <motion.div 
              className="w-full md:w-[40%] aspect-[3/5] max-h-[50vh] md:max-h-none"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ParallaxImage 
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200" 
                alt="Building tower" 
                className="w-full h-full rounded-sm"
                speed={0.1}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: HORIZONTAL SCROLL GALLERY ZOOM */}
      <section ref={horizontalRef} className="relative w-full h-[600vh] bg-accent">
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          <motion.div 
            className="w-full h-full origin-center will-change-transform"
            style={{ scale: s4Scale, opacity: s4Opacity }}
          >
            <motion.div 
              className="flex h-full w-[500vw] will-change-transform"
              style={{ x: xTransform }}
            >
              {horizontalPanels.map((panel, index) => (
                <div key={index} className="w-screen h-full flex items-center justify-center p-6 md:p-20">
                  <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-3/5 aspect-video">
                      <HorizontalParallaxImage src={panel.img} progress={horizontalProgress} />
                    </div>
                    <div className="w-full md:w-2/5 flex flex-col justify-center gap-8">
                      <Link to={panel.link} className="group inline-block">
                        <h3 className="font-serif text-[28px] md:text-[40px] lg:text-[48px] font-light leading-[1.1] tracking-[-0.02em] group-hover:text-secondary transition-colors duration-300 text-balance">
                          {panel.title}
                        </h3>
                      </Link>
                      <div className="flex gap-4">
                        <MagneticElement>
                          <button 
                            onClick={() => scrollToPanel('prev')}
                            className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center hover:bg-secondary hover:text-accent transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
                            disabled={index === 0}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                        </MagneticElement>
                        <MagneticElement>
                          <button 
                            onClick={() => scrollToPanel('next')}
                            className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center hover:bg-secondary hover:text-accent transition-colors duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
                            disabled={index === horizontalPanels.length - 1}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </MagneticElement>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
