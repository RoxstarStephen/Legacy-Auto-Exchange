import React from 'react';
import { MotionWrapper } from '../components/MotionWrapper';
import { Button } from '../components/Button';

interface HeroProps {
  onRequestValuation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestValuation }) => {
  return (
    <MotionWrapper>
      <section className="bg-eggshell">
        <div className="max-w-7xl mx-auto px-6 py-28 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  A dignified way to sell your car in Tamil Nadu.
                </h1>
                <p className="text-lg text-slate-700 leading-relaxed max-w-xl">
                  Moving on from a vehicle shouldn't involve endless haggling or paperwork stress. We provide researched, market-accurate valuations and a professional handover process centered on transparency.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={onRequestValuation}
                  size="lg"
                  variant="primary"
                >
                  Request a Valuation
                </Button>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-slate-200/50 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
              <img
                src="/src/assets/premium_car_hero.png"
                alt="Premium Car"
                className="rounded-2xl shadow-2xl border border-white/20 object-cover w-full h-auto transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
};
