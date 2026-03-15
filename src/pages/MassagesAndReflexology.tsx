import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

// --- PLACEHOLDER DATA ---
// Please replace this data with the exact text from your Google Drive images!
const categories = [
  {
    id: 'massages',
    title: 'Massages',
    description: 'Melt away tension and restore your body\'s natural harmony.',
    services: [
      {
        id: 'm1',
        title: 'Signature Swedish Massage',
        duration: '60 / 90 Min',
        price: '₱1,200 / ₱1,600',
        description: 'A gentle, flowing massage designed to melt away stress, improve circulation, and promote deep relaxation.',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'm2',
        title: 'Deep Tissue Therapy',
        duration: '60 / 90 Min',
        price: '₱1,350 / ₱1,800',
        description: 'Intensive therapy targeting deeper muscle layers to release chronic tension and alleviate muscle pain.',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'm3',
        title: 'Hot Stone Ritual',
        duration: '90 Min',
        price: '₱1,900',
        description: 'Smooth, heated stones are placed on key points of the body to warm and loosen tight muscles.',
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'reflexology',
    title: 'Reflexology',
    description: 'Ancient healing techniques focusing on pressure points to stimulate overall wellness.',
    services: [
      {
        id: 'r1',
        title: 'Classic Foot Reflexology',
        duration: '45 / 60 Min',
        price: '₱850 / ₱1,100',
        description: 'Targeted pressure point therapy on the feet to stimulate energy flow and promote healing throughout the body.',
        image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'r2',
        title: 'Hand & Foot Harmony',
        duration: '60 Min',
        price: '₱1,200',
        description: 'A combined treatment addressing reflex points in both hands and feet for complete systemic balance.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'body-scrubs',
    title: 'Body Scrubs & Treatments',
    description: 'Exfoliate, hydrate, and renew your skin for a radiant, youthful glow.',
    services: [
      {
        id: 'b1',
        title: 'Himalayan Salt Glow',
        duration: '45 Min',
        price: '₱950',
        description: 'A detoxifying full-body scrub using mineral-rich Himalayan salt and nourishing essential oils.',
        image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'b2',
        title: 'Coffee & Coconut Polish',
        duration: '60 Min',
        price: '₱1,150',
        description: 'Invigorating coffee grounds and hydrating coconut oil work together to smooth skin and reduce cellulite appearance.',
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

export default function MassagesAndReflexology() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Get the currently hovered image
  const activeImage = categories
    .flatMap(c => c.services)
    .find(s => s.id === hoveredService)?.image || categories[0].services[0].image;

  return (
    <div className="min-h-screen bg-accent text-primary selection:bg-primary selection:text-accent pb-24 md:pb-40">
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000" 
            alt="Massages and Reflexology" 
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
              Massages & <br /> Reflexology
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
