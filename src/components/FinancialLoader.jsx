import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Bot, Quote } from 'lucide-react';

const FINANCIAL_QUOTES = [
  { text: "Do not save what is left after spending, but spend what is left after saving.", author: "Warren Buffett" },
  { text: "Compound interest is the eighth wonder of the world. He who understands it, earns it.", author: "Albert Einstein" },
  { text: "Beware of little expenses. A small leak will sink a great ship.", author: "Benjamin Franklin" },
  { text: "The rich buy assets. The poor only have expenses.", author: "Robert Kiyosaki" },
  { text: "Price is what you pay. Value is what you get.", author: "Warren Buffett" },
  { text: "A budget is telling your money where to go instead of wondering where it went.", author: "Dave Ramsey" },
  { text: "Time in the market beats timing the market.", author: "Ken Fisher" },
  { text: "You must gain control over your money or the lack of it will forever control you.", author: "Dave Ramsey" }
];

export default function FinancialLoader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random() * FINANCIAL_QUOTES.length));

  // --- ANIMATION: SPINNER & PROGRESS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Orbital Rings
      gsap.to(".spinner-ring-1", { rotation: 360, duration: 3, repeat: -1, ease: "linear" });
      gsap.to(".spinner-ring-2", { rotation: -360, duration: 5, repeat: -1, ease: "linear" });
      
      // 2. Pulse Core
      gsap.to(".core-pulse", { scale: 1.2, opacity: 0.8, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" });

      // 3. Fake Progress Bar
      gsap.fromTo(barRef.current, 
        { width: "0%" }, 
        { width: "90%", duration: 5, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- ANIMATION: TEXT CYCLER ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade Out
      gsap.to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setQuoteIndex((prev) => (prev + 1) % FINANCIAL_QUOTES.length);
          // Reset position & Fade In
          gsap.fromTo(textRef.current, 
            { y: 20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = FINANCIAL_QUOTES[quoteIndex];

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center py-20 min-h-[450px]">
      
      {/* 1. ARCHITECTURAL SPINNER */}
      <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
        <div className="spinner-ring-1 absolute inset-0 rounded-full border-[3px] border-emerald-500/30 border-t-emerald-400"></div>
        <div className="spinner-ring-2 absolute inset-2 rounded-full border-[3px] border-emerald-900/50 border-b-emerald-600"></div>
        <div className="core-pulse relative z-10 bg-emerald-500/20 p-3 rounded-full shadow-[0_0_15px_#10B981]">
          <Bot size={32} className="text-emerald-400" />
        </div>
      </div>

      {/* 2. LOADING STATUS & PROGRESS */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-6 relative">
        <div ref={barRef} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
      </div>

      <div className="text-center space-y-2 mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight">Architecting Your Wealth</h3>
        <p className="text-xs font-mono text-emerald-500 uppercase tracking-widest animate-pulse">
          Simulating 10-Year Roadmap...
        </p>
      </div>

      {/* 3. MOTIVATIONAL QUOTE CONTAINER */}
      <div className="max-w-md w-full px-6 relative">
        <Quote size={40} className="absolute -top-4 -left-2 text-emerald-900/40 fill-emerald-900/20" />
        
        {/* FIX: Fixed height container (h-36) + Flex Center + Overflow Hidden */}
        <div className="h-36 flex flex-col justify-center items-center overflow-hidden">
          <div ref={textRef} className="text-center">
            <p className="text-lg font-medium text-gray-300 italic mb-3 leading-relaxed">
              "{currentQuote.text}"
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-8 bg-emerald-500/50"></div>
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                {currentQuote.author}
              </span>
              <div className="h-[1px] w-8 bg-emerald-500/50"></div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}