import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from '../components/Card';
import { MotionWrapper } from '../components/MotionWrapper';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        'I was hesitant about selling my SUV online, but Legacy treated the transaction like a professional consultation. No haggling, just a fair discussion based on the current Chennai market.',
      author: 'Karthik R.',
      location: 'Chennai',
    },
    {
      id: 2,
      quote:
        'The RTO transfer was my biggest worry. They handled all the paperwork in Coimbatore seamlessly. I received the delivery note immediately and felt legally secure throughout.',
      author: 'Sowmya Nair',
      location: 'Coimbatore',
    },
    {
      id: 3,
      quote:
        'Unlike other platforms that give a high quote and then drop it during inspection, Legacy was grounded from the start. A very respectful and transparent experience.',
      author: 'Dr. Arulmani',
      location: 'Madurai',
    },
  ];

  return (
    <MotionWrapper>
      <section className="bg-eggshell py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">The Experience of Others</h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Legacy is built on long-term trust and professional transparency across Tamil Nadu.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} variant="elevated" className="flex flex-col space-y-4">
                <div className="inline-flex w-8 h-8">
                  <Quote size={32} className="text-sage-green" strokeWidth={1.5} />
                </div>
                <p className="text-base text-slate-700 italic leading-relaxed flex-grow">
                  {testimonial.quote}
                </p>
                <div className="pt-4 border-t border-slate-200/60">
                  <p className="font-medium text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-600">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
};
