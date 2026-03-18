import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { Values } from './sections/Values';
import { ValuationForm } from './sections/ValuationForm';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';
import { BackToTop } from './components/BackToTop';

function App() {
  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'contact' ? 'valuation-form-card' : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 120; // Increased offset to prevent clipping
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-eggshell relative">
      <Header onNavigate={scrollToSection} />
      
      {/* Decorative background elements for "blank sides" */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] bg-blue-100/60 rounded-full blur-[160px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-indigo-100/50 rounded-full blur-[160px] animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-[1600px] mx-auto bg-white shadow-2xl shadow-slate-200/50 min-h-screen border-x border-slate-100/50">
        <main>
          <Hero onRequestValuation={() => scrollToSection('contact')} />
          <Process />
          <Values />
          <ValuationForm />
          <Testimonials />
          <FAQ />
        </main>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
