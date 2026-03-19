import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Tag } from 'lucide-react';
import { Card } from '../components/Card';
import { SplitText } from '../components/SplitText';

const categories = ['All', 'Process', 'Documentation', 'Payment', 'Legal'];

export const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openId, setOpenId] = React.useState<string | null>(null);

  const faqItems = [
    {
      id: '1',
      category: 'Documentation',
      question: 'What documents are required?',
      answer:
        'You\'ll generally need the original RC (Registration Certificate), insurance copy, and identity proof. We\'ll guide you through specific requirements based on your vehicle and location.',
    },
    {
      id: '2',
      category: 'Process',
      question: 'How long does the process take?',
      answer:
        'After the initial valuation, the sale and payment can be finalized quickly, often within a single meeting if all documents are ready. The RTO transfer typically takes 7-10 business days after the sale is finalized.',
    },
    {
      id: '3',
      category: 'Legal',
      question: 'How is the RTO transfer handled?',
      answer:
        'We take full responsibility for the documentation. Once the sale is finalized, we provide you with the delivery note and track the RC transfer status on your behalf with the local RTO office.',
    },
    {
      id: '4',
      category: 'Process',
      question: 'Do I need to visit an office?',
      answer:
        'No. To maintain a calm experience, we can arrange for our consultants to meet you at your home or workplace across Tamil Nadu. There\'s no requirement to visit our office.',
    },
    {
      id: '5',
      category: 'Payment',
      question: 'What if I have an existing bank loan (HP)?',
      answer:
        'We assist in the loan foreclosure process and coordinate with your bank to obtain the NOC (No Objection Certificate), ensuring a clean title transfer. We handle this seamlessly as part of our service.',
    },
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="bg-transparent py-28 lg:py-40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-4 mb-20">
          <div className="space-y-4">
            <SplitText 
              text="FAQ" 
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight justify-center"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-20 h-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 mx-auto rounded-full mb-6 origin-center" 
            />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about our professional car exchange process.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search questions..."
              aria-label="Search frequently asked questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap active:scale-95 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                    : 'bg-white/50 text-slate-500 hover:bg-white border border-slate-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card variant="glass" className="p-0 overflow-hidden border-slate-100 hover:border-indigo-200/50 transition-colors">
                  <button 
                    onClick={() => setOpenId(openId === item.id ? null : item.id)}
                    aria-expanded={openId === item.id}
                    className="w-full p-6 text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-1.5 h-6 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity ${openId === item.id ? 'opacity-100' : ''}`} />
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.question}</h3>
                    </div>
                    <motion.div
                      animate={{ rotate: openId === item.id ? 180 : 0 }}
                      className="text-slate-400"
                    >
                      <ChevronDown size={24} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openId === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-8 pb-8 pt-2">
                          <div className="flex items-center space-x-2 mb-4">
                            <Tag size={14} className="text-indigo-600" />
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">{item.category}</span>
                          </div>
                          <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No questions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
