import React, { useRef, useState } from 'react';
import { Search, ClipboardCheck, Wallet, FileCheck, LucideIcon } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
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
    description:
      'Begin with a market-based valuation through our professional portal. No generic estimates—just data-driven insights.',
    icon: Search,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    title: 'Physical Verification',
    description:
      'Our consultants visit you at your convenience. A respectful 30-minute inspection to confirm vehicle condition.',
    icon: ClipboardCheck,
    color: 'from-indigo-600 to-violet-600',
  },
  {
    id: 3,
    title: 'Settlement',
    description:
      'Immediate document handover and digital payment. No waiting, no uncertainty. A clean, rapid closure.',
    icon: Wallet,
    color: 'from-violet-600 to-purple-600',
  },
  {
    id: 4,
    title: 'RC Transfer',
    description:
      'We handle the complete RTO documentation flow. Full legal liability transfer with real-time status updates.',
    icon: FileCheck,
    color: 'from-purple-600 to-fuchsia-600',
  },
];

// ─── Step Indicator (sidebar) ────────────────────────────────────────────────
const StepIndicator: React.FC<{
  step: Step;
  isActive: boolean;
  isPast: boolean;
}> = ({ step, isActive, isPast }) => {
  return (
    <div className="flex items-center space-x-6 cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black relative overflow-hidden">
        <span className="relative z-10 mix-blend-difference text-white">
          0{step.id}
        </span>
        <motion.div
          className="absolute inset-0 bg-indigo-600 origin-bottom"
          animate={{ scaleY: isActive || isPast ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.h4
        className="text-lg font-black uppercase tracking-widest"
        animate={{
          color: isActive
            ? 'rgba(79,70,229,1)'
            : isPast
            ? 'rgba(79,70,229,0.45)'
            : 'rgba(148,163,184,1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {step.title}
      </motion.h4>
    </div>
  );
};

// ─── Step Card ───────────────────────────────────────────────────────────────
// direction: 1 = scrolling forward (next), -1 = scrolling backward (prev)
const StepCard: React.FC<{
  step: Step;
  direction: number;
}> = ({ step, direction }) => {
  const Icon = step.icon;

  const enterY  = direction >= 0 ? 40  : -40;
  const exitY   = direction >= 0 ? -30 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: enterY, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,     scale: 1    }}
      exit   ={{ opacity: 0, y: exitY,  scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      // Improves perceived smoothness during frequent card swaps on mobile.
      style={{ willChange: 'transform, opacity' }}
      className="absolute inset-0 flex flex-col justify-center p-8 lg:p-16 bg-white rounded-[2rem] lg:rounded-[4rem] shadow-[-10px_20px_40px_rgba(0,0,0,0.07)] lg:shadow-[-20px_40px_80px_rgba(0,0,0,0.09)] border border-slate-100/60"
    >
      <div
        className={`w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br ${step.color} rounded-2xl lg:rounded-[2rem] flex items-center justify-center text-white mb-6 lg:mb-10 shadow-2xl shadow-indigo-500/30`}
      >
        <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1.2} />
      </div>
      <div className="space-y-4 lg:space-y-6">
        <h3 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tighter">
          {step.title}
        </h3>
        <p className="text-lg lg:text-2xl text-slate-500 leading-relaxed font-medium">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Process Section ─────────────────────────────────────────────────────────
export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState(1); // 1 = forward, -1 = backward

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const lastIndexRef = useRef(0);
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const next = Math.min(steps.length - 1, Math.floor(latest * steps.length));
    if (next !== lastIndexRef.current) {
      setDirection(next > lastIndexRef.current ? 1 : -1);
      setActiveIndex(next);
      lastIndexRef.current = next;
    }
  });

  return (
    <section id="process" ref={containerRef} className="relative min-h-[400svh] pb-32">
      <div className="sticky top-0 h-[100svh] flex flex-col justify-center overflow-hidden">

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
          <h2 className="text-[30vw] font-black tracking-tighter text-slate-900">
            LEGACY
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left: heading + step list */}
            <div className="space-y-10 lg:space-y-16">
              <div className="space-y-4 lg:space-y-6">
                <SplitText
                  text="The Legacy Process"
                  className="text-4xl lg:text-8xl font-black text-slate-900 tracking-tighter"
                />
                <p className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                  Four steps to a professional, grounded, and seamless vehicle transition.
                </p>
              </div>

              <div className="hidden lg:flex flex-col space-y-8 max-w-md">
                {steps.map((step, i) => (
                  <StepIndicator
                    key={step.id}
                    step={step}
                    isActive={i === activeIndex}
                    isPast={i < activeIndex}
                  />
                ))}
              </div>
            </div>

            {/* Right: animated card swap */}
            <div className="relative h-[450px] lg:h-[600px]">
              {/*
                mode="sync": new card enters immediately without waiting for
                the exit animation to finish. This prevents cards from being
                skipped on fast scroll — the enter is never blocked.
              */}
              <AnimatePresence mode="sync" custom={direction}>
                <StepCard
                  key={activeIndex}
                  step={steps[activeIndex]}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
