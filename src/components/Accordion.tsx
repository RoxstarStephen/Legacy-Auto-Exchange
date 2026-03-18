import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="glass border border-white/20 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-8 py-5 flex items-center justify-between text-left group"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {item.question}
            </h3>
            <motion.div
              animate={{ rotate: expandedId === item.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 ml-4"
            >
              <ChevronDown size={20} className="text-slate-600" strokeWidth={1.5} />
            </motion.div>
          </button>
          <AnimatePresence>
            {expandedId === item.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-200/60">
                  <p className="text-base text-slate-700 leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
