'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

interface ContactCTAProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
}

export default function ContactCTA({
  label = 'Contact the Garage',
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
}: ContactCTAProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider',
    md: 'px-6 py-3 text-sm font-semibold tracking-wider',
    lg: 'px-8 py-4 text-base font-bold tracking-wider',
  };

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)]',
    secondary: 'bg-garage-studio text-white border border-white/20 hover:border-garage-accent hover:text-garage-accent shadow-lg',
    outline: 'bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10',
    glass: 'glass-pill text-white hover:bg-white/20 hover:border-white/40',
  };

  return (
    <Link
      href="/contact"
      className={`inline-flex items-center justify-center gap-2.5 uppercase transition-all duration-300 rounded-none cursor-pointer group ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      aria-label={label}
    >
      <Wrench className="w-4 h-4 opacity-70 group-hover:rotate-12 transition-transform duration-300" />
      <span>{label}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      )}
    </Link>
  );
}
