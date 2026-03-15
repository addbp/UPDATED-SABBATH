import React, { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Header from './Header';
import ContactPanel from './ContactPanel';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const { pathname } = useLocation();
  const [activeFooterMenu, setActiveFooterMenu] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  const toggleFooterMenu = (menu: string) => {
    setActiveFooterMenu(activeFooterMenu === menu ? null : menu);
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [pathname]);

  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }

    return () => {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    };
  }, [isContactOpen]);

  return (
    <>
      <Header onContactClick={() => setIsContactOpen(true)} />
      <ContactPanel isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Outlet />
      
      {/* SECTION 5: FOOTER */}
      <footer className="bg-accent text-primary pt-16 md:pt-24 pb-6 px-6 md:px-12 relative z-10 border-t border-primary/20">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20 mb-16 md:mb-24">
            <div className="w-full lg:w-1/2 flex flex-col justify-start">
              <h3 className="font-serif text-[40px] md:text-[64px] lg:text-[80px] leading-[0.9] tracking-[-0.02em] font-light drop-shadow-2xl">
                <span>Embrace the</span><br />
                <span className="italic">Gift of</span> Rest
              </h3>
            </div>
            
            <div className="w-full lg:w-1/2 flex flex-col gap-2 pt-4">
              {/* Explore Menu */}
              <div className="border-b border-primary/30">
                <button 
                  onClick={() => toggleFooterMenu('Explore')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="font-serif text-xl md:text-2xl font-light group-hover:opacity-70 transition-opacity">Explore</span>
                  <span className="text-xl font-light opacity-50 transition-transform duration-300" style={{ transform: activeFooterMenu === 'Explore' ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <AnimatePresence>
                  {activeFooterMenu === 'Explore' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 pt-2 pl-4 text-[10px] tracking-[0.2em] uppercase font-medium">
                        <Link to="/" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Home</Link>
                        <Link to="/about/story" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Our Story</Link>
                        <Link to="/about/gallery" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Spa Gallery</Link>
                        <Link to="/about/policies" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Policies</Link>
                        <button onClick={() => setIsContactOpen(true)} className="text-left opacity-50 hover:opacity-100 transition-opacity duration-300 uppercase">Contact</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Our Offerings Menu */}
              <div className="border-b border-primary/30">
                <button 
                  onClick={() => toggleFooterMenu('Our Offerings')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="font-serif text-xl md:text-2xl font-light group-hover:opacity-70 transition-opacity">Our Offerings</span>
                  <span className="text-xl font-light opacity-50 transition-transform duration-300" style={{ transform: activeFooterMenu === 'Our Offerings' ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <AnimatePresence>
                  {activeFooterMenu === 'Our Offerings' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 pt-2 pl-4 text-[10px] tracking-[0.2em] uppercase font-medium">
                        <Link to="/offerings/massages" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Massages & Reflexology</Link>
                        <Link to="/offerings/nail-salon" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Le Nail Salon</Link>
                        <Link to="/offerings/wellness-suites" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Wellness Suites & Packages</Link>
                        <Link to="/offerings/memberships" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Memberships & Gatherings</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sabasu Menu */}
              <div className="border-b border-primary/30">
                <button 
                  onClick={() => toggleFooterMenu('Sabasu')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="font-serif text-xl md:text-2xl font-light group-hover:opacity-70 transition-opacity">Sabasu</span>
                  <span className="text-xl font-light opacity-50 transition-transform duration-300" style={{ transform: activeFooterMenu === 'Sabasu' ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <AnimatePresence>
                  {activeFooterMenu === 'Sabasu' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-8 pt-2 pl-4 text-[10px] tracking-[0.2em] uppercase font-medium">
                        <Link to="/sabasu/ramyeon" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Ramyeon Noodle Bar</Link>
                        <Link to="/sabasu/coffee-tea" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Coffee, Tea & Refreshments</Link>
                        <Link to="/sabasu/hearty-meals" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Hearty Meals</Link>
                        <Link to="/sabasu/light-bites" className="opacity-50 hover:opacity-100 transition-opacity duration-300">Light Bites & Snacks</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 pt-8">
            <h1 className="font-serif text-[15vw] md:text-[11vw] leading-[0.75] tracking-[-0.02em] font-light opacity-90 uppercase">Sabbath</h1>
            <div className="flex flex-col items-end gap-8 pb-2 md:pb-4">
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase font-medium hover:opacity-100 opacity-60 transition-opacity"
              >
                <span className="hidden md:block">Back to Top</span>
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-accent transition-all duration-700 ease-out">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-y-1 transition-transform duration-500">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </div>
              </button>
              <div className="text-[9px] md:text-[10px] tracking-[0.1em] uppercase opacity-40 text-right">
                © 2026 Sabbath Spa & Wellness Hub.<br className="md:hidden" /> All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
