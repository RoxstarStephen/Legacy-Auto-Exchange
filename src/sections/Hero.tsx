import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '../components/Button';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onRequestValuation?: (id?: string) => void;
}

const StatCounter: React.FC<{ value: number; label: string; suffix?: string }> = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <div className="flex flex-col">
      <div className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{label}</div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onRequestValuation }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothMouseX, [0, 1920], [-20, 20]);
  const bgY = useTransform(smoothMouseY, [0, 1080], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const headline = "A dignified way to sell your car in Tamil Nadu.";
  
  return (
    <section onMouseMove={handleMouseMove} className="relative bg-transparent overflow-hidden min-h-[90vh] flex items-center">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 -z-20 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-200/30 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-28 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col space-y-10 relative z-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/50 backdrop-blur-md border border-indigo-100 rounded-full shadow-sm"
              >
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest leading-none">Premium Auto Exchange</span>
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
                {headline.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium"
              >
                Moving on from a vehicle shouldn't involve endless haggling. We provide market-accurate valuations centered on transparency.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4"
            >
              <Button
                onClick={onRequestValuation}
                size="lg"
                variant="primary"
                showGlow
                className="group"
              >
                Request a Valuation
                <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onRequestValuation?.('process')}
                className="group border border-slate-200"
              >
                How it works
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="grid grid-cols-3 gap-8 pt-12 border-t border-slate-200/60"
            >
              <div className="group cursor-default"><StatCounter value={500} label="Happy Owners" suffix="+" /></div>
              <div className="group cursor-default"><StatCounter value={98} label="Trust Score" suffix="%" /></div>
              <div className="group cursor-default"><StatCounter value={12} label="Cities in TN" /></div>
            </motion.div>
          </div>

          <motion.div 
            style={{ y: y1, x: bgX, rotateY: bgY }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="absolute -inset-16 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[100px] -z-10 animate-pulse-slow" />
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="relative rounded-[2.5rem] overflow-hidden glass p-5 shadow-2xl border-white/40"
            >
              <img
                src="/src/assets/premium_car_hero.png"
                alt="Premium Car"
                className="rounded-[2rem] shadow-2xl object-cover w-full h-[650px] scale-105 hover:scale-110 transition-transform duration-[2s]"
              />
            </motion.div>
          </motion.div>          
        </div>
      </div>

    </section>
  );
};
