import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const genericGallery = [
  'https://images.unsplash.com/photo-1600607687931-cebf66713e28?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop'
];

interface ProjectModalProps {
  project: any;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      y: '0%',
      duration: 1,
      ease: 'power4.inOut'
    })
    .fromTo('.modal-title-line',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(['.modal-divider', '.modal-detail-item', '.modal-desc', '.modal-close-btn'],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo('.modal-image-container',
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15, ease: 'power4.inOut' },
      '-=0.8'
    )
    .fromTo('.modal-image',
      { scale: 1.2 },
      { scale: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' },
      '<'
    );
  }, { scope: containerRef });

  const handleClose = () => {
    gsap.to(containerRef.current, {
      y: '100%',
      duration: 0.8,
      ease: 'power4.inOut',
      onComplete: onClose
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[400] overflow-y-auto overscroll-none bg-[#141414] text-[#f5efe6] translate-y-full"
      data-lenis-prevent="true"
    >
      <div className="flex flex-col lg:flex-row min-h-full">
        {/* Left: Sticky Content */}
        <div className="w-full lg:w-[40%] lg:sticky lg:top-0 lg:h-screen p-6 md:p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10 bg-[#141414] shrink-0">
        <div className="my-auto">
          <button 
            onClick={handleClose} 
            className="modal-close-btn flex items-center gap-2 text-xs tracking-widest uppercase font-mono hover:opacity-70 transition-opacity mb-8 lg:mb-12"
          >
            <X size={16} /> Close Project
          </button>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.9] mb-8">
            <div className="overflow-hidden py-2"><div className="modal-title-line">{project.titleLine1}</div></div>
            <div className="overflow-hidden py-2"><div className="modal-title-line italic text-white/70">{project.titleLine2}</div></div>
          </h2>
          
          <div className="flex flex-col gap-4 text-[10px] md:text-xs tracking-widest uppercase font-mono mb-8">
            <div className="modal-divider w-full h-px bg-white/10 mb-2"></div>
            <div className="modal-detail-item flex justify-between">
              <span className="opacity-50">Size</span>
              <span>{project.size}</span>
            </div>
            <div className="modal-detail-item flex justify-between">
              <span className="opacity-50">Location</span>
              <span>{project.location}</span>
            </div>
            <div className="modal-detail-item flex justify-between">
              <span className="opacity-50">Year</span>
              <span>{project.year}</span>
            </div>
            <div className="modal-divider w-full h-px bg-white/10 mt-2"></div>
          </div>
          
          <p className="modal-desc text-sm md:text-base leading-relaxed font-serif opacity-80 max-w-md">
            {project.description.replace(/<br\/>/g, ' ')} This project represents the pinnacle of our design philosophy, combining aesthetic elegance with functional brilliance. Every detail was meticulously planned and executed to create a space that is both breathtaking and livable.
          </p>
        </div>
      </div>

      {/* Right: Scrollable Gallery */}
      <div className="w-full lg:w-[60%] bg-[#0a0a0a]">
        <div className="flex flex-col p-4 md:p-8 gap-4 md:gap-8">
          {[project.image, ...genericGallery].map((img, idx) => (
            <div key={idx} className="modal-image-container w-full aspect-[4/3] md:aspect-[16/9] relative overflow-hidden bg-white/5">
              <img src={img} alt={`Gallery ${idx}`} className="modal-image w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

const projectList = [
  { name: 'The Heritage Estate', titleLine1: 'The Heritage', titleLine2: 'Estate', size: '12,000 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'With The Heritage Estate,<br/>FGH LLC delivers a masterful<br/>blend of classic architecture<br/>and modern luxury.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Lakefront Villa', titleLine1: 'Lakefront', titleLine2: 'Villa', size: '8,500 SQ FT', location: 'EVANSTON, IL', year: '2023', description: 'A stunning modern villa<br/>overlooking the lake,<br/>featuring floor-to-ceiling<br/>windows and open spaces.', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Modern Oasis', titleLine1: 'Modern', titleLine2: 'Oasis', size: '6,200 SQ FT', location: 'OAK BROOK, IL', year: '2022', description: 'An architectural marvel<br/>designed for tranquility,<br/>blending indoor and outdoor<br/>living seamlessly.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Skyline Penthouse', titleLine1: 'Skyline', titleLine2: 'Penthouse', size: '4,500 SQ FT', location: 'CHICAGO, IL', year: '2024', description: 'A luxurious penthouse<br/>offering panoramic views<br/>of the city skyline with<br/>bespoke interior finishes.', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop' },
  { name: 'The Glass House', titleLine1: 'The Glass', titleLine2: 'House', size: '5,800 SQ FT', location: 'HIGHLAND PARK, IL', year: '2021', description: 'A transparent masterpiece<br/>immersed in nature,<br/>providing an unparalleled<br/>living experience.', image: 'https://images.unsplash.com/photo-1613490908676-430489d2d1b7?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Historic Renovation', titleLine1: 'Historic', titleLine2: 'Renovation', size: '7,100 SQ FT', location: 'WINNETKA, IL', year: '2020', description: 'A careful restoration of<br/>a historic property,<br/>bringing modern amenities<br/>to classic design.', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Urban Loft', titleLine1: 'Urban', titleLine2: 'Loft', size: '3,200 SQ FT', location: 'WEST LOOP, IL', year: '2023', description: 'An industrial-chic loft<br/>in the heart of the city,<br/>featuring exposed brick<br/>and high ceilings.', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Forest Retreat', titleLine1: 'Forest', titleLine2: 'Retreat', size: '9,000 SQ FT', location: 'LAKE FOREST, IL', year: '2022', description: 'A secluded retreat<br/>surrounded by nature,<br/>offering ultimate privacy<br/>and luxury.', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Riverfront Condo', titleLine1: 'Riverfront', titleLine2: 'Condo', size: '2,800 SQ FT', location: 'RIVER NORTH, IL', year: '2024', description: 'A modern condo with<br/>stunning river views,<br/>featuring state-of-the-art<br/>appliances and finishes.', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Suburban Estate', titleLine1: 'Suburban', titleLine2: 'Estate', size: '10,500 SQ FT', location: 'NAPERVILLE, IL', year: '2021', description: 'A sprawling estate<br/>perfect for family living,<br/>with expansive grounds<br/>and luxurious amenities.', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop' },
];

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pauseKey, setPauseKey] = useState(0);

  useEffect(() => {
    if (pauseKey > 0) {
      const timeout = setTimeout(() => {
        setPauseKey(0);
      }, 15000);
      return () => clearTimeout(timeout);
    }
  }, [pauseKey]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen || pauseKey > 0) return; // Pause auto-rotation when modal is open or manually paused
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isModalOpen, pauseKey]);

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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center border border-black group hover:bg-transparent transition-colors duration-300"
                    >
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
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                onClick={() => {
                  setActiveIndex(index);
                  setPauseKey(prev => prev + 1);
                }}
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

      {/* Project Detail Modal */}
      {isModalOpen && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
