import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current || !pathRef.current || !circleRef.current) return;

    gsap.fromTo(bgRef.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    gsap.to(circleRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
      },
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden" data-theme="dark">
        {/* Background Image */}
        <div 
          ref={bgRef}
          className="absolute inset-0 w-full h-[130%] -top-[15%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop")' }}
        >
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Decorative SVG Path */}
        <div className="absolute inset-0 pointer-events-none z-20 flex justify-center items-center opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <path 
              ref={pathRef}
              id="values-path"
              d="M 500 0 C 700 300, 300 700, 500 1000" 
              fill="none" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="4 8"
            />
            <circle 
              ref={circleRef}
              cx="0" 
              cy="0" 
              r="8" 
              fill="#f5efe6" 
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto flex flex-col items-center mt-20">
          <h2 className="text-7xl md:text-8xl lg:text-[7rem] font-serif mb-8 tracking-tight">
            Our Values
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
            Our foundation rests on three uncompromising pillars: Professionalism, Quality, and Integrity.
          </p>
        </div>
      </section>

      {/* Blending Section */}
      <section id="what-we-do" className="w-full bg-[#c1bdae] px-6 md:px-12 py-16 md:py-24 text-[#1a1a1a]" data-theme="light">
        <div className="max-w-7xl mx-auto">
          <p className="text-xl md:text-2xl lg:text-3xl font-sans font-light leading-tight max-w-4xl mb-12">
            From transparent communication to flawless execution, we are committed to building absolute trust alongside every legacy home we deliver.
          </p>
          
          <button 
            onClick={() => {
              const element = document.getElementById('portfolio-categories');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center border border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-300"
          >
            <span className="px-10 py-5 text-sm md:text-base tracking-widest uppercase font-medium text-[#1a1a1a] group-hover:text-[#c1bdae] transition-colors duration-300">WHAT WE DO</span>
            <span className="p-5 bg-[#1a1a1a] text-white border-l border-[#1a1a1a]">
              <ArrowDown size={20} />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
