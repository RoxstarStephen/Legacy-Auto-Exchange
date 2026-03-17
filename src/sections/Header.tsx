import React from 'react';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onNavigate?.(section);
  };

  return (
    <header className="bg-eggshell border-b border-slate-200/40">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-slate-blue tracking-[0.2em]">LEGACY</h1>
            <p className="text-sm text-slate-600">Auto Exchange</p>
          </div>

          <nav className="flex gap-12 items-center">
            <button
              onClick={() => handleNavClick('process')}
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium text-sm"
            >
              Process
            </button>
            <button
              onClick={() => handleNavClick('values')}
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium text-sm"
            >
              Values
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-slate-600 hover:text-slate-900 transition-colors duration-200 font-medium text-sm"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
