import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark' | 'white' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** Internal route. Renders a <Link>. */
  to?: string;
  /** External URL. Renders an <a target="_blank">. */
  href?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  type?: 'button' | 'submit';
  'aria-label'?: string;
}

// Squared-off corners rather than pills: they echo the keys on the calculator
// logo and keep the CTAs from looking like every other template.
const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:translate-y-px disabled:pointer-events-none disabled:opacity-60';

/**
 * Primary is the brand blue #61C0F5 (brand-400). White text on it fails
 * contrast (2.1:1), so it carries ink-950 text instead (9.8:1). The inset
 * bottom edge gives it a pressable, key-like feel.
 */
const variants: Record<Variant, string> = {
  primary:
    'bg-brand-400 text-ink-950 shadow-[inset_0_-3px_0_rgba(11,40,61,0.18),0_10px_24px_-12px_rgba(22,121,181,0.65)] ' +
    'hover:bg-brand-500 hover:shadow-[inset_0_-3px_0_rgba(11,40,61,0.22),0_14px_28px_-12px_rgba(22,121,181,0.75)]',
  secondary: 'bg-brand-100 text-brand-800 hover:bg-brand-200',
  outline: 'border border-ink-300 bg-white text-ink-900 hover:border-ink-900 hover:bg-white',
  ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  dark: 'bg-ink-950 text-white shadow-[inset_0_-3px_0_rgba(255,255,255,0.08)] hover:bg-ink-800',
  white: 'bg-white text-ink-900 shadow-[inset_0_-3px_0_rgba(18,26,39,0.08)] hover:bg-ink-50',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[0_8px_20px_-8px_rgba(37,211,102,0.6)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 min-h-[54px] px-7 text-[16px]',
};

/**
 * One button for links and actions.
 *
 * The previous pattern wrapped a <button> inside a <Link>, which is invalid
 * HTML and gave keyboard users two tab stops per CTA. Pass `to` for routes,
 * `href` for external links, or neither for a real button.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  to,
  href,
  external,
  onClick,
  disabled,
  type = 'button',
  ...rest
}: BaseProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={rest['aria-label']}>
        {children}
      </Link>
    );
  }

  if (href) {
    const ext = external ?? /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={ext ? '_blank' : undefined}
        rel={ext ? 'noopener noreferrer' : undefined}
        aria-label={rest['aria-label']}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} aria-label={rest['aria-label']}>
      {children}
    </button>
  );
}
