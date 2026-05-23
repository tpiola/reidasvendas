import { useEffect, useState } from 'react';

type AnimatedCounterProps = {
  value: string;
  delay?: number;
};

export function AnimatedCounter({ value, delay = 0 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0');
  const num = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '');
  const isDecimal = value.includes('.');

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1600;
      const step = 16;
      const increment = num / (duration / step);
      const interval = setInterval(() => {
        start += increment;
        if (start >= num) {
          clearInterval(interval);
          setDisplay(value);
        } else {
          const formatted = isDecimal ? start.toFixed(1) : Math.floor(start).toString();
          setDisplay(formatted + suffix);
        }
      }, step);
      return () => clearInterval(interval);
    }, delay * 1000 + 600);
    return () => clearTimeout(timer);
  }, [value, num, suffix, delay, isDecimal]);

  return <span>{display}</span>;
}
