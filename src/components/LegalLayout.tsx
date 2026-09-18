import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { usePageMeta } from '../hooks/usePageMeta';

interface Props {
  title: string;
  /** ISO date of the last substantive change, e.g. "2026-08-04". */
  updated: string;
  children: React.ReactNode;
}

/**
 * Shared frame for the privacy policy and terms pages.
 *
 * They previously used raw grey Tailwind colours that matched nothing else on
 * the site, and printed `new Date()` as "Last updated", which claimed the
 * policy changed every single day.
 */
export function LegalLayout({ title, updated, children }: Props) {
  usePageMeta({ title });

  const updatedLabel = new Date(updated).toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <Navbar />
      <main id="main" className="bg-white">
        <div className="border-b border-ink-100 bg-ink-50">
          <div className="container-x max-w-3xl py-12 md:py-16">
            <h1 className="text-display-sm text-ink-900 md:text-display-md">{title}</h1>
            <p className="mt-3 text-[14px] text-ink-500">Last updated: {updatedLabel}</p>
          </div>
        </div>
        <article className="container-x prose-legal max-w-3xl py-10 md:py-14">{children}</article>
      </main>
      <Footer />
    </>
  );
}
