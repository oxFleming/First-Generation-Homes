import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    step: "01",
    title: "We Envision",
    text: "Every great legacy begins as a fleeting thought. We collaborate closely to uncover the core of your vision, transforming abstract ideas into a concrete, strategic roadmap for your future home.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&h=1200&auto=format&fit=crop"
  },
  {
    step: "02",
    title: "We Design",
    text: "With the destination clear, we craft the journey. Our design process merges aesthetics with deep empathy, creating intuitive spaces that feel both inevitable and extraordinary.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&h=1200&auto=format&fit=crop"
  },
  {
    step: "03",
    title: "We Build",
    text: "We breathe life into the blueprint. Using meticulous craftsmanship and uncompromising standards, we forge robust, beautiful structures designed to last for generations.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&h=1200&auto=format&fit=crop"
  }
];

export function StoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Set initial states
    gsap.set(cardsRef.current, { 
      transformOrigin: "center bottom",
      yPercent: (i) => i === 0 ? 0 : 150,
      rotation: (i) => i === 0 ? 0 : (i === 1 ? 5 : -5),
      scale: 1,
      opacity: 1
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 300% of viewport height for scrolling duration
        scrub: 1,
        pin: true,
      }
    });

    // Animate Card 1 out, Card 2 in
    tl.to(cardsRef.current[0], { scale: 0.9, opacity: 0.5, duration: 1, ease: "power2.inOut" }, 0)
      .to(cardsRef.current[1], { yPercent: 0, rotation: -2, duration: 1, ease: "power2.out" }, 0);

    // Animate Card 2 out, Card 3 in
    tl.to(cardsRef.current[1], { scale: 0.95, opacity: 0.5, duration: 1, ease: "power2.inOut" }, 1)
      .to(cardsRef.current[2], { yPercent: 0, rotation: 2, duration: 1, ease: "power2.out" }, 1);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#fafafa] overflow-hidden flex items-center justify-center" data-theme="light">
      {/* Background Title */}
      <div className="absolute top-12 md:top-24 w-full flex justify-center pointer-events-none z-0">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight text-gray-900/10">
          At First Generation Homes
        </h3>
      </div>

      {cards.map((card, index) => (
        <div
          key={index}
          ref={el => cardsRef.current[index] = el}
          className="absolute w-[85vw] max-w-[420px] aspect-[3/4] bg-[#fdfdfc] p-6 md:p-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border border-[#e5e5e5] rounded-sm"
          style={{ zIndex: index + 10 }}
        >
          {/* Background Number */}
          <div className="absolute top-4 right-6 text-6xl md:text-7xl font-serif text-gray-100 font-bold z-0 pointer-events-none select-none">
            {card.step}
          </div>

          <div className="w-full h-[55%] relative mb-6 overflow-hidden bg-gray-100 shadow-inner z-10">
            <img 
              src={card.image} 
              alt={card.title} 
              className="absolute inset-0 w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="flex flex-col gap-4 flex-1 justify-center z-10">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono text-gray-400">{card.step}</span>
              <h3 className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-gray-900">
                {card.title}
              </h3>
            </div>
            <p className="text-sm md:text-base font-sans font-light text-gray-600 leading-relaxed">
              {card.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
