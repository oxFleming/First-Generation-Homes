import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const projectList = [
  { name: 'The Heritage Estate', titleLine1: 'The Heritage', titleLine2: 'Estate', size: '12,000 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'With The Heritage Estate,<br/>FGH LLC delivers a masterful<br/>blend of classic architecture<br/>and modern luxury.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Lakefront Villa', titleLine1: 'Lakefront', titleLine2: 'Villa', size: '8,500 SQ FT', location: 'EVANSTON, IL', year: '2023', description: 'A stunning modern villa<br/>overlooking the lake,<br/>featuring floor-to-ceiling<br/>windows and open spaces.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Modern Oasis', titleLine1: 'Modern', titleLine2: 'Oasis', size: '6,200 SQ FT', location: 'OAK BROOK, IL', year: '2022', description: 'An architectural marvel<br/>designed for tranquility,<br/>blending indoor and outdoor<br/>living seamlessly.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Skyline Penthouse', titleLine1: 'Skyline', titleLine2: 'Penthouse', size: '4,500 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'A luxurious penthouse<br/>offering panoramic views<br/>of the city skyline with<br/>bespoke interior finishes.', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop' },
  { name: 'The Glass House', titleLine1: 'The Glass', titleLine2: 'House', size: '5,800 SQ FT', location: 'HIGHLAND PARK, IL', year: '2021', description: 'A transparent masterpiece<br/>immersed in nature,<br/>providing an unparalleled<br/>living experience.', image: 'https://images.unsplash.com/photo-1613490908676-430489d2d1b7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Historic Renovation', titleLine1: 'Historic', titleLine2: 'Renovation', size: '7,100 SQ FT', location: 'WINNETKA, IL', year: '2020', description: 'A careful restoration of<br/>a historic property,<br/>bringing modern amenities<br/>to classic design.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Urban Loft', titleLine1: 'Urban', titleLine2: 'Loft', size: '3,200 SQ FT', location: 'WEST LOOP, IL', year: '2023', description: 'An industrial-chic loft<br/>in the heart of the city,<br/>featuring exposed brick<br/>and high ceilings.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Forest Retreat', titleLine1: 'Forest', titleLine2: 'Retreat', size: '9,000 SQ FT', location: 'LAKE FOREST, IL', year: '2022', description: 'A secluded retreat<br/>surrounded by nature,<br/>offering ultimate privacy<br/>and luxury.', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Riverfront Condo', titleLine1: 'Riverfront', titleLine2: 'Condo', size: '2,800 SQ FT', location: 'RIVER NORTH, IL', year: '2024', description: 'A modern condo with<br/>stunning river views,<br/>featuring state-of-the-art<br/>appliances and finishes.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Suburban Estate', titleLine1: 'Suburban', titleLine2: 'Estate', size: '10,500 SQ FT', location: 'NAPERVILLE, IL', year: '2021', description: 'A sprawling estate<br/>perfect for family living,<br/>with expansive grounds<br/>and luxurious amenities.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop' },
];

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeProject = projectList[activeIndex];

  return (
    <div className="bg-white text-black py-12 lg:py-20 relative overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Beige Box */}
        <div className="bg-[#f5efe6] relative w-full lg:w-[80%] mx-auto pt-10 pb-10 lg:pt-16 lg:pb-16 px-5 sm:px-8 lg:px-12">
          
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row items-start mb-20 flex-nowrap">
            <div className="w-full lg:w-[45%] flex flex-col justify-center shrink-0 pr-0 lg:pr-8 relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <h2 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] font-serif mb-6 text-gray-900">
                    {activeProject.titleLine1}<br/>{activeProject.titleLine2}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 md:gap-5 text-[9px] md:text-[11px] tracking-widest uppercase font-mono mb-10 text-gray-600">
                    <span>[ {activeProject.size} ]</span>
                    <span>[ {activeProject.location} ]</span>
                    <span>[ {activeProject.year} ]</span>
                  </div>
                  
                  <p 
                    className="text-[11px] md:text-xs tracking-widest uppercase font-mono max-w-sm mb-10 leading-relaxed text-gray-800"
                    dangerouslySetInnerHTML={{ __html: activeProject.description }}
                  />
                  
                  <div>
                    <button className="flex items-center border border-black group hover:bg-transparent transition-colors duration-300">
                      <span className="px-5 py-2.5 text-[11px] tracking-widest uppercase font-mono font-medium">View Project</span>
                      <span className="border-l border-black p-2.5 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Image bleeds out of the beige box to the right */}
            <div className="w-full lg:w-[calc(67.5%+2rem)] mt-10 lg:mt-0 relative z-20 shrink-0 aspect-[4/3] lg:aspect-auto lg:h-[450px] overflow-hidden shadow-2xl bg-gray-200">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  src={activeProject.image} 
                  alt={activeProject.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Project List */}
          <div className="border-t border-black/20 relative z-20">
            {projectList.slice(0, 5).map((project, index) => (
              <div 
                key={index} 
                className="group relative flex items-center py-4 px-3 border-b border-black/20 overflow-hidden cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                {/* Hover Background - Smooth lamina flow slide up */}
                <div className={`absolute inset-0 bg-black transition-transform duration-500 ease-[0.22,1,0.36,1] z-0 ${activeIndex === index ? 'translate-y-0' : 'translate-y-[101%] group-hover:translate-y-0'}`}></div>
                
                {/* Content */}
                <div className={`relative z-10 flex w-full items-center transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-black group-hover:text-white'}`}>
                  <div className={`flex-1 font-serif text-base md:text-lg transform transition-transform duration-500 ease-[0.22,1,0.36,1] ${activeIndex === index ? 'translate-x-4' : 'group-hover:translate-x-4'}`}>{project.name}</div>
                  <div className={`flex-1 text-center font-mono text-[9px] md:text-[11px] tracking-widest uppercase transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{project.size}</div>
                  <div className={`flex-1 text-right font-mono text-[9px] md:text-[11px] tracking-widest uppercase pr-4 md:pr-8 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{project.location}</div>
                  <div className={`transform transition-transform duration-500 ease-[0.22,1,0.36,1] ${activeIndex === index ? '-translate-x-4' : 'group-hover:-translate-x-4'}`}>
                    <ArrowUpRight className={`w-4 h-4 transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="mt-12">
            <button className="flex items-center border border-black group hover:bg-transparent transition-colors duration-300">
              <span className="px-5 py-2.5 text-[11px] tracking-widest uppercase font-mono font-medium">Our Achievements</span>
              <span className="border-l border-black p-2.5 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
