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

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(11,118,216,0.6)] hover:bg-brand-700 hover:shadow-[0_10px_24px_-8px_rgba(11,118,216,0.7)]',
  secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  outline: 'border border-ink-200 bg-white text-ink-900 hover:border-ink-300 hover:bg-ink-50',
  ghost: 'text-ink-700 hover:bg-ink-100 hover:text-ink-900',
  dark: 'bg-ink-900 text-white hover:bg-ink-800',
  white: 'bg-white text-ink-900 shadow-sm hover:bg-ink-50',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[0_8px_20px_-8px_rgba(37,211,102,0.6)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 min-h-[52px] px-7 text-[16px]',
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
