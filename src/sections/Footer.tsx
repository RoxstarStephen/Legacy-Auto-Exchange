import React from 'react';

interface FooterProps {
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-white tracking-[0.2em]">LEGACY</h3>
              <p className="text-lg text-slate-400 max-w-sm leading-relaxed">
                Redefining the car selling experience in Tamil Nadu through professional transparency.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Regions</h4>
            <ul className="space-y-4">
              {['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'].map(city => (
                <li key={city}>
                  <div className="text-slate-400">{city}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => onNavigate?.('process')} className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 uppercase text-xs font-bold tracking-widest">Process</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('values')} className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 uppercase text-xs font-bold tracking-widest">Our Values</button>
              </li>
              <li>
                <button onClick={() => onNavigate?.('valuation-form')} className="text-slate-400 hover:text-indigo-400 transition-colors duration-300 uppercase text-xs font-bold tracking-widest">Get Quote</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-slate-500">&copy; 2024 Legacy Auto Exchange. Premium Service.</p>
          <div className="flex gap-10">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
