import * as React from 'react';
import { cn } from './cn';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(
        'h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base outline-none transition-shadow placeholder:text-black/40 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 md:text-sm',
        className,
      )}
    />
  );
});

