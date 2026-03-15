import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { title: 'Home', path: '/' },
  {
    title: 'About Us',
    subItems: [
      { title: 'Our Story', path: '/about/story' },
      { title: 'Spa Gallery', path: '/about/gallery' },
      { title: 'Policies', path: '/about/policies' },
    ],
  },
  {
    title: 'Our Offerings',
    subItems: [
      { title: 'Massages & Reflexology', path: '/offerings/massages' },
      { title: 'Le Nail Salon', path: '/offerings/nail-salon' },
      { title: 'Wellness Suites & Packages', path: '/offerings/wellness-suites' },
      { title: 'Memberships & Gatherings', path: '/offerings/memberships' },
    ],
  },
  {
    title: 'Sabasu',
    subItems: [
      { title: 'Ramyeon Noodle Bar', path: '/sabasu/ramyeon' },
      { title: 'Coffee, Tea & Refreshments', path: '/sabasu/coffee-tea' },
      { title: 'Hearty Meals', path: '/sabasu/hearty-meals' },
      { title: 'Light Bites & Snacks', path: '/sabasu/light-bites' },
    ],
  },
  { title: 'Contact', action: 'contact' },
];

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  // Handle scroll for global header background
  useEffect(() => {
    const handleScroll = () => {
      // Change background after scrolling past the hero section (approx 100vh)
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = (title: string) => {
    if (activeMenu === title) {
      setActiveMenu(null);
    } else {
      setActiveMenu(title);
    }
  };

  const isHomePage = location.pathname === '/';
  
  const headerStyle = isScrolled 
    ? 'bg-accent text-primary shadow-2xl py-2 md:py-3' 
    : isHomePage 
      ? 'bg-transparent text-primary py-3 md:py-5' 
      : 'bg-accent/95 backdrop-blur-md text-primary shadow-sm py-2 md:py-3';

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 pointer-events-none transition-all duration-700 ${headerStyle}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-8 text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium pointer-events-auto w-1/3">
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-4 hover:text-secondary transition-colors duration-300 group"
          >
            <div className="flex flex-col gap-1.5 w-8 relative">
              <span className="w-full h-[1px] bg-current transform origin-right transition-all group-hover:w-1/2 group-hover:bg-secondary duration-300"></span>
              <span className="w-full h-[1px] bg-current transform origin-left transition-all group-hover:w-3/4 group-hover:bg-secondary duration-300 delay-75"></span>
            </div>
            <span className="relative overflow-hidden h-4 flex items-center">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">MENU</span>
              <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-secondary">MENU</span>
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center pointer-events-auto cursor-pointer group w-1/3 text-center">
          <Link to="/" className="flex flex-col items-center gap-1">
            <img 
              src="https://wsrv.nl/?url=lh3.googleusercontent.com/d/1CVNDke8vs0djsf-0MTC_JfXyxPrajD1S&output=webp" 
              alt="Sabbath Spa & Wellness Hub Logo" 
              className="h-16 md:h-20 w-auto object-contain transition-opacity duration-1000 opacity-0 drop-shadow-sm group-hover:opacity-80"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://lh3.googleusercontent.com/d/1CVNDke8vs0djsf-0MTC_JfXyxPrajD1S";
              }}
            />
          </Link>
        </div>

        <div className="flex items-center justify-end pointer-events-auto w-1/3">
          <button 
            onClick={onContactClick}
            className="relative px-8 py-3.5 bg-[#A86A3D] text-white rounded-full text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_20px_rgba(168,106,61,0.4)] hover:-translate-y-0.5 border border-white/20"
          >
            <span className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12"></span>
            <span className="relative z-10 transition-colors duration-500 drop-shadow-sm">Book Now</span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-accent/80 backdrop-blur-sm z-[60]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 w-full md:w-[450px] bg-accent z-[70] overflow-y-auto border-r border-primary/20 text-primary premium-scrollbar"
              data-lenis-prevent="true"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="p-6 md:p-10 flex flex-col min-h-full">
                <div className="flex justify-between items-center mb-16">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://wsrv.nl/?url=lh3.googleusercontent.com/d/1_e8_TjmXhI0VSiBMifKnTRe41388JKYw&output=webp" 
                      alt="Sabbath Spa & Wellness Hub" 
                      className="h-10 md:h-12 w-auto object-contain drop-shadow-sm opacity-0 transition-opacity duration-700"
                      referrerPolicy="no-referrer"
                      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://lh3.googleusercontent.com/d/1_e8_TjmXhI0VSiBMifKnTRe41388JKYw";
                      }}
                    />
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-secondary hover:text-accent transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex-1 flex flex-col gap-8">
                  {menuItems.map((item, index) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                      className="flex flex-col gap-4"
                    >
                      {item.path ? (
                        <Link 
                          to={item.path} 
                          className="font-serif text-3xl md:text-4xl font-light hover:opacity-70 transition-opacity"
                        >
                          {item.title}
                        </Link>
                      ) : item.action === 'contact' ? (
                        <button 
                          onClick={() => {
                            setIsOpen(false);
                            onContactClick();
                          }}
                          className="font-serif text-3xl md:text-4xl font-light hover:opacity-70 transition-opacity text-left"
                        >
                          {item.title}
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleMenu(item.title)}
                          className="font-serif text-3xl md:text-4xl font-light text-left hover:opacity-70 transition-opacity flex items-center justify-between w-full"
                        >
                          <span>{item.title}</span>
                          <span className="text-sm opacity-50 font-sans">{activeMenu === item.title ? '−' : '+'}</span>
                        </button>
                      )}

                      <AnimatePresence>
                        {item.subItems && activeMenu === item.title && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pl-4 border-l border-primary/30 ml-2 py-2">
                              {item.subItems.map((subItem) => (
                                <Link 
                                  key={subItem.title}
                                  to={subItem.path}
                                  className="text-[13px] tracking-wide font-light opacity-70 hover:opacity-100 transition-opacity"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-16 pt-8 border-t border-primary/20 text-[10px] tracking-[0.2em] uppercase opacity-50">
                  © 2026 Sabbath Spa & Wellness Hub.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
