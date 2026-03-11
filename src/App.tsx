import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { Plus, Minus, ArrowUpRight, X, CheckSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ValuesSection } from './components/ValuesSection';
import { Testimonials } from './components/Testimonials';
import { TeamSection } from './components/TeamSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'projects', label: 'Projects' },
  { id: 'what-we-do', label: 'What we do' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'team', label: 'Meet Our Team' },
  { id: 'contact', label: 'Contact us' }
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

const customResidentialProjects = [
  { id: 1, src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop', title: 'Architectural Design', location: 'Chicago, IL' },
  { id: 2, src: 'https://images.unsplash.com/photo-1590386184852-32a8b3036611?q=80&w=1000&auto=format&fit=crop', title: 'Structural Construction', location: 'Evanston, IL' },
  { id: 3, src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop', title: 'Interior Finishing', location: 'Oak Brook, IL' },
  { id: 4, src: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop', title: 'Landscaping Integration', location: 'Naperville, IL' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop', title: 'Custom Home', location: 'Chicago, IL' }
];

const homeRenovationProjects = [
  { id: 6, src: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?q=80&w=1000&auto=format&fit=crop', title: 'Kitchen Remodels', location: 'Winnetka, IL' },
  { id: 7, src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop', title: 'Bathroom Renovations', location: 'Highland Park, IL' },
  { id: 8, src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop', title: 'Structural Upgrades', location: 'Lake Forest, IL' },
  { id: 9, src: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1000&auto=format&fit=crop', title: 'Interior Redesign', location: 'Glencoe, IL' },
  { id: 10, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop', title: 'Exterior Modernization', location: 'Hinsdale, IL' }
];

const buildingDevelopmentProjects = [
  { id: 11, src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', title: 'Development Planning', location: 'Chicago, IL' },
  { id: 12, src: 'https://images.unsplash.com/photo-1541888086925-0c13d4f47c54?q=80&w=1000&auto=format&fit=crop', title: 'Building Construction', location: 'Evanston, IL' },
  { id: 13, src: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1000&auto=format&fit=crop', title: 'Project Management', location: 'Oak Brook, IL' },
  { id: 14, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', title: 'Development Consulting', location: 'Naperville, IL' },
  { id: 15, src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop', title: 'Real Estate Projects', location: 'Chicago, IL' }
];

const constructionMaterialsProjects = [
  { id: 16, src: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?q=80&w=1000&auto=format&fit=crop', title: 'Tile Products', location: 'Winnetka, IL' },
  { id: 17, src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1000&auto=format&fit=crop', title: 'Wood Flooring', location: 'Highland Park, IL' },
  { id: 18, src: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1000&auto=format&fit=crop', title: 'Kitchen Fixtures', location: 'Lake Forest, IL' },
  { id: 19, src: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1000&auto=format&fit=crop', title: 'Bathroom Installations', location: 'Glencoe, IL' },
  { id: 20, src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop', title: 'Interior Finishing', location: 'Hinsdale, IL' }
];

const categories = [
  {
    id: 'custom-residential',
    title: 'Custom Residential Construction',
    subtitle: "ARCHITECTURAL DESIGN<br />STRUCTURAL CONSTRUCTION<br />INTERIOR FINISHING<br />LANDSCAPING INTEGRATION",
    projects: customResidentialProjects
  },
  {
    id: 'home-renovation',
    title: 'Home Renovation & Property Modernization',
    subtitle: "KITCHEN REMODELS<br />BATHROOM RENOVATIONS<br />STRUCTURAL UPGRADES<br />INTERIOR REDESIGN<br />EXTERIOR MODERNIZATION",
    projects: homeRenovationProjects
  },
  {
    id: 'building-development',
    title: 'Building Development & Real Estate Projects',
    subtitle: "DEVELOPMENT PLANNING<br />BUILDING CONSTRUCTION<br />PROJECT MANAGEMENT<br />DEVELOPMENT CONSULTING<br />MATERIAL PROCUREMENT",
    projects: buildingDevelopmentProjects
  },
  {
    id: 'construction-materials',
    title: 'Construction Materials & Finishing Products',
    subtitle: "TILE PRODUCTS<br />WOOD FLOORING<br />KITCHEN FIXTURES<br />BATHROOM INSTALLATIONS<br />INTERIOR FINISHING",
    projects: constructionMaterialsProjects
  }
];

function PortfolioCategory({ title, subtitle, projects, onProjectClick }: { title: string, subtitle: string, projects: any[], onProjectClick: (project: any) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cat-line', 
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: catRef.current,
          start: 'top 90%',
        }
      }
    );

    gsap.fromTo('.cat-text',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: catRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: catRef });

  return (
    <div ref={catRef} className="w-full bg-[#c1bdae] text-black pt-4 md:pt-6 pb-8 md:pb-12 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        {/* End-to-end line */}
        <div className="cat-line w-full h-[1px] bg-black/30 mb-4 md:mb-6 origin-left" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
          
          {/* Left Sidebar */}
          <div 
            className="w-full lg:w-[20%] flex flex-col group cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-start gap-4 md:gap-8">
              {/* Plus Button */}
              <div className="cat-text flex items-center justify-center shrink-0 mt-0.5 w-6 h-6 transition-colors duration-300 group-hover:bg-black group-hover:text-white text-black">
                {isExpanded ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <h3 className="cat-text text-[10px] md:text-xs font-sans font-bold text-gray-900 mt-1 uppercase tracking-widest">
                  {title}
                </h3>
                <p 
                  className="cat-text text-[10px] md:text-[11px] text-gray-800 uppercase tracking-[0.15em] leading-[1.8] mt-16 md:mt-24 max-w-[250px]"
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              </div>
            </div>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-[80%]">
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
              <AnimatePresence>
                {(isExpanded ? projects : projects.slice(0, 5)).map((project, index) => (
                  <motion.div
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: (index % 5) * 0.08 
                    }}
                    key={project.id}
                    className="group/item cursor-pointer flex flex-col origin-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProjectClick(project);
                    }}
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-200">
                      <img 
                        src={project.src} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover/item:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ease-[0.16,1,0.3,1] flex items-center justify-center">
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
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
  const [navTheme, setNavTheme] = useState<'light' | 'dark'>('dark');
  
  const mainRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 100, mass: 0.5 });
  const backgroundY = useTransform(smoothScrollY, [0, 1000], ['0%', '30%']);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisInstance) {
      lenisInstance.scrollTo(element, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intro shuffle effect
  useEffect(() => {
    let count = 0;
    const maxShuffles = 8;
    const interval = setInterval(() => {
      setShuffleIndex((prev) => (prev + 1) % heroImages.length);
      count++;
      if (count >= maxShuffles) {
        clearInterval(interval);
        setShuffleIndex(0); // Settle on the first image
        if (tlRef.current) tlRef.current.play();
      }
    }, 60);
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

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Prevent scrolling during intro
  useEffect(() => {
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
      if (lenisInstance) lenisInstance.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [introFinished, lenisInstance]);

  useGSAP(() => {
    // Initial states
    gsap.set(bgContainerRef.current, { 
      clipPath: 'polygon(35% 47%, 65% 47%, 65% 71%, 35% 71%)',
      opacity: 0
    });
    gsap.set(titleRef.current, { color: '#000000' });
    gsap.set(lineRef.current, { backgroundColor: 'rgba(0,0,0,0.3)' });
    gsap.set([bottomTextRef.current, previewRef.current], { opacity: 0, y: 20 });

    tlRef.current = gsap.timeline({ 
      paused: true, 
      onComplete: () => setIntroFinished(true) 
    });

    // Fade in the small image container at the very beginning
    gsap.to(bgContainerRef.current, { opacity: 1, duration: 0.4, ease: 'power2.inOut' });

    // The main expansion timeline (played after shuffle)
    tlRef.current
      .to(bgContainerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.0,
        ease: 'expo.inOut'
      })
      .to(titleRef.current, {
        color: '#ffffff',
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.6')
      .to(lineRef.current, {
        backgroundColor: 'rgba(255,255,255,0.3)',
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.6')
      .to([bottomTextRef.current, previewRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out'
      }, '-=0.4');

    // Pin the navigation
    ScrollTrigger.create({
      trigger: navRef.current,
      start: "top 24px",
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    // Theme switching for nav
    const themeSections = gsap.utils.toArray('[data-theme]');
    themeSections.forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60px', // Trigger when section hits the nav area
        end: 'bottom 60px',
        onEnter: () => setNavTheme(section.dataset.theme as 'light' | 'dark'),
        onEnterBack: () => setNavTheme(section.dataset.theme as 'light' | 'dark'),
      });
    });

    // ScrollTrigger Animations for About Section
    const aboutTexts = gsap.utils.toArray('.about-text');
    aboutTexts.forEach((text: any) => {
      gsap.fromTo(text,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        }
      );
    });

    // Image Parallax and Reveal
    const imgContainers = gsap.utils.toArray('.img-container');
    imgContainers.forEach((container: any) => {
      const img = container.querySelector('img');
      
      // Reveal
      gsap.fromTo(container,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          }
        }
      );

      // Parallax
      gsap.fromTo(img,
        { scale: 1.2, yPercent: -10 },
        {
          scale: 1,
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-[150vh] bg-[#f5f5f5] font-sans overflow-x-hidden w-full">
      {/* Hero Section */}
      <div id="home" ref={containerRef} className="relative w-full h-[85vh] bg-white text-white" data-theme="dark">
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
        <div className="relative z-[100] flex flex-col justify-between h-full pt-8 md:pt-10 lg:pt-10 pb-8 md:pb-12 pointer-events-none">
          
          {/* Top Section */}
          <div className="w-full pointer-events-auto">
            <div className="px-6 md:px-10 lg:px-12">
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
            </div>

            {/* Navigation Options */}
            <nav 
              ref={navRef}
              className={`flex flex-wrap justify-between items-center w-full px-6 md:px-10 lg:px-12 gap-y-4 transition-all duration-500 ${introFinished ? 'opacity-100' : 'opacity-0'} z-[100] ${navTheme === 'dark' ? 'text-white' : 'text-black'}`}
            >
              {navItems.map((item, index) => (
                <div 
                  key={item.id}
                  className="cursor-pointer flex items-center gap-2 group py-2"
                  onMouseEnter={() => setActiveIndex(index % heroImages.length)}
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <span className={`absolute inset-0 transition-transform duration-300 ease-out scale-0 group-hover:scale-100 ${navTheme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                    <span className={`relative font-light text-lg leading-none transition-all duration-300 opacity-60 group-hover:opacity-100 ${navTheme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>+</span>
                  </div>
                  <span className={`text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div 
            ref={bottomTextRef}
            className="flex justify-between items-end w-full pointer-events-auto px-6 md:px-10 lg:px-12"
          >
            {/* Left Text */}
            <div className="max-w-lg text-lg md:text-xl lg:text-2xl leading-[1.3] font-normal tracking-tight">
              OUR agency architecture designs<br />
              of the residences exceptional In of the<br />
              places rare, in France And In THE world.
            </div>
          </div>
        </div>

        {/* Right Preview Image - Positioned half outside */}
        <div className="absolute right-4 md:right-16 lg:right-32 bottom-0 translate-y-[45%] hidden sm:block z-20 pointer-events-auto">
          <div 
            ref={previewRef}
            className="w-[250px] h-[160px] md:w-[480px] md:h-[300px] overflow-hidden cursor-pointer transition-all duration-300 relative"
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
      <div id="who-we-are" className="w-full bg-[#fafafa] text-black py-24 md:py-40 px-6 md:px-12 overflow-hidden" data-theme="light">
        <div className="max-w-[1400px] mx-auto">
          {/* Title */}
          <h2 className="about-text text-6xl md:text-7xl lg:text-[90px] font-serif tracking-tight text-gray-900 mb-8 ml-0 md:ml-[5%]">
            Who we are...
          </h2>

          {/* New Text Content directly under the header */}
          <div className="ml-0 md:ml-[16%] lg:ml-[20%] max-w-4xl mb-16 md:mb-24">
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-gray-800 mb-6">
              First Generation Homes LLC is a U.S.-based real estate development and construction company headquartered in Chicago, Illinois. The company focuses on residential construction, renovation, and development projects while also supporting international real estate initiatives.
            </p>
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-gray-800 mb-6">
              The firm operates as part of the broader FGIP ecosystem and contributes strategic expertise in design, construction management, finishing products, and residential development planning.
            </p>
            <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-gray-800">
              The company’s operations combine construction services, custom home development, and building renovation, delivering high-quality residential environments tailored to modern lifestyle and market demands.
            </p>
          </div>

          {/* Intro to Images Header */}
          <div className="w-full flex justify-end md:pr-[5%] mb-16 md:mb-24">
            <h3 className="about-text text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-gray-900">
              At First Generation Homes
            </h3>
          </div>

          <div className="flex flex-col gap-16 md:gap-0">
            
            {/* WE ENVISION */}
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-[75%] lg:w-[65%] md:ml-[5%] relative z-10">
              <div className="w-full md:w-[30%] mb-4 md:mb-0 md:pr-8 flex justify-start md:justify-end">
                <span className="about-text text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Envision</span>
              </div>
              <div className="w-full md:w-[70%] img-container overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop" alt="Envision" className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>

            {/* WE DESIGN */}
            <div className="flex flex-col md:flex-row-reverse items-start md:items-center w-full md:w-[85%] lg:w-[75%] md:ml-auto md:-mt-24 lg:-mt-32 relative z-20">
              <div className="w-full md:w-[25%] mt-4 md:mt-0 md:pl-8 flex justify-start">
                <span className="about-text text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Design</span>
              </div>
              <div className="w-full md:w-[75%] img-container overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" alt="Design" className="w-full aspect-[16/10] object-cover" />
              </div>
            </div>

            {/* WE BUILD & TEXT */}
            <div className="flex flex-col md:flex-row items-start w-full md:w-[95%] lg:w-[90%] md:ml-[2%] md:-mt-16 lg:-mt-24 relative z-30 gap-12 md:gap-16 lg:gap-24">
              <div className="w-full md:w-[50%] flex flex-col">
                <div className="img-container overflow-hidden mb-6 shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1541888086925-0c13d4f47c54?q=80&w=1200&auto=format&fit=crop" alt="Build" className="w-full aspect-[4/3] object-cover" />
                </div>
                <div className="flex justify-start md:pl-8">
                  <span className="about-text text-2xl md:text-3xl lg:text-4xl font-serif tracking-widest uppercase text-gray-900">We Build</span>
                </div>
              </div>
              
              <div className="w-full md:w-[50%] md:pt-24 lg:pt-32">
                <p className="about-text text-[17px] md:text-[19px] leading-[1.6] font-sans font-light text-gray-800">
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

      {/* Featured Projects Section */}
      <div id="projects" data-theme="light">
        <FeaturedProjects />
      </div>

      {/* Values Section */}
      <ValuesSection />

      {/* Portfolio Sections */}
      <div id="portfolio-categories" className="bg-[#c1bdae] pb-16 md:pb-24" data-theme="light">
        {categories.map((category) => (
          <PortfolioCategory 
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            projects={category.projects}
            onProjectClick={setSelectedProject}
          />
        ))}
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" data-theme="dark">
        <Testimonials />
      </div>

      {/* Team Section */}
      <div id="team" data-theme="dark">
        <TeamSection />
      </div>

      {/* Contact Form Section */}
      <div id="inquiry" data-theme="dark">
        <ContactForm />
      </div>

      {/* Footer Section */}
      <div id="contact" data-theme="light">
        <Footer />
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedProject(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors z-[210]"
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

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: introFinished ? 1 : 0, y: introFinished ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => scrollToSection('inquiry')}
        className={`fixed bottom-8 left-8 z-[150] mix-blend-difference text-white border border-white rounded-full px-6 py-3 font-sans font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 ${!introFinished ? 'pointer-events-none' : ''}`}
      >
        Start Your Project
      </motion.button>

    </div>
  );
}
