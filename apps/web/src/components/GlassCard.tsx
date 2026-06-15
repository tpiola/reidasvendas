import { motion } from 'framer-motion';
import { staggerItem } from '@/hooks/useAnimation';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = '', glow = false, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={`glass-card rounded-2xl p-6 sm:p-7 ${hover ? 'shine-effect' : ''} ${glow ? 'hover:shadow-[0_0_40px_rgba(214,168,79,0.08)]' : ''} ${className}`}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
