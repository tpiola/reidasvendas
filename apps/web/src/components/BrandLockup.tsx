import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";
interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}
export function BrandLockup({
  compact = false,
  className,
  wordmarkClassName,
}: BrandLockupProps) {
  return (
    <span
      className={cn("rdv-brand-lockup", compact && "is-compact", className)}
    >
      <BrandMark />
      <span className="rdv-brand-lockup__text">
        <span className={cn("rdv-wordmark", wordmarkClassName)}>
          Rei das Vendas
        </span>
        <span className="rdv-wordmark-subtitle">Negócios em movimento</span>
      </span>
    </span>
  );
}
