'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    registration: '',
    model: '',
    serviceRequired: 'General Servicing & Diagnostics',
    preferredContact: 'Phone',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-garage-dark text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-garage-accent/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Range Rover Experience</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Header & Contact Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-block px-3 py-1 mb-3 border border-white/20 bg-white/5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-garage-accent">
                  BELL AUTOMOTIVE DIRECT ENQUIRY
                </div>
                <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                  TELL US WHAT <br />
                  <span className="text-neutral-400">YOU NEED.</span>
                </h1>
                <p className="mt-4 text-base text-neutral-300 font-light leading-relaxed">
                  Our garage team will get in touch directly to discuss your vehicle requirements, provide honest advice, and arrange your appointment.
                </p>
              </div>

              {/* Informational Alert Box */}
              <div className="p-4 glass-panel border border-white/10 text-xs text-neutral-300 font-light space-y-2">
                <div className="flex items-center gap-2 font-bold text-white uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-garage-accent" />
                  <span>Direct Garage Communication</span>
                </div>
                <p className="leading-relaxed">
                  Submitting this form does <strong>not</strong> lock in an online booking or take payment. We review your vehicle details and contact you personally to confirm timing and service requirements.
                </p>
              </div>

              {/* Direct Details List */}
              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 glass-panel border border-white/10 flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-garage-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white uppercase">GARAGE ADDRESS</h4>
                    <p className="text-neutral-300 text-[11px] mt-0.5">
                      Bell Automotive, The Forge, Dundas St, <br />
                      Queensferry, Deeside CH5 1SZ
                    </p>
                  </div>
                </div>

                <div className="p-4 glass-panel border border-white/10 flex items-start gap-4">
                  <Phone className="w-5 h-5 text-garage-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white uppercase">TELEPHONE</h4>
                    <p className="text-neutral-300 text-[11px] mt-0.5">
                      Landline: <a href="tel:01244813321" className="hover:text-garage-accent">01244 813 321</a> <br />
                      Mobile: <a href="tel:07901983474" className="hover:text-garage-accent">07901 983 474</a>
                    </p>
                  </div>
                </div>

                <div className="p-4 glass-panel border border-white/10 flex items-start gap-4">
                  <Mail className="w-5 h-5 text-garage-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white uppercase">EMAIL</h4>
                    <p className="text-neutral-300 text-[11px] mt-0.5">
                      <a href="mailto:gbellcars@hotmail.com" className="hover:text-garage-accent">
                        gbellcars@hotmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-4 glass-panel border border-white/10 flex items-start gap-4">
                  <Clock className="w-5 h-5 text-garage-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white uppercase">OPENING HOURS</h4>
                    <p className="text-neutral-300 text-[11px] mt-0.5">
                      Mon – Fri: 08:30 – 17:30 <br />
                      Sat: By Appointment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="p-8 glass-panel metal-border rounded-sm">
                {submitted ? (
                  <div className="py-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase text-white tracking-tight">
                      ENQUIRY RECEIVED
                    </h2>
                    <p className="text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                      Thanks — your enquiry has been received. A member of our garage team will review your details and contact you shortly.
                    </p>

                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-white/10 border border-white/20 text-xs font-mono uppercase text-white hover:bg-white/20"
                      >
                        Submit Another Enquiry
                      </button>
                      <Link
                        href="/"
                        className="px-6 py-3 bg-white text-black text-xs font-mono uppercase font-bold hover:bg-neutral-200"
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-white/10 pb-4 mb-6">
                      <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                        VEHICLE & CONTACT FORM
                      </h3>
                      <p className="text-xs text-neutral-400 font-light mt-1">
                        Fill in your details below and we will contact you directly.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. John Davies"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 07900 123 456"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. name@example.com"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Vehicle Registration
                        </label>
                        <input
                          type="text"
                          name="registration"
                          value={formData.registration}
                          onChange={handleChange}
                          placeholder="e.g. AB12 CDE"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none uppercase font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Vehicle Model
                        </label>
                        <input
                          type="text"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          placeholder="e.g. Range Rover Sport 3.0 SDV6"
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                          Service Required
                        </label>
                        <select
                          name="serviceRequired"
                          value={formData.serviceRequired}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white text-sm focus:border-garage-accent focus:outline-none"
                        >
                          <option value="General Servicing & Diagnostics">General Servicing & Diagnostics</option>
                          <option value="Autologic Fault Tracing">Autologic Fault Tracing</option>
                          <option value="Air Suspension Repair">Air Suspension Repair</option>
                          <option value="Braking System Maintenance">Braking System Maintenance</option>
                          <option value="Engine / Supercharger Repair">Engine / Supercharger Repair</option>
                          <option value="Gearbox / Transfer Case Service">Gearbox / Transfer Case Service</option>
                          <option value="Welding & Pre-MOT">Welding & Pre-MOT</option>
                          <option value="Parts & Accessories Request">Parts & Accessories Request</option>
                          <option value="Other Technical Enquiry">Other Technical Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="Phone"
                            checked={formData.preferredContact === 'Phone'}
                            onChange={handleChange}
                            className="accent-garage-accent"
                          />
                          <span>Phone Call</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs font-mono text-neutral-300 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="Email"
                            checked={formData.preferredContact === 'Email'}
                            onChange={handleChange}
                            className="accent-garage-accent"
                          />
                          <span>Email</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-300 mb-2">
                        Message / Issue Description *
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe any warning lights, noises, or specific service work required..."
                        className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white placeholder-neutral-500 text-sm focus:border-garage-accent focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
