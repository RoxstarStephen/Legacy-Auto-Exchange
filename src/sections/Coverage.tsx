import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveMap } from '../components/InteractiveMap';
import { SplitText } from '../components/SplitText';
import { MapPin, Shield, Zap } from 'lucide-react';

export const Coverage: React.FC = () => {
  return (
    <section id="coverage" className="py-32 lg:py-48 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600">
                <MapPin size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Service Coverage</span>
              </div>
              <SplitText 
                text="Tamil Nadu's Most Trusted Network" 
                className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]"
              />
              <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                From Chennai to Madurai, we provide on-site verification and instant settlement across 12+ major cities.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900">45-Min Arrival</h3>
                <p className="text-slate-500 font-medium">Rapid response team available in all Tier-1 cities for immediate inspection.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Legal Transfer</h3>
                <p className="text-slate-500 font-medium">Complete document management handled by local RTO experts in your city.</p>
              </motion.div>
            </div>
          </div>

          <div className="relative max-w-full overflow-hidden">
            <InteractiveMap />
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
