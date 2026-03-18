import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from '../components/Card';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonCard = () => (
  <Card variant="glass" className="h-[250px] animate-pulse">
    <div className="flex flex-col space-y-6">
      <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
      <div className="space-y-3">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-5/6" />
        <div className="h-4 bg-slate-200 rounded w-4/6" />
      </div>
      <div className="pt-4 border-t border-slate-100 mt-auto">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-1/4" />
      </div>
    </div>
  </Card>
);

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        'I was hesitant about selling my SUV online, but Legacy treated the transaction like a professional consultation. No haggling, just a fair discussion based on the current Chennai market.',
      author: 'Karthik R.',
      location: 'Chennai',
      rating: 5
    },
    {
      id: 2,
      quote:
        'The RTO transfer was my biggest worry. They handled all the paperwork in Coimbatore seamlessly. I received the delivery note immediately and felt legally secure throughout.',
      author: 'Sowmya Nair',
      location: 'Coimbatore',
      rating: 5
    },
    {
      id: 3,
      quote:
        'Unlike other platforms that give a high quote and then drop it during inspection, Legacy was grounded from the start. A very respectful and transparent experience.',
      author: 'Dr. Arulmani',
      location: 'Madurai',
      rating: 5
    },
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="bg-transparent py-28 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">The Experience of Others</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full mb-6" />
            <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
              Legacy is built on long-term trust and professional transparency across Tamil Nadu.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SkeletonCard />
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card variant="glass" className="p-12 md:p-16 flex flex-col items-center text-center space-y-10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl relative z-10">
                    <Quote size={40} className="text-indigo-600" fill="currentColor" />
                  </div>
                  
                  <p className="text-2xl md:text-3xl text-slate-700 italic leading-relaxed font-medium relative z-10">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <motion.div
                          key={star}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + star * 0.1 }}
                          className="w-5 h-5 bg-indigo-500 rounded-full"
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">{testimonials[currentIndex].author}</h4>
                      <p className="text-sm text-slate-500 font-bold uppercase tracking-[0.2em]">{testimonials[currentIndex].location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center items-center space-x-8 mt-12">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all hover:scale-110 active:scale-95"
            >
              ←
            </button>
            <div className="flex space-x-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-indigo-600' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all hover:scale-110 active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
