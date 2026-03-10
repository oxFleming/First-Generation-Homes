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
    image: "https://picsum.photos/seed/remy/800/1000",
    description: "Remy brings over two decades of progressive leadership in civil engineering, project development, and strategic operations across the construction and real estate sectors. He leads the company's mission to deliver innovative, affordable housing solutions with a focus on sustainability, precision, and long-term value."
  },
  {
    id: 2,
    name: "Matthew Kalesanwo",
    role: "VP, Revenue Growth & Business Development",
    image: "https://picsum.photos/seed/matthew/800/1000",
    description: "With over two decades of experience across construction, real estate, and enterprise strategy, Matthew leads global revenue growth and business development initiatives. He has spearheaded high-impact transformations and expanded market presence across three continents."
  },
  {
    id: 3,
    name: "Uju Amazu",
    role: "Chief Operating Officer",
    image: "https://picsum.photos/seed/uju/800/1000",
    description: "Uju is an accomplished operations executive with over 20 years of leadership experience in P&L management, procurement, budgeting, and enterprise controls. She oversees the firm's operational strategy, streamlining project execution and optimizing financial performance."
  },
  {
    id: 4,
    name: "Shade Akanji",
    role: "Chief Financial Officer",
    image: "https://picsum.photos/seed/shade/800/1000",
    description: "Shade is a globally credentialed finance and risk executive with over 18 years of leadership experience across Fortune 500 companies and global consulting firms. She oversees financial strategy, compliance, and enterprise risk management."
  },
  {
    id: 5,
    name: "Gbemi Adebayo",
    role: "Head of Enterprise Solutions & IT",
    image: "https://picsum.photos/seed/gbemi/800/1000",
    description: "Gbemi brings over 12 years of deep expertise in business process automation, systems engineering, and enterprise data solutions. He leads the design and optimization of the company's digital infrastructure."
  },
  {
    id: 6,
    name: "Olufolake Fadahunsi Olumogba",
    role: "Director of Project Development",
    image: "https://picsum.photos/seed/olufolake/800/1000",
    description: "Olufolake is a chartered architect with over 30 years of design and development leadership across the UK and Africa. She leads infrastructure delivery and project innovation, ensuring each development meets the highest standards."
  }
];

export const TeamSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollDistance = container.scrollWidth - window.innerWidth;
    
    gsap.to(container, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollDistance,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: containerRef });

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
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
              <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden rounded-2xl relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-full md:w-1/2 text-white">
                <div className="text-[#c1bdae] font-mono text-sm mb-4 tracking-widest uppercase">
                  0{index + 1} / 0{teamMembers.length}
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 leading-tight">
                  {member.name}
                </h3>
                <p className="text-lg md:text-xl text-[#c1bdae] mb-6 font-light">
                  {member.role}
                </p>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
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
