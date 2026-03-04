import AppLayout from '@/layouts/app-layout';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumed shadcn utility function

function Faq() {
  // Translate FAQ questions and answers to English (based on images 0 and 5)
  const faqData = [
    {
      question: "Where can I find the game download links?",
      answer: "All download links and access keys are provided within the 'Products' section for community members. Make sure you are signed in."
    },
    {
      question: "Which devices are compatible?",
      answer: "Our games and emulators support a wide range of platforms including Windows 10/11, macOS, Linux, and modern Android devices."
    },
    {
      question: "Are the games and emulators free-to-play?",
      answer: "Yes, our core community titles and emulators are completely free-to-play. Supporting us is optional, with no pay-to-win elements."
    },
    {
      question: "How do I create a new account?",
      answer: "Simply click the 'Sign Up' button in the top navigation bar. You will need a valid email and a username to join the Quantum Bug community."
    }
  ];

  return (
    <AppLayout>
      <div className="w-full max-w-4xl mx-auto py-10 px-4">
        
        {/* --- Header Section (Anaglyph Glitch Effect) --- */}
        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-widest relative inline-block"
            // The textShadow trick creates the cyan/magenta separation seen in your title reference.
            style={{ textShadow: '3px 0px 0px #2FF4EE, -3px 0px 0px #D130F2' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 mt-4 font-medium italic">
            All the answers you need about our studio, products, and community.
          </p>
        </div>

        {/* --- FAQ List (shaden/ui Accordion) --- */}
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              // Thin, semi-transparent divider line between items
              className="border-b border-white/10"
            >
              <AccordionTrigger 
                // [&>svg]:hidden is crucial to hide the default shadcn chevron arrow
                className="text-left text-lg md:text-xl font-bold dark:text-gray-300 text-gray-800 hover:text-gray-600 dark:hover:text-white hover:no-underline py-6 [&>svg]:hidden group"
              >
                <span className="flex-grow">{item.question}</span>
                <div className="flex items-center justify-center p-2 rounded-full h-10 w-10 bg-qb-dark/50 border border-white/10">
                  <Plus 
                    className={cn(
                      "h-6 w-6 text-gray-400 shrink-0 transition-all duration-500",
                      "group-data-[state=open]:rotate-45 group-data-[state=open]:text-qb-cyan"
                    )} 
                  />
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="dark:text-gray-400 text-gray-800 text-base md:text-lg pb-8 leading-relaxed font-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* --- Help Section at Bottom (Translated) --- */}
        <div className="mt-20 pt-10 border-t border-white/5 dark:border-white/10 text-center">
            <p className="text-qb-blue font-black uppercase tracking-widest text-xs mb-2">Still need help?</p>
            <p className="dark:text-gray-500 text-gray-800 text-sm mb-6 italic">If you can't find your answer here, feel free to contact our technical support team.</p>
            <a 
              href="/support" 
              className="inline-block bg-white dark:bg-black text-qb-gray dark:text-qb-blue px-12 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:bg-qb-cyan transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(47,244,238,0.3)] group"
            >
               Contact Support <span className="text-qb-blue group-hover:translate-x-1 inline-block transition-transform">-&gt;</span>
            </a>
        </div>
      </div>
    </AppLayout>
  );
}

export default Faq;