import React from 'react';
import { MapPin, FileText, CalendarCheck } from 'lucide-react';
import { Card } from '../components/Card';
import { motion } from 'framer-motion';

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
    <section id="values" className="bg-transparent py-28 lg:py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full mb-6" />
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
              Built on principles of transparency, expertise, and respect.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.id} variants={item}>
                <Card variant="glass" className="h-full group hover:border-indigo-500/30 transition-all duration-500">
                  <div className="flex flex-col space-y-6">
                    <div className={`relative inline-flex items-center justify-center w-16 h-16 ${pillar.color} rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <Icon size={32} strokeWidth={1.5} />
                      <motion.div 
                        className="absolute -inset-2 bg-inherit rounded-2xl blur-xl opacity-0 group-hover:opacity-40"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed opacity-80 group-hover:opacity-100">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
