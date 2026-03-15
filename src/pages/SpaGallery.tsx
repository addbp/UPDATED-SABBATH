import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Plus, X } from 'lucide-react';

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000", title: "Architecture" },
  { id: 2, src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000", title: "Infrastructure" },
  { id: 3, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000", title: "Residences" },
];

export default function SpaGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Add spring for buttery smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const updateRange = () => {
      if (containerRef.current) {
        setScrollRange(containerRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    updateRange();
    // Small delay to ensure images/fonts are loaded before calculating width
    setTimeout(updateRange, 100);
    window.addEventListener("resize", updateRange);
    return () => window.removeEventListener("resize", updateRange);
  }, []);

  const xTransform = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ id: number, src: string, title: string } | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div 
      className="bg-[#C3833A] text-[#F3E9E0] min-h-screen selection:bg-[#F3E9E0] selection:text-[#C3833A] md:cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-[#F3E9E0]/40 pointer-events-none z-[100] flex items-center justify-center hidden md:flex"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        <Plus className="w-5 h-5 text-[#F3E9E0] opacity-70" />
      </motion.div>

      <div ref={targetRef} className="h-[400vh] relative">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={containerRef} style={{ x: xTransform }} className="flex h-full items-center pl-[10vw] pr-[10vw] w-max will-change-transform">
            {galleryItems.map((item, index) => {
              // Parallax for each image
              const imageX = useTransform(smoothProgress, [0, 1], ["-15%", "15%"]);
              
              return (
                <div key={item.id} className="relative flex items-center w-[85vw] md:w-[70vw] flex-shrink-0 mr-[15vw] md:mr-[20vw] last:mr-0">
                  {/* Text */}
                  <h2 className="absolute left-[-5vw] md:left-[-12vw] top-1/2 -translate-y-1/2 font-serif text-[22vw] md:text-[14vw] leading-none z-10 text-[#F3E9E0] pointer-events-none drop-shadow-xl font-light tracking-tight">
                    {item.title}
                  </h2>
                  
                  {/* Image Container */}
                  <div 
                    className="w-[80vw] md:w-[60vw] h-[60vh] md:h-[75vh] ml-auto overflow-hidden rounded-sm relative shadow-2xl cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <motion.img 
                      src={item.src} 
                      alt={item.title} 
                      style={{ x: imageX, scale: 1.2 }}
                      className="absolute inset-0 w-full h-full object-cover will-change-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#C3833A]/10 pointer-events-none transition-colors duration-500 hover:bg-[#C3833A]/0"></div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#C3833A]/90 backdrop-blur-md p-4 md:p-10 cursor-auto"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-[#F3E9E0]/70 hover:text-[#F3E9E0] transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-full h-full max-h-[80vh] object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <p className="text-[#F3E9E0]/90 mt-6 font-serif text-2xl md:text-3xl tracking-[0.2em] uppercase font-light">
                {selectedImage.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
