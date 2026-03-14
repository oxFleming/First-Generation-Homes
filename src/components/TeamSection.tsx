import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Remy Okunbena",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    description: "Remy brings over two decades of progressive leadership in civil engineering, project development, and strategic operations across the construction and real estate sectors. He leads the company's mission to deliver innovative, affordable housing solutions with a focus on sustainability, precision, and long-term value."
  },
  {
    id: 2,
    name: "Matthew Kalesanwo",
    role: "VP, Revenue Growth & Business Development",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    description: "With over two decades of experience across construction, real estate, and enterprise strategy, Matthew leads global revenue growth and business development initiatives. He has spearheaded high-impact transformations and expanded market presence across three continents."
  },
  {
    id: 3,
    name: "Uju Amazu",
    role: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    description: "Uju is an accomplished operations executive with over 20 years of leadership experience in P&L management, procurement, budgeting, and enterprise controls. She oversees the firm's operational strategy, streamlining project execution and optimizing financial performance."
  },
  {
    id: 4,
    name: "Shade Akanji",
    role: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    description: "Shade is a globally credentialed finance and risk executive with over 18 years of leadership experience across Fortune 500 companies and global consulting firms. She oversees financial strategy, compliance, and enterprise risk management."
  },
  {
    id: 5,
    name: "Gbemi Adebayo",
    role: "Head of Enterprise Solutions & IT",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    description: "Gbemi brings over 12 years of deep expertise in business process automation, systems engineering, and enterprise data solutions. He leads the design and optimization of the company's digital infrastructure."
  },
  {
    id: 6,
    name: "Olufolake Fadahunsi Olumogba",
    role: "Director of Project Development",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
    description: "Olufolake is a chartered architect with over 30 years of design and development leadership across the UK and Africa. She leads infrastructure delivery and project innovation, ensuring each development meets the highest standards."
  }
];

export const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true,
      }
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <section ref={containerRef} className="relative h-[100dvh] bg-[#111] overflow-hidden flex items-center">
      {/* Fixed Header */}
      <div className="absolute top-6 md:top-12 left-6 md:left-12 lg:left-24 z-10 pointer-events-none">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
          Meet Our Team
        </h2>
        <div className="w-24 h-1 bg-[#c1bdae]" />
      </div>
      
      {/* Horizontal Scroll Container */}
      <div ref={scrollRef} className="flex h-full items-center pt-32 md:pt-16 w-max">
        {/* Empty padding block to push the first card to the right initially */}
        <div className="w-[10vw] md:w-[20vw] h-full flex-shrink-0" />

        {teamMembers.map((member, index) => (
          <div 
            key={member.id} 
            className="w-[85vw] md:w-[60vw] lg:w-[50vw] h-full flex items-center justify-center px-4 md:px-12 flex-shrink-0"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full max-h-[75vh]">
              <div className="w-full md:w-[45%] aspect-square md:aspect-[4/5] max-h-[40vh] md:max-h-[50vh] overflow-hidden rounded-2xl relative group shrink-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1] scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-[55%] text-white flex flex-col justify-center">
                <div className="text-[#c1bdae] font-mono text-xs md:text-sm mb-2 md:mb-3 tracking-widest uppercase">
                  0{index + 1} / 0{teamMembers.length}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-serif mb-2 md:mb-3 leading-tight">
                  {member.name}
                </h3>
                <p className="text-sm md:text-base text-[#c1bdae] mb-3 md:mb-4 font-light">
                  {member.role}
                </p>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light line-clamp-4 md:line-clamp-none">
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* End padding */}
        <div className="w-[10vw] md:w-[20vw] h-full flex-shrink-0" />
      </div>
    </section>
  );
};
