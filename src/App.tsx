import React, { useRef } from 'react';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { Values } from './sections/Values';
import { ValuationForm } from './sections/ValuationForm';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';

function App() {
  const formRef = useRef<HTMLDivElement>(null);

  const handleRequestValuation = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-eggshell">
      <Header />
      <Hero onRequestValuation={handleRequestValuation} />
      <Process />
      <Values />
      <ValuationForm />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
