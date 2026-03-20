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
    <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-indigo-50/30 rounded-[3rem] overflow-hidden p-6 sm:p-12 border border-indigo-100/50 shadow-inner">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[15rem] font-bold text-indigo-500/5 rotate-[-20deg]">TN</span>
      </div>
      
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 drop-shadow-2xl"
        style={{ overflow: 'hidden' }}
      >
        {/* Shift the whole map content up slightly to avoid clipping. */}
        <g transform="translate(0 -6)">
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
              {/* Use pure SVG text so it respects the parent `overflow-hidden` on mobile. */}
              <text
                x={city.x + 3}
                y={city.y - 4}
                fontSize="3"
                fontWeight="900"
                fill="rgb(15, 23, 42)"
                style={{ letterSpacing: '0.4px' }}
                transform={`rotate(-2 ${city.x + 3} ${city.y - 4})`}
              >
                {city.name.toUpperCase()}
              </text>
              <text
                x={city.x + 3}
                y={city.y + 2}
                fontSize="2.6"
                fontWeight="800"
                fill="rgb(79, 70, 229)"
              >
                {city.count} Live
              </text>
            </motion.g>
          ))}
        </g>
      </svg>
      
      <div className="absolute bottom-4 left-4 right-4 p-4 sm:p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-xl z-20 flex items-center justify-between">
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
