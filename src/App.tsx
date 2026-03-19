import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { Coverage } from './sections/Coverage';
import { Values } from './sections/Values';
import { ValuationForm } from './sections/ValuationForm';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { Cursor } from './components/Cursor';
import { ActivityTicker } from './components/ActivityTicker';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

const Particle: React.FC<{
  p: { top: string; left: string; size: number; delay: number; duration: number; yOffset: number };
  scrollYProgress: MotionValue<number>;
}> = ({ p, scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, p.yOffset]);

  return (
    <motion.div
      style={{
        top: p.top,
        left: p.left,
        y: y
      }}
      animate={{
        opacity: [0, 0.2, 0],
        scale: [0.5, 1, 0.5]
      }}
      transition={{
        duration: p.duration,
        repeat: Infinity,
        ease: "linear",
        delay: p.delay
      }}
      className="absolute border border-indigo-400/20 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.1)] w-4 h-4"
    />
  );
};

const BackgroundEffects = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  // Static positions for particles to avoid re-renders with Math.random
  const particles = useRef([...Array(15)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.floor(Math.random() * 3) + 2,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    yOffset: (Math.random() - 0.5) * 800
  }))).current;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-50">
      <motion.div 
        style={{ opacity: 0.03 }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-[-15%] left-[-10%] w-[800px] h-[800px] bg-indigo-200/30 rounded-full blur-[120px] mix-blend-multiply"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-purple-200/30 rounded-full blur-[140px] mix-blend-multiply"
      />
      
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <Particle key={i} p={p} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
};

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-indigo-100 selection:text-indigo-900 relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      ` }} />
      <Cursor />
      <BackgroundEffects />
      <Header onNavigate={scrollTo} />
      <ActivityTicker />
      <main className="relative">
        <Hero />
        <Process />
        <Coverage />
        <Values />
        <Testimonials />
        <ValuationForm />
        <FAQ />
      </main>
      <Footer onNavigate={scrollTo} />
    </div>
  );
}

export default App;
