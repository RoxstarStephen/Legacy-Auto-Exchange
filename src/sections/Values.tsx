import React from 'react';
import { MapPin, FileText, CalendarCheck } from 'lucide-react';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';
import { MotionWrapper } from '../components/MotionWrapper';

export const Values: React.FC = () => {
  const pillars = [
    {
      id: 1,
      icon: MapPin,
      title: 'Tamil Nadu Market Insight',
      description: 'We don\'t use generic national algorithms. Our valuations are based on real-time demand in Chennai, Coimbatore, and across Tamil Nadu.',
      color: 'bg-indigo-500/10 text-indigo-600',
    },
    {
      id: 2,
      icon: FileText,
      title: 'Seamless Documentation',
      description: 'The sale isn\'t finished until the RC is transferred. We manage the entire documentation process with your local RTO.',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      id: 3,
      icon: CalendarCheck,
      title: 'A Pressure-Free Space',
      description: 'Legacy is built on respect, not urgency. Our valuations are valid for 7 days, giving you the time to make a grounded decision.',
      color: 'bg-violet-500/10 text-violet-600',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="values" className="bg-transparent py-24 lg:py-60 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center space-y-6 lg:space-y-8 mb-16 lg:mb-32">
          <div className="space-y-4 lg:space-y-6">
            <SplitText 
              text="Our Core Values" 
              className="text-4xl lg:text-7xl font-black text-slate-900 justify-center tracking-tighter"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-32 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full origin-center" 
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Built on principles of transparency, expertise, and absolute respect for your time.
            </motion.p>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 lg:gap-20"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.id} variants={item}>
                <MotionWrapper type="tilt" className="h-full">
                  <Card variant="glass" className="h-full p-8 lg:p-12 group hover:border-indigo-500/30 transition-all duration-700 rounded-[2rem] lg:rounded-[3rem]">
                    <div className="flex flex-col space-y-8 lg:space-y-10">
                      <div className={`relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 ${pillar.color} rounded-2xl lg:rounded-[2rem] group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-xl shadow-indigo-500/5`}>
                        <Icon size={32} strokeWidth={1.5} className="lg:hidden" />
                        <Icon size={40} strokeWidth={1.5} className="hidden lg:block" />
                        <motion.div 
                          className="absolute -inset-4 bg-inherit rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </MotionWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
