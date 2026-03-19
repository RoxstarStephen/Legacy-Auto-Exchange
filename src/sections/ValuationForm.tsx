import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { SplitText } from '../components/SplitText';

export const ValuationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    makeModel: '',
    year: '',
    registrationNumber: '',
    condition: '',
    mobileNumber: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      setFormData({
        makeModel: '',
        year: '',
        registrationNumber: '',
        condition: '',
        mobileNumber: '',
      });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-transparent py-32 lg:py-40 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <Card id="valuation-form-card" variant="glass" className="overflow-hidden border-indigo-500/10 shadow-2xl shadow-indigo-500/5">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="py-20 text-center space-y-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    className="w-24 h-24 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-green-500/20"
                  >
                    <CheckCircle2 size={48} className="text-white" />
                  </motion.div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Request Received!</h2>
                    <p className="text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
                      A Legacy consultant is currently reviewing market data for your vehicle. We'll be in touch via mobile shortly.
                    </p>
                  </div>
                  <Button variant="ghost" onClick={() => setSubmitted(false)} className="text-indigo-600 font-bold uppercase tracking-widest text-xs">
                    Submit another request
                  </Button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, x: -20 }}>
                  <div className="grid lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-8 bg-slate-900 p-10 text-white rounded-[2rem] lg:rounded-r-none relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none" />
                      <div className="relative z-10 space-y-6">
                        <SplitText 
                          text="Begin Your Professional Valuation" 
                          className="text-3xl font-bold leading-tight text-white"
                        />
                        <p className="text-slate-300 text-lg leading-relaxed">
                          Provide a few details, and our consultants will prepare a market-based estimate for your vehicle.
                        </p>
                        
                        <div className="space-y-6 pt-10">
                          {[
                            { label: 'Privacy Protected', icon: Shield },
                            { label: 'No Spam Guarantee', icon: Shield },
                            { label: 'Market Researched', icon: Shield },
                          ].map((badge, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                <badge.icon size={20} className="text-indigo-400" />
                              </div>
                              <span className="text-sm font-bold uppercase tracking-widest text-slate-200">{badge.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8 py-2">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Make & Model"
                          placeholder="e.g., Hyundai i20"
                          name="makeModel"
                          value={formData.makeModel}
                          onChange={handleInputChange}
                          required
                          className="group-hover:scale-[1.01] transition-transform"
                        />
                        <Input
                          label="Year"
                          type="number"
                          placeholder="e.g., 2020"
                          name="year"
                          value={formData.year}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <fieldset className="space-y-4">
                        <legend className="text-sm font-bold text-slate-900 uppercase tracking-widest leading-none">Vehicle Condition</legend>
                        <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Vehicle Condition">
                          {['Excellent', 'Good', 'Fair'].map((condition) => (
                            <button
                              key={condition}
                              type="button"
                              role="radio"
                              aria-checked={formData.condition === condition}
                              onClick={() => setFormData((prev) => ({ ...prev, condition }))}
                              className={`
                                py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300
                                ${
                                  formData.condition === condition
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-105'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                }
                              `}
                            >
                              {condition}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <Input
                        label="Mobile Number"
                        type="tel"
                        placeholder="Enter your mobile number"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        prefix="+91"
                        required
                      />

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={isLoading}
                        showGlow
                        magnetic
                        data-cursor-text="SEND"
                        className="h-16 text-sm font-extrabold uppercase tracking-[0.2em]"
                      >
                        {isLoading ? 'Processing Request...' : 'Get My Valuation'}
                        {!isLoading && <ArrowRight className="ml-2 w-5 h-5" />}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
