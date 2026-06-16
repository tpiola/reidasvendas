import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

interface SharedProps {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonAsButton | ButtonAsLink;

const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-400';
const sizes: Record<string, string> = {
  sm: 'px-5 py-2 text-xs tracking-wider',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};
const variants: Record<string, string> = {
  primary:
    'bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] text-[#030303] font-bold hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98]',
  outline:
    'border border-[rgba(214,168,79,0.22)] text-[#F5F5F5] hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:shadow-[0_0_30px_rgba(214,168,79,0.1)] hover:-translate-y-0.5 active:scale-[0.98]',
  ghost:
    'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5',
};

export function PremiumButton(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...rest
  } = props;

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if ('href' in rest && rest.href) {
    const { href, ...a } = rest as ButtonAsLink;
    return (
      <a href={href} className={cls} {...a}>
        {children}
      </a>
    );
  }

  const btnProps = rest as ButtonAsButton;
  return (
    <button className={cls} {...btnProps}>
      {children}
    </button>
  );
}
