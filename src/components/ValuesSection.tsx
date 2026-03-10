import React from 'react';
import { ArrowDown } from 'lucide-react';

export function ValuesSection() {
  return (
    <>
      <section className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop")' }}
        >
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
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
      <section className="w-full bg-[#c1bdae] px-6 md:px-12 py-16 md:py-24 text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight max-w-4xl mb-12">
            From transparent communication to flawless execution, we are committed to building absolute trust alongside every legacy home we deliver.
          </p>
          
          <button className="group flex items-center border border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors duration-300">
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
