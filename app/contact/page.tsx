'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleModel: '',
    serviceRequested: 'Autologic Diagnostic Scan',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setForm({
          name: '',
          phone: '',
          email: '',
          vehicleModel: '',
          serviceRequested: 'Autologic Diagnostic Scan',
          message: '',
        });
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try calling us directly.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please call Bell Automotive on 01244 813 321.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garage-dark text-white selection:bg-garage-accent/30 overflow-x-clip">
      <Navbar />

      <main className="pt-32 pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-white/10 bg-white/5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BELL AUTOMOTIVE GARAGE QUEENSFERRY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              ARRANGE YOUR SERVICE
            </h1>
            <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Have a question regarding your Range Rover, Land Rover, or 4x4? Speak directly with our Queensferry workshop team or complete the form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Contact Info Sidebar */}
            <div className="lg:col-span-5 space-y-8 glass-panel p-8 rounded-xl border border-white/10 font-mono">
              <h3 className="text-xl font-bold uppercase tracking-wide text-white border-b border-white/10 pb-4">
                GARAGE CONTACT DETAILS
              </h3>

              <div className="space-y-6 text-sm text-neutral-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-garage-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-widest">Workshop Address</div>
                    <div className="font-bold text-white mt-1">Bell Automotive</div>
                    <div className="text-neutral-300 font-sans text-xs mt-0.5">
                      The Forge, Dundas St,<br />
                      Queensferry, Deeside CH5 1SZ, Wales
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-garage-accent">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-widest">Direct Phone Lines</div>
                    <div className="mt-1 font-bold text-white text-base">
                      <a href="tel:01244813321" className="hover:text-garage-accent transition-colors block">
                        01244 813 321
                      </a>
                      <a href="tel:07901983474" className="hover:text-garage-accent transition-colors block text-sm mt-0.5">
                        07901 983 474
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-garage-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-widest">Email Enquiries</div>
                    <a href="mailto:gbellcars@hotmail.com" className="font-bold text-garage-accent hover:underline mt-1 block">
                      gbellcars@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/10 pt-6">
                  <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-garage-accent">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 uppercase tracking-widest">Opening Hours</div>
                    <div className="text-xs text-neutral-300 font-sans mt-1 space-y-1">
                      <div>Monday – Friday: 8:30 AM – 5:30 PM</div>
                      <div>Saturday: By Appointment</div>
                      <div>Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Container */}
            <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">
                SEND AN ENQUIRY
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mb-8">
                Complete your details below and our technical advisors will get back to you promptly.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-xl text-center space-y-4 font-mono"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-xl font-bold text-white uppercase">Enquiry Received</h4>
                  <p className="text-xs text-neutral-300 font-sans max-w-md mx-auto">
                    Thank you for contacting Bell Automotive. A member of our team will review your vehicle details and contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-white rounded transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                  {errorMsg && (
                    <div className="p-4 bg-red-950/50 border border-red-500/30 text-red-300 rounded font-sans text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="07123 456789"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                        Vehicle Model / Year
                      </label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={form.vehicleModel}
                        onChange={handleChange}
                        placeholder="Range Rover Vogue 2019"
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                      Service Required
                    </label>
                    <select
                      name="serviceRequested"
                      value={form.serviceRequested}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                    >
                      <option value="Autologic Diagnostic Scan">Autologic Diagnostic Scan</option>
                      <option value="Electronic Air Suspension Repair">Electronic Air Suspension Repair</option>
                      <option value="Engine & Supercharger Servicing">Engine &amp; Supercharger Servicing</option>
                      <option value="Brake System Renewal">Brake System Renewal</option>
                      <option value="ZF 8-Speed Gearbox Service">ZF 8-Speed Gearbox Service</option>
                      <option value="General Maintenance / MOT Prep">General Maintenance / MOT Prep</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
                      Detailed Message / Symptoms *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Please describe any warning lights, noises, or specific service requirements..."
                      className="w-full px-4 py-3 bg-black/60 border border-white/15 rounded text-white focus:outline-none focus:border-garage-accent transition-colors font-sans text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-garage-accent hover:bg-cyan-400 text-black font-bold uppercase tracking-wider rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>SENDING ENQUIRY...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT GARAGE ENQUIRY</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
