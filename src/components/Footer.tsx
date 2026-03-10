import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, FileText } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 75%',
      }
    });

    // Animate Massive Text
    tl.fromTo('.footer-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
    )
    // Animate Action Buttons
    .fromTo('.footer-action',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.5'
    )
    // Animate Bottom Grid Columns
    .fromTo('.footer-col',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
      '-=0.4'
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-[#c1bdae] text-[#141414] pt-6 pb-8 md:pb-12 px-6 md:px-12 w-full flex flex-col min-h-screen justify-between">
      {/* Massive Text & Action Buttons */}
      <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-12 mt-[10vh] md:mt-[12vh]">
        <div className="overflow-hidden w-full">
          <h1 className="footer-title text-[clamp(2.5rem,9vw,10rem)] leading-[0.85] font-medium tracking-tight uppercase text-center w-full">
            FIRST GENERATION
          </h1>
        </div>
        <div className="overflow-hidden w-full">
          <h2 className="footer-title text-[clamp(1rem,3vw,3rem)] leading-none font-medium tracking-[0.3em] uppercase text-center mt-2 md:mt-4 mb-8 md:mb-10">
            HOMES LLC
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="footer-action flex items-center justify-center gap-2 bg-[#141414] text-[#c1bdae] px-6 py-3 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase w-full sm:w-auto hover:bg-black transition-colors"
          >
            <FileText size={16} />
            Tell us your Idea
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="footer-action flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase w-full sm:w-auto hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
          >
            <MessageCircle size={16} />
            Chat with us directly on WhatsApp
          </motion.button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 w-full max-w-[1800px] mx-auto mt-auto pt-8 border-t border-black/10">
        {/* Column 1: Links */}
        <div className="footer-col flex flex-col gap-2">
          <div className="flex items-start gap-4 mb-2">
            <span className="font-light text-xl leading-none">+</span>
            <div className="flex flex-col gap-2">
              {['Agency', 'Achievements', 'Immersion', 'Contact'].map((item, index) => (
                <a key={index} href={`#${item.toLowerCase()}`} className="text-lg md:text-xl font-medium hover:opacity-70 transition-opacity">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Contact & Networks */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-sm md:text-base mb-3">Contact</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <p>630-326-5117</p>
              <p>MATTHEW.KALESANWO@FGIPGROUP.NET</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm md:text-base mb-3">Networks</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <a href="#" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <span>+</span> INSTAGRAM
              </a>
              <a href="#" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                <span>+</span> LINKEDIN
              </a>
            </div>
          </div>
        </div>

        {/* Column 3: Locations 1 */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-sm md:text-base mb-3">Chicago - HQ</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <p>444 W LAKE STREET</p>
              <p>SUITE 1700</p>
              <p>CHICAGO, IL 60606</p>
              <p>UNITED STATES</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm md:text-base mb-3">Houston</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <p>HOUSTON, TEXAS</p>
              <p>UNITED STATES</p>
            </div>
          </div>
        </div>

        {/* Column 4: Locations 2 */}
        <div className="footer-col flex flex-col gap-6">
          <div>
            <h4 className="text-sm md:text-base mb-3">Lagos - Lekki</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <p>LEKKI OFFICE</p>
              <p>LAGOS, NIGERIA</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm md:text-base mb-3">Lagos - Ikeja</h4>
            <div className="flex flex-col gap-1 text-xs md:text-sm tracking-widest uppercase font-mono">
              <p>IKEJA OFFICE</p>
              <p>LAGOS, NIGERIA</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
