import { useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { Values } from './sections/Values';
import { ValuationForm } from './sections/ValuationForm';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';

const MouseTrail = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
    >
      <motion.div 
        className="w-8 h-8 rounded-full bg-indigo-500/10 blur-xl absolute -left-4 -top-4"
        style={{ x: smoothX, y: smoothY }}
      />
      <motion.div 
        className="w-2 h-2 rounded-full bg-indigo-600/20 absolute -left-1 -top-1"
        style={{ x: smoothX, y: smoothY }}
      />
    </motion.div>
  );
};

const BackgroundEffects = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-slate-50">
      <MouseTrail />
      
      {/* Animated Blobs */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply"
      />
      <motion.div
        style={{ y: y2, rotate: -rotate }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-200/40 rounded-full blur-[140px] mix-blend-multiply"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[100px] mix-blend-multiply"
      />

      {/* Decorative Geometric Shapes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            whileInView={{ 
              opacity: [0, 0.3, 0],
              y: [0, -20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className={`absolute w-${Math.floor(Math.random() * 4) + 1} h-${Math.floor(Math.random() * 4) + 1} border border-indigo-500/20 rounded-sm`}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-100 selection:text-indigo-900 bg-grain">
      <BackgroundEffects />
      <Header onNavigate={scrollTo} />
      <main className="relative">
        <Hero onRequestValuation={() => scrollTo('contact')} />
        <Process />
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
