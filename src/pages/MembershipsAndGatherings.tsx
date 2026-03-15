import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Clock, Sparkles } from 'lucide-react';

// --- PLACEHOLDER DATA ---
// Please replace this data with the exact text from your Google Drive images!
const categories = [
  {
    id: 'memberships',
    title: 'Memberships',
    description: 'Join our exclusive community and enjoy regular wellness benefits.',
    services: [
      {
        id: 'm1',
        title: 'Silver Membership',
        duration: 'Monthly',
        price: '₱5,000',
        description: 'Includes one 60-minute signature massage per month, plus 10% off all additional treatments and retail products.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'm2',
        title: 'Gold Membership',
        duration: 'Monthly',
        price: '₱8,500',
        description: 'Includes two 60-minute treatments of your choice per month, complimentary access to wellness suites, and 15% off retail.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'm3',
        title: 'Platinum Membership',
        duration: 'Monthly',
        price: '₱15,000',
        description: 'Unlimited access to wellness suites, four 60-minute treatments per month, priority booking, and 20% off all retail.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'gatherings',
    title: 'Gatherings & Events',
    description: 'Celebrate special moments with curated spa experiences for groups.',
    services: [
      {
        id: 'g1',
        title: 'Bridal Spa Party',
        duration: 'Half Day',
        price: 'From ₱25,000',
        description: 'A luxurious pre-wedding retreat for the bride and bridal party, including massages, facials, and champagne.',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'g2',
        title: 'Corporate Wellness Retreat',
        duration: 'Full Day',
        price: 'Custom Pricing',
        description: 'Reward your team with a day of relaxation, team-building wellness workshops, and rejuvenating treatments.',
        image: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff50?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

export default function MembershipsAndGatherings() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const activeImage = categories
    .flatMap(c => c.services)
    .find(s => s.id === hoveredService)?.image || categories[0].services[0].image;

  return (
    <div className="min-h-screen bg-accent text-primary selection:bg-primary selection:text-accent pb-24 md:pb-40">
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=2000" 
            alt="Memberships & Gatherings" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-accent/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent via-transparent to-transparent" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs md:text-sm tracking-[0.3em] uppercase mb-6 block font-medium">Our Offerings</span>
            <h1 className="font-serif text-[40px] md:text-[70px] lg:text-[90px] leading-[0.9] tracking-[-0.02em] font-light text-primary">
              Memberships <br /> & Gatherings
            </h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative z-20 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 -mt-10 md:-mt-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT: CATEGORY NAVIGATION (Sticky) */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-32 flex flex-row lg:flex-col gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const el = document.getElementById(cat.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`text-left whitespace-nowrap lg:whitespace-normal transition-all duration-500 ${
                    activeCategory === cat.id ? 'opacity-100 pl-4 border-l border-primary' : 'opacity-40 hover:opacity-70 border-l border-transparent pl-4'
                  }`}
                >
                  <h3 className="font-serif text-xl md:text-2xl">{cat.title}</h3>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: SERVICES LIST & IMAGE REVEAL */}
          <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Services List */}
            <div className="w-full lg:w-3/5 flex flex-col gap-24">
              {categories.map((category) => (
                <div key={category.id} id={category.id} className="scroll-mt-32">
                  <div className="mb-12">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4">{category.title}</h2>
                    <p className="text-primary/70 text-sm md:text-base max-w-md">{category.description}</p>
                  </div>
                  
                  <div className="flex flex-col gap-8 md:gap-12">
                    {category.services.map((service) => (
                      <motion.div 
                        key={service.id}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, margin: "-10%" }}
                        onMouseEnter={() => setHoveredService(service.id)}
                        onMouseLeave={() => setHoveredService(null)}
                        className="group relative flex flex-col gap-3 cursor-pointer"
                      >
                        {/* Interactive Line */}
                        <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-primary scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100 hidden md:block" />
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-8">
                          <h3 className="font-serif text-2xl md:text-3xl transition-transform duration-500 md:group-hover:translate-x-2">
                            {service.title}
                          </h3>
                          <div className="flex items-center gap-4 text-xs tracking-widest uppercase font-medium opacity-70 shrink-0">
                            <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
                            <span className="flex items-center gap-1"><Sparkles size={14} /> {service.price}</span>
                          </div>
                        </div>
                        
                        <p className="text-primary/70 text-sm md:text-base leading-relaxed max-w-xl transition-transform duration-500 md:group-hover:translate-x-2">
                          {service.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Image Reveal (Desktop Only) */}
            <div className="hidden lg:block w-2/5 relative">
              <div className="sticky top-32 w-full aspect-[3/4] rounded-2xl overflow-hidden bg-primary/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Service preview"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
