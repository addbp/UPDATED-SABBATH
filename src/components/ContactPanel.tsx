import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Phone, Facebook, MessageCircle } from 'lucide-react';

interface ContactPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPanel({ isOpen, onClose }: ContactPanelProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[80]"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-[100dvh] w-full md:w-[500px] bg-accent z-[90] flex flex-col border-l border-primary/10 text-primary shadow-2xl"
          >
            {/* Header */}
            <div className="shrink-0 bg-accent p-8 md:p-10 pb-6 md:pb-8 flex justify-between items-center border-b border-primary/10 z-10">
              <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight">Contact Us</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-accent transition-colors duration-300 shrink-0 ml-4"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div 
              className="flex-1 overflow-y-auto overscroll-y-contain flex flex-col premium-scrollbar scroll-smooth"
              data-lenis-prevent="true"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* Content */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 flex flex-col gap-10 p-8 md:p-10 pt-6 md:pt-8"
              >
                
                {/* Address */}
                <motion.div variants={itemVariants} className="flex gap-4 items-start group">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-[#C58F3B] group-hover:text-white transition-colors duration-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-2 opacity-60">Visit Us</h3>
                    <p className="font-serif text-xl md:text-2xl leading-relaxed">
                      123 Wellness Avenue<br />
                      Serenity District<br />
                      Manila, Philippines 1000
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants} className="flex gap-4 items-start group">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-[#C58F3B] group-hover:text-white transition-colors duration-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-2 opacity-60">Call Us</h3>
                    <p className="font-serif text-xl md:text-2xl leading-relaxed">
                      +63 917 123 4567<br />
                      +63 2 8123 4567
                    </p>
                  </div>
                </motion.div>

                {/* Socials */}
                <motion.div variants={itemVariants} className="flex gap-4 items-start group">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-[#C58F3B] group-hover:text-white transition-colors duration-500">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-3 opacity-60">Connect</h3>
                    <div className="flex gap-4">
                      <a href="#" className="flex items-center gap-2 font-serif text-lg hover:text-[#C58F3B] transition-colors">
                        <Facebook className="w-5 h-5" /> Facebook
                      </a>
                      <span className="opacity-30">|</span>
                      <a href="#" className="flex items-center gap-2 font-serif text-lg hover:text-[#C58F3B] transition-colors">
                        <MessageCircle className="w-5 h-5" /> Messenger
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Map */}
                <motion.div variants={itemVariants} className="mt-4 rounded-2xl overflow-hidden h-[250px] relative shadow-inner bg-primary/5">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.334057165089!2d121.01974131534919!3d14.579998989815414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c99a2f2b4e8d%3A0x6b421876543210!2sMakati%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                    className="absolute inset-0 grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  ></iframe>
                </motion.div>

              </motion.div>

              {/* Footer CTA */}
              <div className="shrink-0 p-8 md:p-10 pt-8 border-t border-primary/10 flex justify-center bg-accent mt-auto">
                <button 
                  className="w-full relative px-8 py-4 bg-[#C58F3B] text-white rounded-full text-xs tracking-[0.2em] uppercase font-medium overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_20px_rgba(197,143,59,0.4)] hover:-translate-y-0.5 border border-white/20"
                >
                  <span className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12"></span>
                  <span className="relative z-10 transition-colors duration-500 drop-shadow-sm">Book an Appointment</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
