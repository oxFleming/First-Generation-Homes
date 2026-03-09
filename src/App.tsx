import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'agency', label: 'Agency' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'immersion', label: 'Immersion' },
  { id: 'contact', label: 'Contact' },
  { id: 'news', label: 'News' },
  { id: 'networks', label: 'Networks' },
  { id: 'fr', label: 'FR' }
];

const heroImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2092&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613490908676-430489d2d1b7?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop'
];

const interiorProjects = [
  { id: 1, src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop', title: 'Modern Living Room', location: 'Chicago, IL' },
  { id: 2, src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop', title: 'Minimalist Kitchen', location: 'Evanston, IL' },
  { id: 3, src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop', title: 'Luxury Bedroom', location: 'Oak Brook, IL' },
  { id: 4, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', title: 'Open Concept Dining', location: 'Naperville, IL' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop', title: 'Contemporary Bathroom', location: 'Chicago, IL' },
  { id: 6, src: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1000&auto=format&fit=crop', title: 'Cozy Study', location: 'Winnetka, IL' },
  { id: 7, src: 'https://images.unsplash.com/photo-1613490908676-430489d2d1b7?q=80&w=1000&auto=format&fit=crop', title: 'Sunroom', location: 'Highland Park, IL' },
  { id: 8, src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop', title: 'Home Theater', location: 'Lake Forest, IL' },
  { id: 9, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', title: 'Wine Cellar', location: 'Glencoe, IL' },
  { id: 10, src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1000&auto=format&fit=crop', title: 'Guest Suite', location: 'Hinsdale, IL' }
];

const categories = [
  {
    id: 'custom-residential',
    title: 'Custom Residential Construction',
    subtitle: "ARCHITECTURAL DESIGN<br />STRUCTURAL CONSTRUCTION<br />INTERIOR FINISHING<br />LANDSCAPING INTEGRATION",
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation & Property Modernization',
    subtitle: "KITCHEN REMODELS<br />BATHROOM RENOVATIONS<br />STRUCTURAL UPGRADES<br />INTERIOR REDESIGN<br />EXTERIOR MODERNIZATION",
  },
  {
    id: 'building-development',
    title: 'Building Development & Real Estate Projects',
    subtitle: "DEVELOPMENT PLANNING<br />BUILDING CONSTRUCTION<br />PROJECT MANAGEMENT<br />DEVELOPMENT CONSULTING<br />MATERIAL PROCUREMENT",
  },
  {
    id: 'construction-materials',
    title: 'Construction Materials & Finishing Products',
    subtitle: "TILE PRODUCTS<br />WOOD FLOORING<br />KITCHEN FIXTURES<br />BATHROOM INSTALLATIONS<br />INTERIOR FINISHING",
  }
];

function PortfolioCategory({ title, subtitle, projects, onProjectClick }: { title: string, subtitle: string, projects: any[], onProjectClick: (project: any) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-[#c1bdae] text-black pt-8 md:pt-12 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* End-to-end line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[1px] bg-black/30 mb-6 md:mb-8 origin-left"
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[20%] flex flex-col">
            <div className="flex items-start gap-4 md:gap-8">
              {/* Plus Button */}
              <motion.button 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-black flex items-center justify-center shrink-0 hover:text-gray-600 transition-colors mt-0.5"
              >
                {isExpanded ? <Minus size={20} strokeWidth={1} /> : <Plus size={20} strokeWidth={1} />}
              </motion.button>

              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="flex flex-col"
              >
                <h3 className="text-base md:text-lg font-sans text-gray-900 mt-0.5">
                  {title}
                </h3>
                <p 
                  className="text-[10px] md:text-[11px] text-gray-800 uppercase tracking-[0.15em] leading-[1.8] mt-16 md:mt-24 max-w-[250px]"
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              </motion.div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-[80%]">
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
              <AnimatePresence>
                {(isExpanded ? projects : projects.slice(0, 5)).map((project, index) => (
                  <motion.div
                    layout
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1], 
                      delay: (index % 5) * 0.1 
                    }}
                    key={project.id}
                    className="group cursor-pointer flex flex-col origin-center"
                    onClick={() => onProjectClick(project)}
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                      <img 
                        src={project.src} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <ArrowUpRight size={18} strokeWidth={1.5} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{id: number, src: string, title: string, location: string} | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [navTop, setNavTop] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '30%']);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (navTop > 0 && latest >= navTop) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  useEffect(() => {
    // Measure nav position after a short delay to ensure layout is complete
    const timer = setTimeout(() => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavTop(rect.top + window.scrollY);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [introFinished]);

  // Intro shuffle effect
  useEffect(() => {
    let count = 0;
    const maxShuffles = 15;
    const interval = setInterval(() => {
      setShuffleIndex((prev) => (prev + 1) % heroImages.length);
      count++;
      if (count >= maxShuffles) {
        clearInterval(interval);
        setShuffleIndex(0); // Settle on the first image
        if (tlRef.current) tlRef.current.play();
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Normal auto-rotate effect (only after intro)
  useEffect(() => {
    if (!introFinished) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [introFinished, activeIndex]);

  useGSAP(() => {
    // Initial states
    gsap.set(bgContainerRef.current, { 
      clipPath: 'polygon(35% 47%, 65% 47%, 65% 71%, 35% 71%)', // Centered vertically relative to 100vh viewport, inside the 85vh container
      opacity: 0 // Start invisible, fade in quickly
    });
    gsap.set(titleRef.current, { color: '#000000' });
    gsap.set(lineRef.current, { backgroundColor: 'rgba(0,0,0,0.3)' });
    gsap.set([navRef.current, bottomTextRef.current, previewRef.current], { opacity: 0, y: 20 });

    tlRef.current = gsap.timeline({ 
      paused: true, 
      onComplete: () => setIntroFinished(true) 
    });

    // Fade in the small image container at the very beginning
    gsap.to(bgContainerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });

    // The main expansion timeline (played after shuffle)
    tlRef.current
      .to(bgContainerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.2,
        ease: 'power3.inOut'
      })
      .to(titleRef.current, {
        color: '#ffffff',
        duration: 0.5
      }, '-=0.8')
      .to(lineRef.current, {
        backgroundColor: 'rgba(255,255,255,0.3)',
        duration: 0.5
      }, '-=0.8')
      .to([navRef.current, bottomTextRef.current, previewRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.4');

  }, { scope: containerRef });

  return (
    <div className="min-h-[150vh] bg-[#f5f5f5] font-sans">
      {/* Hero Section */}
      <div ref={containerRef} className="relative w-full h-[85vh] bg-white text-white">
        {/* Background Container */}
        <div 
          ref={bgContainerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
          {/* Background Images */}
          <motion.div 
            className="absolute -inset-y-[20%] inset-x-0" 
            style={{ perspective: '1000px', y: backgroundY }}
          >
            {!introFinished ? (
              <img
                src={heroImages[shuffleIndex]}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
            ) : (
              <AnimatePresence initial={false}>
                <motion.img
                  key={`bg-${activeIndex}`}
                  src={heroImages[activeIndex]}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.75 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>
            )}
          </motion.div>

          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/60" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between h-full px-6 md:px-10 lg:px-12 pt-4 md:pt-6 lg:pt-8 pb-12 md:pb-16 pointer-events-none">
          
          {/* Top Section */}
          <div className="w-full pointer-events-auto">
            {/* Stretched Title */}
            <h1 
              ref={titleRef}
              className="flex justify-between w-full text-[5vw] md:text-[5.5vw] lg:text-[6vw] leading-[0.8] font-medium uppercase tracking-tight mb-4"
            >
              {'FIRST GENERATION HOMES'.split('').map((char, i) => (
                <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h1>
            
            {/* End-to-end line */}
            <div 
              ref={lineRef}
              className="w-full h-[1px] mb-4"
            />

            {/* Nav Wrapper to maintain layout when nav becomes fixed */}
            <div ref={navRef} className="w-full h-[40px]">
              <nav 
                className={`flex flex-wrap justify-between items-center w-full gap-y-4 text-sm md:text-base font-medium tracking-wider transition-all duration-300 ${
                  isSticky 
                    ? 'fixed top-0 left-0 right-0 z-50 px-6 md:px-10 lg:px-12 py-4 bg-black/90 backdrop-blur-md shadow-lg' 
                    : 'relative'
                }`}
              >
                {navItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className="cursor-pointer flex items-center gap-2 group py-2"
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className="text-white/60 font-light text-lg leading-none mb-0.5">+</span>
                    <span className={`transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
          <div 
            ref={bottomTextRef}
            className="flex justify-between items-end w-full pointer-events-auto"
          >
            {/* Left Text */}
            <div className="max-w-xl text-2xl md:text-3xl lg:text-[32px] leading-[1.2] font-normal tracking-tight">
              OUR agency architecture designs<br />
              of the residences exceptional In of the<br />
              places rare, in France And In THE world.
            </div>
          </div>
        </div>

        {/* Right Preview Image - Positioned half outside */}
        <div className="absolute right-4 md:right-16 lg:right-32 bottom-0 translate-y-[30%] hidden sm:block z-20 pointer-events-auto">
          <div 
            ref={previewRef}
            className="w-[280px] h-[180px] md:w-[500px] md:h-[320px] overflow-hidden cursor-pointer transition-all duration-300 relative"
            onClick={() => setActiveIndex((current) => (current + 1) % heroImages.length)}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={`preview-${activeIndex}`}
                src={heroImages[(activeIndex + 1) % heroImages.length]}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* About Us Section */}
      <div className="w-full bg-[#fafafa] text-black py-24 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-gray-900 mb-8 ml-0 md:ml-[5%]">
            Who we are...
          </h2>

          {/* New Text Content directly under the header */}
          <div className="ml-0 md:ml-[5%] max-w-4xl mb-16 md:mb-20">
            <p className="text-lg md:text-xl leading-[1.8] font-light text-gray-800 mb-6">
              First Generation Homes LLC is a U.S.-based real estate development and construction company headquartered in Chicago, Illinois. The company focuses on residential construction, renovation, and development projects while also supporting international real estate initiatives.
            </p>
            <p className="text-lg md:text-xl leading-[1.8] font-light text-gray-800 mb-6">
              The firm operates as part of the broader FGIP ecosystem and contributes strategic expertise in design, construction management, finishing products, and residential development planning.
            </p>
            <p className="text-lg md:text-xl leading-[1.8] font-light text-gray-800">
              The company’s operations combine construction services, custom home development, and building renovation, delivering high-quality residential environments tailored to modern lifestyle and market demands.
            </p>
          </div>

          {/* Intro to Images Header */}
          <div className="w-full flex justify-end md:pr-[5%] mb-16 md:mb-24">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-gray-900">
              At FGH LLC
            </h3>
          </div>

          <div className="flex flex-col gap-16 md:gap-0">
            
            {/* WE ENVISION */}
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-[75%] lg:w-[65%] md:ml-[5%] relative z-10">
              <div className="w-full md:w-[30%] mb-4 md:mb-0 md:pr-8 flex justify-start md:justify-end">
                <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Envision</span>
              </div>
              <div className="w-full md:w-[70%]">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop" alt="Envision" className="w-full aspect-[4/3] object-cover shadow-xl" />
              </div>
            </div>

            {/* WE DESIGN */}
            <div className="flex flex-col md:flex-row-reverse items-start md:items-center w-full md:w-[85%] lg:w-[75%] md:ml-auto md:-mt-24 lg:-mt-32 relative z-20">
              <div className="w-full md:w-[25%] mt-4 md:mt-0 md:pl-8 flex justify-start">
                <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Design</span>
              </div>
              <div className="w-full md:w-[75%]">
                <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200&auto=format&fit=crop" alt="Design" className="w-full aspect-[16/10] object-cover shadow-2xl" />
              </div>
            </div>

            {/* WE BUILD & TEXT */}
            <div className="flex flex-col md:flex-row items-start w-full md:w-[95%] lg:w-[90%] md:ml-[2%] md:-mt-16 lg:-mt-24 relative z-30 gap-12 md:gap-16 lg:gap-24">
              <div className="w-full md:w-[50%] flex flex-col">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" alt="Build" className="w-full aspect-[4/3] object-cover shadow-xl mb-6" />
                <div className="flex justify-start md:pl-8">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Build</span>
                </div>
              </div>
              
              <div className="w-full md:w-[50%] md:pt-24 lg:pt-32">
                <p className="text-lg md:text-xl lg:text-[22px] leading-[1.8] font-light text-gray-800">
                  We bridge the gap between visionary architecture and flawless on-site execution through meticulous craftsmanship and transparent project management.
                  <br/><br/>
                  Driven by an uncompromising standard of quality, we seamlessly transform complex blueprints into architectural masterpieces.
                  <br/><br/>
                  Ultimately, we don't just construct properties, we build legacy structures and client relationships designed to last generations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Portfolio Sections */}
      <div className="bg-[#c1bdae] pb-16 md:pb-24">
        {categories.map((category) => (
          <PortfolioCategory 
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            projects={interiorProjects} // Reusing the same images for demonstration
            onProjectClick={setSelectedProject}
          />
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors z-50"
              onClick={() => setSelectedProject(null)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedProject.src} 
              alt={selectedProject.title} 
              className="max-w-full max-h-full object-contain shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-8 text-white pointer-events-none"
            >
              <h3 className="text-2xl font-serif tracking-widest uppercase mb-2">{selectedProject.title}</h3>
              <p className="text-sm text-gray-400 uppercase tracking-widest">{selectedProject.location}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
