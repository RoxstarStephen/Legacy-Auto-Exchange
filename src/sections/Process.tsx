import React, { useRef } from 'react';
import { Search, ClipboardCheck, Wallet, FileCheck, LucideIcon } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { SplitText } from '../components/SplitText';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Digital Consultation',
    description: 'Begin with a market-based valuation through our professional portal. No generic estimates—just data-driven insights.',
    icon: Search,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Physical Verification',
    description: 'Our consultants visit you at your convenience. A respectful 30-minute inspection to confirm vehicle condition.',
    icon: ClipboardCheck,
    color: 'from-indigo-600 to-violet-600',
  },
  {
    id: 3,
    title: 'Settlement',
    description: 'Immediate document handover and digital payment. No waiting, no uncertainty. A clean, rapid closure.',
    icon: Wallet,
    color: 'from-violet-600 to-purple-600',
  },
  {
    id: 4,
    title: 'RC Transfer',
    description: 'We handle the complete RTO documentation flow. Full legal liability transfer with real-time status updates.',
    icon: FileCheck,
    color: 'from-purple-600 to-fuchsia-600',
  },
];

const StepIndicator: React.FC<{ step: Step; index: number; progress: MotionValue<number>; total: number }> = ({ step, index, progress, total }) => {
  const transitions = total - 1;
  const domain = Array.from({ length: total }).map((_, i) => i / transitions);
  
  let indicatorDomain, indicatorActiveY;
  if (index === 0) {
    indicatorDomain = [0, 1];
    indicatorActiveY = [1, 1];
  } else {
    indicatorDomain = [(index - 1) / transitions, index / transitions];
    indicatorActiveY = [0, 1];
  }
  const activeY = useTransform(progress, indicatorDomain, indicatorActiveY);
  
  const colorValues: string[] = domain.map((_, i) => {
    if (i === index) return 'rgba(79, 70, 229, 1)'; // indigo-600
    if (i < index) return 'rgba(79, 70, 229, 0.4)'; // past
    return 'rgba(148, 163, 184, 1)'; // future (slate-400)
  });
  const color = useTransform(progress, domain, colorValues);
  
  const scaleValues: number[] = domain.map((_, i) => (i === index ? 1.1 : 1.0));
  const scale = useSpring(useTransform(progress, domain, scaleValues), { stiffness: 400, damping: 30 });

  return (
    <motion.div style={{ scale }} className="flex items-center space-x-6 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black relative overflow-hidden transition-colors duration-300">
        <span className="relative z-10 mix-blend-difference text-white">0{step.id}</span>
        <motion.div className="absolute inset-0 bg-indigo-600 origin-bottom" style={{ scaleY: activeY }} />
      </div>
      <motion.h4 className="text-lg font-black uppercase tracking-widest" style={{ color }}>
        {step.title}
      </motion.h4>
    </motion.div>
  );
};

const StepCard: React.FC<{ step: Step; index: number; progress: MotionValue<number>; total: number }> = ({ step, index, progress, total }) => {
  const transitions = total - 1;
  const domain = Array.from({ length: total }).map((_, i) => i / transitions);
  
  const yValues: number[] = domain.map((_, i) => {
    if (i < index) return 400; // Slide up from below
    return 0; // Stays at 0 when active and afterwards
  });

  const opacityValues: number[] = domain.map((_, i) => {
    if (i < index) return 0; // Wait to appear
    if (i === index) return 1; // Fully visible
    return Math.max(0, 1 - (i - index) * 0.4); // Darken as it gets covered
  });

  const scaleValues: number[] = domain.map((_, i) => {
    if (i < index) return 1;
    if (i === index) return 1;
    return 1 - (i - index) * 0.05; // Scale down slightly when covered
  });

  const y = useSpring(useTransform(progress, domain, yValues), { stiffness: 100, damping: 20 });
  const opacity = useTransform(progress, domain, opacityValues);
  const scale = useTransform(progress, domain, scaleValues);
  
  const Icon = step.icon;

  return (
    <motion.div
      style={{ opacity, y, scale, zIndex: index + 1 }}
      className="absolute inset-0 flex flex-col justify-center p-16 bg-white rounded-[4rem] shadow-[-20px_40px_80px_rgba(0,0,0,0.08)] border border-slate-100/50"
    >
      <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-2xl shadow-indigo-500/10`}>
        <Icon size={48} strokeWidth={1.2} />
      </div>
      <div className="space-y-6">
        <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{step.title}</h3>
        <p className="text-2xl text-slate-500 leading-relaxed font-medium">{step.description}</p>
      </div>
    </motion.div>
  );
};

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="process" ref={containerRef} className="relative min-h-[400vh] bg-transparent pb-32">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <motion.h2 style={{ scale: bgScale, opacity: bgOpacity }} className="text-[30vw] font-black tracking-tighter">
            LEGACY
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-16">
              <div className="space-y-6">
                <SplitText text="The Legacy Process" className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter" />
                <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                  Four steps to a professional, grounded, and seamless vehicle transition.
                </p>
              </div>

              <div className="space-y-8 max-w-md">
                {steps.map((step, i) => (
                  <StepIndicator key={step.id} step={step} index={i} progress={scrollYProgress} total={steps.length} />
                ))}
              </div>
            </div>

            <div className="relative h-[600px] flex items-center perspective-2000">
              {steps.map((step, i) => (
                <StepCard key={step.id} step={step} index={i} progress={scrollYProgress} total={steps.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
