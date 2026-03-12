import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "First Generation Homes proudly serves clients globally. While we have a strong presence in Chicago, IL and its surrounding suburbs, our operations span across three continents, providing premier custom construction and renovation services throughout the United States, Europe, and Africa."
  },
  {
    question: "Do you handle both residential construction and renovations?",
    answer: "Yes, we specialize in both custom residential construction from the ground up and comprehensive home renovations, including kitchen remodels, bathroom renovations, and structural upgrades."
  },
  {
    question: "How does the design and build process work?",
    answer: "Our process begins with an initial consultation to understand your vision. We then move into architectural design, followed by detailed planning, material selection, and finally, the construction phase. We manage the entire project to ensure a seamless experience."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. First Generation Homes is a fully licensed, bonded, and insured general contractor in the state of Illinois, ensuring your project is protected every step of the way."
  },
  {
    question: "How long does a typical custom home build take?",
    answer: "The timeline for a custom home build varies depending on the size and complexity of the project, but typically ranges from 10 to 18 months from the start of design to final completion."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#111] text-white" data-theme="dark">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-sans">
            Find answers to common questions about our custom home building and renovation services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-white/10 py-6"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none group"
              >
                <h3 
                  className="text-lg md:text-xl font-sans font-medium pr-8 group-hover:text-gray-300 transition-colors"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-gray-400 group-hover:text-white transition-colors">
                  {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <div className="pt-4 pb-2 text-gray-400 font-sans leading-relaxed" itemProp="text">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
