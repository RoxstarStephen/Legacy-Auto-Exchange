import React from 'react';
import { Car, BarChart3, Handshake } from 'lucide-react';
import { Card } from '../components/Card';
import { MotionWrapper } from '../components/MotionWrapper';

export const Process: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: Car,
      title: 'Share Basic Details',
      description: 'Tell us about your car—model, year, mileage, and condition—through our simple request.',
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Get a Fair Estimate',
      description: 'We analyze current Tamil Nadu market data to provide you with a transparent, researched price range.',
    },
    {
      id: 3,
      icon: Handshake,
      title: 'Respectful Handover',
      description: 'Finalize the sale at your convenience, with complete transparency and immediate payment upon verification.',
    },
  ];

  return (
    <MotionWrapper>
      <section id="process" className="bg-eggshell py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">The Simple Path</h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Three straightforward steps to a fair, transparent sale of your vehicle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Dashed connector line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-px border-t border-dashed border-slate-300" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="relative">
                  <Card variant="elevated" className="h-full">
                    <div className="flex flex-col space-y-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-green/10 rounded-lg">
                        <Icon size={24} className="text-sage-green" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-base text-slate-700 leading-relaxed">{step.description}</p>
                    </div>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-5 top-20 w-10 h-px bg-eggshell z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
};
