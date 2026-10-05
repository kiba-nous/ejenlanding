import React from 'react';
import { motion } from 'framer-motion';
import { reveal } from './motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /**
   * `split` puts the title on the left and the subtitle in a right-hand
   * column on wide screens — an editorial layout that avoids the stacked,
   * centred heading every section of a template site uses.
   */
  align?: 'left' | 'center' | 'split';
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }: SectionHeadingProps) {
  if (align === 'split') {
    return (
      <motion.div
        {...reveal()}
        className={`grid gap-5 border-t border-ink-900 pt-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}
      >
        <div className="flex flex-col items-start gap-4 lg:col-span-7">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="text-balance text-display-sm text-ink-900 md:text-display-md">{title}</h2>
        </div>
        {subtitle && (
          <p className="text-pretty text-[17px] leading-relaxed text-ink-600 lg:col-span-5 lg:pb-1">{subtitle}</p>
        )}
      </motion.div>
    );
  }

  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <motion.div {...reveal()} className={`flex max-w-2xl flex-col gap-4 ${alignCls} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-balance text-display-sm md:text-display-md text-ink-900">{title}</h2>
      {subtitle && <p className="text-pretty text-[17px] leading-relaxed text-ink-600">{subtitle}</p>}
    </motion.div>
  );
}

/** Small pill label, e.g. "Paling popular" or a product tag. */
export function Badge({
  children,
  tone = 'brand',
  className = '',
}: {
  children: React.ReactNode;
  tone?: 'brand' | 'neutral' | 'amber' | 'green' | 'inverse';
  className?: string;
}) {
  const tones = {
    brand: 'bg-brand-100 text-brand-800 ring-1 ring-inset ring-brand-200',
    neutral: 'bg-ink-100 text-ink-700',
    amber: 'bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-100',
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100',
    inverse: 'bg-white/10 text-white ring-1 ring-inset ring-white/15',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Check-mark bullet used in feature lists. */
export function CheckItem({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <li className={`flex items-start gap-3 text-[15px] leading-relaxed ${muted ? 'text-ink-500' : 'text-ink-700'}`}>
      <span
        className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
          muted ? 'bg-ink-100 text-ink-400' : 'bg-brand-400 text-ink-950'
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}
