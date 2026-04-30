import * as React from 'react';
import { cn } from './cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({ className, variant = 'solid', size = 'md', ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none',
        size === 'sm' && 'h-10 px-4 text-sm',
        size === 'md' && 'h-12 px-5 text-sm',
        size === 'lg' && 'h-14 px-6 text-base',
        variant === 'solid' && 'bg-black text-white hover:bg-black/90',
        variant === 'outline' && 'border border-black/15 bg-white text-black hover:bg-black/5',
        variant === 'ghost' && 'bg-transparent text-black hover:bg-black/5',
        className,
      )}
    />
  );
}

