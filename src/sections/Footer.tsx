import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-blue text-eggshell">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white tracking-[0.2em] drop-shadow-sm">LEGACY</h3>
            <p className="text-sm text-eggshell/80 font-medium">Professionalism and transparency in every transaction.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-eggshell">Service Regions</h4>
            <ul className="space-y-2 text-sm text-eggshell/80">
              <li>
                <a href="#" className="hover:text-eggshell transition-colors duration-200">
                  Chennai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eggshell transition-colors duration-200">
                  Coimbatore
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eggshell transition-colors duration-200">
                  Madurai
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eggshell transition-colors duration-200">
                  Salem
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-eggshell transition-colors duration-200">
                  Trichy
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-eggshell">Trust Symbols</h4>
            <ul className="space-y-2 text-sm text-eggshell/80">
              <li className="hover:text-eggshell transition-colors duration-200 cursor-default">
                RTO Compliance Guaranteed
              </li>
              <li className="hover:text-eggshell transition-colors duration-200 cursor-default">
                Instant Bank Settlements
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-eggshell/70">
              &copy; 2024 Legacy Auto Exchange. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-eggshell/70 hover:text-eggshell transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-eggshell/70 hover:text-eggshell transition-colors duration-200">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
