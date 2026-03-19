import React from 'react';
import { motion } from 'framer-motion';

const cities = [
  { name: 'Chennai', x: 80, y: 20, count: 142 },
  { name: 'Coimbatore', x: 20, y: 60, count: 89 },
  { name: 'Madurai', x: 45, y: 75, count: 64 },
  { name: 'Salem', x: 40, y: 45, count: 52 },
  { name: 'Trichy', x: 55, y: 60, count: 47 },
];

export const InteractiveMap: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-indigo-50/30 rounded-[3rem] p-12 border border-indigo-100/50 shadow-inner">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[15rem] font-bold text-indigo-500/5 rotate-[-20deg]">TN</span>
      </div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-2xl">
        {/* Simplified TN Shape */}
        <motion.path
          d="M30 15 L85 10 L90 40 L70 85 L40 95 L15 75 L10 40 Z"
          fill="rgba(79, 70, 229, 0.05)"
          stroke="rgba(79, 70, 229, 0.2)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {cities.map((city, index) => (
          <motion.g
            key={city.name}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="cursor-pointer group"
          >
            <circle
              cx={city.x}
              cy={city.y}
              r="2"
              className="fill-indigo-600 animate-pulse"
            />
            <circle
              cx={city.x}
              cy={city.y}
              r="6"
              className="fill-indigo-500/10 group-hover:fill-indigo-500/20 transition-colors"
            />
            <foreignObject x={city.x + 3} y={city.y - 5} width="80" height="20">
              <div className="flex flex-col">
                <span className="text-[4px] font-black uppercase tracking-widest text-slate-900">{city.name}</span>
                <span className="text-[3px] font-bold text-indigo-600">{city.count} Live</span>
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
      
      <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-white shadow-xl flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Regional Reach</p>
          <p className="text-sm font-black text-slate-900">Tamil Nadu Network</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-indigo-600">12+</p>
          <p className="text-[8px] font-bold text-slate-400">OPERATIONAL CITIES</p>
        </div>
      </div>
    </div>
  );
};
