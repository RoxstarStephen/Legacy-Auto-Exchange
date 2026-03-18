import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { MotionWrapper } from '../components/MotionWrapper';

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
      const { makeModel, year, registrationNumber, condition, mobileNumber } = formData;

      const response = await fetch('/api/valuation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          makeModel,
          year,
          registrationNumber,
          condition,
          mobileNumber,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          makeModel: '',
          year: '',
          registrationNumber: '',
          condition: '',
          mobileNumber: '',
        });

        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MotionWrapper>
      <section id="contact" className="bg-eggshell py-32 lg:pb-40 scroll-mt-32">
        <div className="max-w-2xl mx-auto px-6">
          <Card id="valuation-form-card" variant="default" className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">Begin Your Professional Valuation</h2>
              <p className="text-lg text-slate-700">
                Provide a few details, and our consultants will prepare a market-based estimate for your vehicle.
              </p>
            </div>

            {submitted && (
              <div className="bg-sage-green/10 border border-sage-green/30 rounded-lg p-4 space-y-2">
                <p className="text-base font-medium text-sage-green">Thank you for your request!</p>
                <p className="text-sm text-slate-700">
                  A Legacy consultant is currently reviewing the regional market data for your {formData.year} {formData.makeModel}. We will reach out shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Vehicle Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider text-slate-600">
                  Vehicle Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Make & Model"
                    placeholder="e.g., Hyundai i20"
                    name="makeModel"
                    value={formData.makeModel}
                    onChange={handleInputChange}
                    required
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
                <Input
                  label="Registration Number (Optional)"
                  placeholder="e.g., TN 01 AB 1234"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                />
              </div>

              {/* Condition */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider text-slate-600">
                  Vehicle Condition
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {['Excellent', 'Good', 'Fair'].map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, condition }))}
                      className={`
                        p-4 border rounded-lg text-center font-medium transition-all duration-200
                        ${
                          formData.condition === condition
                            ? 'bg-slate-blue text-white border-slate-blue'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }
                      `}
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider text-slate-600">
                  Contact Information
                </h3>
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
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Request My Valuation'}
              </Button>
            </form>

            {/* Trust Badges */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60">
              {[
                { label: 'Privacy Protected', icon: Shield },
                { label: 'No Spam Guarantee', icon: Shield },
                { label: 'Valid for 7 Days', icon: Shield },
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 justify-center md:justify-start">
                  <Shield size={16} className="text-sage-green" strokeWidth={2} />
                  <span className="text-sm font-medium text-slate-700">{badge.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </MotionWrapper>
  );
};
