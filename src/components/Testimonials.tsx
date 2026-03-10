import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    text: "We truly appreciate your commitment on this project. I wanted to acknowledge the satisfaction on our remodel. I must give a 100% satisfied mark as you not only finished the job early and under budget, but with great sub-contractors and excellent workmanship. The job was done very efficiently and timely.",
    author: "Raja Bilal",
    title: "CEO Focus with Raja"
  },
  {
    id: 2,
    text: "Our experience with First Generation Homes LLC, was marked by high integrity, good quality, and high value work. Because of the cooperation and sensitivity of First Generation Homes LLC, we were able to continue our entire renovation during the construction period. First Generation Homes LLC, began our renovation by providing a very competitive bid; demonstrating a willingness to work through options; and accepting a challenging schedule.",
    author: "Julius A",
    title: "CEO Leadway Pharmacy"
  }
];

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section 
      ref={containerRef}
      className="relative py-16 md:py-24 bg-zinc-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6">
            What our clients are saying
          </h2>
          <div className="w-24 h-1 bg-white/20 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white/5 rounded-3xl transform -rotate-1 group-hover:rotate-1 transition-transform duration-500 ease-out" />
              <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl h-full flex flex-col">
                <Quote className="w-8 h-8 text-white/20 mb-4" />
                
                <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6 flex-grow font-sans font-light">
                  "{testimonial.text}"
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-serif text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base">{testimonial.author}</h4>
                    <p className="text-zinc-500 text-xs">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
