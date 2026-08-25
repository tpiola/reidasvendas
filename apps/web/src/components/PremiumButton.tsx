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

const base = 'rdv-action';
const sizes: Record<string, string> = {
  sm: 'rdv-action--sm',
  md: 'rdv-action--md',
  lg: 'rdv-action--lg',
};
const variants: Record<string, string> = {
  primary: 'rdv-action--primary',
  outline: 'rdv-action--outline',
  ghost: 'rdv-action--ghost',
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
