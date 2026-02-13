import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <section className="py-32 relative bg-clay-background min-h-screen font-nunito">
      <div className="max-w-4xl mx-auto px-6">
        <Card className="p-12 overflow-hidden relative">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-cream">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(bookingStep / 3) * 100}%` }}
              className="h-full bg-primary"
            />
          </div>

          <div className="space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-fredoka font-bold text-gray-800">
                Book a Session
              </h2>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1 rounded-full text-sm">
                  <Lock className="w-4 h-4" />
                  SSL Secure Booking
                </div>
                <p className="text-gray-400 font-bold">
                  Step {bookingStep} of 3
                </p>
              </div>
            </div>

            {/* Steps */}
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {bookingStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-fredoka font-bold text-center">
                    Select your package
                  </h3>

                  <div className="grid gap-4">
                    {["Essential Glow", "The Full Clip", "Royal Spa"].map(
                      (name) => (
                        <div
                          key={name}
                          onClick={() => {
                            setSelectedPackage({ title: name });
                            setBookingStep(2);
                          }}
                          className={`p-6 rounded-clay border-2 cursor-pointer transition-all ${
                            selectedPackage?.title === name
                              ? "border-primary bg-primary/5"
                              : "border-cream hover:border-peach"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-700">
                              {name}
                            </span>
                            {selectedPackage?.title === name && (
                              <div className="w-6 h-6 bg-primary rounded-full" />
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {bookingStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-fredoka font-bold text-center">
                    Tell us about your pet
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Pet Type" placeholder="Dog, Cat, etc." />
                    <Input label="Pet Name" placeholder="Daisy" />
                    <Input label="Breed" placeholder="Golden Retriever" />
                    <Input label="Age" placeholder="2 years" />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setBookingStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-[2]"
                      onClick={() => setBookingStep(3)}
                    >
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {bookingStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-3xl font-fredoka font-bold text-center">
                    Pick a date & time
                  </h3>

                  <div className="grid gap-6">
                    <Input label="Preferred Date" type="date" />

                    <div className="grid grid-cols-3 gap-4">
                      {["09:00", "11:00", "14:00", "16:00", "18:00"].map(
                        (t) => (
                          <div
                            key={t}
                            className="p-3 text-center rounded-clay bg-cream font-bold cursor-pointer hover:bg-peach transition-colors"
                          >
                            {t}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setBookingStep(2)}
                    >
                      Back
                    </Button>
                    <Button
                      className="flex-[2]"
                      onClick={() => alert("Booking Confirmed! 🐾")}
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <div className="flex items-center justify-center gap-8 text-gray-400 text-sm font-bold pt-8 border-t border-black/5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                No Payment Required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Instant Confirmation
              </div>
            </div>

          </div>
        </Card>
      </div>
    </section>
  );
};

export default BookingPage;