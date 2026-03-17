import React from 'react';
import { Accordion } from '../components/Accordion';
import { MotionWrapper } from '../components/MotionWrapper';

export const FAQ: React.FC = () => {
  const faqItems = [
    {
      id: '1',
      question: 'What documents are required?',
      answer:
        'You\'ll generally need the original RC (Registration Certificate), insurance copy, and identity proof. We\'ll guide you through specific requirements based on your vehicle and location.',
    },
    {
      id: '2',
      question: 'How long does the process take?',
      answer:
        'After the initial valuation, the sale and payment can be finalized quickly, often within a single meeting if all documents are ready. The RTO transfer typically takes 7-10 business days after the sale is finalized.',
    },
    {
      id: '3',
      question: 'How is the RTO transfer handled?',
      answer:
        'We take full responsibility for the documentation. Once the sale is finalized, we provide you with the delivery note and track the RC transfer status on your behalf with the local RTO office.',
    },
    {
      id: '4',
      question: 'Do I need to visit an office?',
      answer:
        'No. To maintain a calm experience, we can arrange for our consultants to meet you at your home or workplace across Tamil Nadu. There\'s no requirement to visit our office.',
    },
    {
      id: '5',
      question: 'What if I have an existing bank loan (HP)?',
      answer:
        'We assist in the loan foreclosure process and coordinate with your bank to obtain the NOC (No Objection Certificate), ensuring a clean title transfer. We handle this seamlessly as part of our service.',
    },
  ];

  return (
    <MotionWrapper>
      <section className="bg-eggshell py-28 lg:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-700">
              Clear answers to help you understand the process.
            </p>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>
    </MotionWrapper>
  );
};
