import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  q: string;
  a: string;
}

interface Props {
  items: AccordionItem[];
  /** Open the first item by default so the section doesn't look empty. */
  defaultOpen?: number | null;
  className?: string;
}

/**
 * Accessible FAQ list. The e-book and consultation pages each had their own
 * copy of this, one without ARIA wiring; this is the single version.
 */
export function Accordion({ items, defaultOpen = 0, className = '' }: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={`divide-y divide-ink-200 ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[17px] font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                  {item.q}
                </span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border text-ink-600 transition-all duration-200 ${
                    isOpen
                      ? 'border-brand-400 bg-brand-400 text-ink-950'
                      : 'border-ink-200 group-hover:border-ink-900 group-hover:text-ink-900'
                  }`}
                  aria-hidden="true"
                >
                  <Plus className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-12 text-[15px] leading-relaxed text-ink-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
