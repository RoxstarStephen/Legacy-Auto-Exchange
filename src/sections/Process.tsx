import React from 'react';
import { Car, BarChart3, Handshake } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Card } from '../components/Card';

export const Process: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Car,
      title: 'Share Basic Details',
      description: 'Tell us about your car—model, year, mileage, and condition—through our simple request.',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Get a Fair Estimate',
      description: 'We analyze current Tamil Nadu market data to provide you with a transparent, researched price range.',
      color: 'bg-indigo-500/10 text-indigo-600',
    },
    {
      id: 3,
      icon: Handshake,
      title: 'Respectful Handover',
      description: 'Finalize the sale at your convenience, with complete transparency and immediate payment upon verification.',
      color: 'bg-purple-500/10 text-purple-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section id="process" className="bg-transparent py-28 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">The Simple Path</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full mb-6" />
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Three straightforward steps to a fair, transparent sale of your vehicle.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Animated connector lines */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-px overflow-hidden">
            <motion.div 
              className="w-full h-full bg-gradient-to-r from-indigo-500/20 via-indigo-500 to-indigo-500/20"
              style={{ scaleX: pathLength, originX: 0 }}
            />
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.id} variants={item} className="relative z-10">
                  <Card variant="glass" className="h-full group hover:border-indigo-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
                    <div className="flex flex-col space-y-8">
                      <div className={`relative inline-flex items-center justify-center w-20 h-20 ${step.color} rounded-3xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <Icon size={36} strokeWidth={1.5} />
                        <div className="absolute -inset-2 bg-inherit rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-indigo-600/50 uppercase tracking-widest">Step 0{step.id}</span>
                          <div className="flex-grow h-px bg-indigo-100/50" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-base text-slate-600 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
