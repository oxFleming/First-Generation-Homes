import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo('.contact-fade-up',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
    );

    // Add scroll friction (pinning)
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=500', // Pins for 500px of scroll to create friction
      pin: true,
      pinSpacing: true,
    });
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} className="bg-[#0a0a0a] text-white h-screen w-full flex items-center pt-20 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left Column */}
        <div className="flex flex-col justify-center lg:col-span-4">
          <div className="contact-fade-up">
            <span className="text-[#E53935] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-4 block">
              Inquiry
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] mb-4">
              Start Your<br />Project
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm font-light mb-8">
              We collaborate with clients who value distinctiveness and sustainability. Tell us about your vision, and let's determine if First Generation Homes is the right partner for your journey.
            </p>
            <div className="w-full max-w-sm h-px bg-white/10 mb-8"></div>
            
            <div className="flex flex-col gap-3">
              <h3 className="text-gray-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1">Process</h3>
              <ul className="flex flex-col gap-3">
                {['Initial Consultation', 'Feasibility Study', 'Concept Design', 'Detailed Documentation'].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]"></span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex flex-col justify-center contact-fade-up lg:col-span-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Full Name</label>
              <input 
                type="text" 
                placeholder="Jane Doe" 
                className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E53935] transition-colors w-full"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com" 
                className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E53935] transition-colors w-full"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+1 234..." 
                className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E53935] transition-colors w-full"
              />
            </div>

            {/* Project Location */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Project Location</label>
              <input 
                type="text" 
                placeholder="e.g. Chicago, IL" 
                className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E53935] transition-colors w-full"
              />
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Project Type</label>
              <select defaultValue="" className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors w-full appearance-none cursor-pointer">
                <option value="" disabled className="text-gray-600">Select Type</option>
                <option value="custom-residential">Custom Residential Construction</option>
                <option value="home-renovation">Home Renovation & Property Modernization</option>
                <option value="building-development">Building Development & Real Estate Projects</option>
                <option value="construction-materials">Construction Materials & Finishing Products</option>
                <option value="undetermined">Undetermined</option>
              </select>
            </div>

            {/* Expected Timeline */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Expected Timeline</label>
              <select defaultValue="" className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E53935] transition-colors w-full appearance-none cursor-pointer">
                <option value="" disabled className="text-gray-600">Select Timeline</option>
                <option value="immediately">Immediately</option>
                <option value="1-3-months">1-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6-plus-months">6+ Months</option>
              </select>
            </div>

            {/* Project Description */}
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">Project Description</label>
              <textarea 
                rows={3}
                placeholder="Tell us about the site, the vision, and any specific requirements..." 
                className="bg-[#141414] border border-white/10 rounded-md px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#E53935] transition-colors w-full resize-none"
              ></textarea>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:col-span-2 mt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#E53935] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs py-3.5 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-red-700 transition-colors w-full sm:w-auto"
              >
                Send Inquiry <Send size={14} />
              </motion.button>
              
              <span className="text-gray-500 text-[9px] md:text-[10px] font-mono uppercase tracking-widest">OR</span>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#25D366] text-white font-bold uppercase tracking-widest text-[10px] md:text-xs py-3.5 px-6 rounded-md flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors w-full sm:w-auto shadow-lg shadow-[#25D366]/20"
              >
                Chat with us on WhatsApp <MessageCircle size={14} />
              </motion.button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
