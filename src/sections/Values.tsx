import React from 'react';
import { MapPin, FileText, CalendarCheck } from 'lucide-react';
import { Card } from '../components/Card';
import { MotionWrapper } from '../components/MotionWrapper';

export const Values: React.FC = () => {
  const pillars = [
    {
      id: 1,
      icon: MapPin,
      title: 'Tamil Nadu Market Insight',
      description: 'We don\'t use generic national algorithms. Our valuations are based on real-time demand in Chennai, Coimbatore, and across Tamil Nadu, ensuring your offer reflects local reality.',
    },
    {
      id: 2,
      icon: FileText,
      title: 'Seamless Documentation',
      description: 'The sale isn\'t finished until the RC is transferred. We manage the entire documentation process with your local RTO, providing you with legal closure and peace of mind.',
    },
    {
      id: 3,
      icon: CalendarCheck,
      title: 'A Pressure-Free Space',
      description: 'Legacy is built on respect, not urgency. Our valuations are valid for 7 days, giving you the time to make a grounded decision without follow-up calls or "limited-time" pressure.',
    },
  ];

  return (
    <MotionWrapper>
      <section id="values" className="bg-eggshell py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">The Values</h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Built on principles of transparency, expertise, and respect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.id} variant="elevated" className="h-full">
                  <div className="flex flex-col space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-blue/10 rounded-lg">
                      <Icon size={24} className="text-slate-blue" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="text-base text-slate-700 leading-relaxed">{pillar.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
};
