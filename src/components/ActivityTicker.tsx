import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, TrendingUp, Users } from 'lucide-react';

const activities = [
  { id: 1, text: "New valuation request from Chennai", icon: Zap, color: "text-amber-500" },
  { id: 2, text: "Car inspection completed in Coimbatore", icon: ShieldCheck, color: "text-emerald-500" },
  { id: 3, text: "Verified transfer in Madurai", icon: TrendingUp, color: "text-indigo-500" },
  { id: 4, text: "RC Transfer finalized in Trichy", icon: Users, color: "text-violet-500" },
  { id: 5, text: "Premium sedan sold in Salem", icon: Zap, color: "text-rose-500" },
];

export const ActivityTicker: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 py-3 overflow-hidden whitespace-nowrap border-y border-slate-800 relative z-[60]">
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1000] }}
        transition={{ 
          duration: 30, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {[...activities, ...activities].map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={`${activity.id}-${index}`} className="inline-flex items-center mx-12">
              <Icon className={`w-4 h-4 mr-3 ${activity.color}`} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {activity.text}
              </span>
              <div className="w-1 h-1 bg-slate-700 rounded-full ml-12" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
