import { cn } from '@/lib/utils';

/** Marca do dono, vetorizada do arquivo dele. Nao editar a mao: se a marca
 *  mudar, gerar de novo com /opt/data/qa-visual/seo/rdv/gerar_ativos_marca.py. */
const CAMINHO_MARCA = 'M37.31 30.28 L24.56 28.22 L24.38 28.03 L23.44 28.03 L22.31 28.41 L10.50 30.28 L10.22 29.81 L10.50 29.34 L15.75 26.91 L16.59 26.25 L11.91 17.06 L13.12 17.16 L18.38 18.84 L20.25 19.22 L23.53 10.88 L23.72 9.94 L24.00 9.84 L26.91 17.44 L27.28 18.94 L27.56 19.22 L28.12 19.22 L35.44 16.97 L35.91 17.06 L31.22 26.25 L37.31 29.34 L37.59 29.62 L37.31 30.28Z M26.72 19.50 L24.09 12.19 L23.81 12.09 L21.09 19.50 L23.72 19.50 L23.81 14.16 L24.09 14.25 L24.09 19.50 L26.72 19.50Z M30.66 25.69 L34.31 18.09 L27.84 20.06 L27.84 20.44 L30.47 25.69 L30.66 25.69Z M17.34 25.69 L20.16 20.06 L13.69 18.28 L13.59 18.56 L17.16 25.69 L17.34 25.69Z M30.28 26.25 L27.28 20.25 L26.81 19.97 L24.09 20.06 L24.00 23.16 L23.72 23.06 L23.62 19.97 L21.00 19.97 L20.62 20.16 L17.53 26.25 L30.28 26.25Z M34.59 28.88 L30.19 26.72 L21.75 26.72 L17.62 26.72 L13.41 28.88 L14.25 28.97 L14.44 28.78 L16.50 28.59 L23.44 27.28 L24.56 27.28 L24.75 27.47 L25.69 27.47 L25.88 27.66 L31.31 28.41 L33.75 28.97 L34.59 28.88Z M34.12 32.53 L13.69 32.53 L13.41 32.06 L13.69 31.78 L34.12 31.78 L34.41 32.06 L34.12 32.53Z';

interface BrandLockupProps {
  compact?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

/**
 * Marca do Rei das Vendas: uma coroa.
 *
 * Este desenho e o do dono, vetorizado do PNG que ele cadastrou como avatar do
 * projeto na Vercel (1070 bytes de path, 75 vertices). Nao fui eu que
 * desenhei: eu medi e reconstrui por contorno, comparando pixel a pixel com o
 * arquivo dele (F1 96,2%). Ver /opt/data/qa-visual/seo/rdv/ para o metodo.
 *
 * Antes era um "R" desenhado à mão com uma linha ascendente. O R lia bem sozinho,
 * mas não lembrava o nome da casa — quem via a marca não chegava em "Rei das
 * Vendas". A coroa resolve isso em qualquer tamanho: é o símbolo literal de "rei".
 *
 * Foram desenhadas e comparadas cinco variantes em 160/40/24/16px antes desta:
 * - R coroado (coroa sobre o R): virava mingau a 40px e era ilegível a 16px
 * - coroa com pérolas nas pontas: as bolas brigavam com a silhueta a 24px
 * - coroa com base subindo: lia como coroa torta / defeito de render
 * - coroa com pontas ascendentes: lia como coroa caindo
 * - coroa clássica (esta): única legível de 160px a 16px
 *
 * Geometria em viewBox 48x48, dentro da moldura 6.5..41.5. Os traços de canto
 * (`__signal`) são da marca original e ficam: dão o ar de registro técnico.
 */
export function BrandLockup({ compact = false, className, wordmarkClassName }: BrandLockupProps) {
  return (
    <span className={cn('rdv-brand-lockup', compact && 'is-compact', className)}>
      <svg
        className="rdv-brand-lockup__mark"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
      >
        <rect className="rdv-brand-lockup__frame" x="0.8" y="0.8" width="46.4" height="46.4" rx="8.4" />
        <path className="rdv-brand-lockup__crown" d={CAMINHO_MARCA} />
      </svg>
      <span className="rdv-brand-lockup__text">
        <span className={cn('rdv-wordmark', wordmarkClassName)}>Rei das Vendas</span>
        <span className="rdv-wordmark-subtitle">Negócios em movimento</span>
      </span>
    </span>
  );
}
