import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Process', id: 'process' },
    { name: 'Our Values', id: 'values' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-white/70 backdrop-blur-2xl shadow-xl shadow-indigo-500/5' 
          : 'py-8 bg-transparent'
      }`}
    >
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          onClick={() => onNavigate('hero')}
          className="flex items-center space-x-3 cursor-pointer group relative"
          data-cursor-text="HOME"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform relative overflow-hidden">
            <span className="text-white font-black text-xl relative z-10">L</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-150%]"
              animate={{ translateX: ['150%', '-150%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
            />
          </div>
          <div className="relative overflow-hidden group">
            <span className={`text-2xl font-black tracking-[0.2em] transition-colors duration-500 relative z-10 ${
              scrolled ? 'text-slate-900' : 'text-indigo-600 font-extrabold'
            }`}>
              LEGACY
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent -skew-x-12 translate-x-[-150%] pointer-events-none"
              animate={{ translateX: ['150%', '-150%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.2, ease: "linear" }}
            />
          </div>
        </motion.div>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              data-cursor-text="GO"
              className="text-sm font-bold uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 transition-all group-hover:w-full" />
            </button>
          ))}
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />

          <Button 
            variant="primary" 
            size="md" 
            showGlow
            magnetic
            data-cursor-text="QUOTE"
            onClick={() => onNavigate('contact')}
          >
            Get Quote
          </Button>
        </div>

        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-lg font-bold text-slate-900"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <Button onClick={() => onNavigate('contact')}>Get Quote</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
