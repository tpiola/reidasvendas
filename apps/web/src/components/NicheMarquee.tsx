import { BRAND } from '@/lib/brand';

const niches = [
  { label: 'Calçadista', image: BRAND.images.nichos.calcadista },
  { label: 'Comércio', image: BRAND.images.nichos.comercio },
  { label: 'Indústria', image: BRAND.images.nichos.industria },
  { label: 'Saúde', image: BRAND.images.nichos.saude },
  { label: 'Serviços', image: BRAND.images.nichos.servicos },
  { label: 'Educação', image: BRAND.images.nichos.educacao },
];

function NicheRow() {
  return (
    <div className="rdv-niche-row">
      {niches.map((niche) => (
        <div key={niche.label} className="rdv-niche-item">
          <img src={niche.image} alt="" loading="lazy" decoding="async" width={36} height={36} />
          <span className="font-serif text-lg font-semibold text-[#F5F5F5] sm:text-xl">{niche.label}</span>
          <span className="rdv-niche-dot" aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function NicheMarquee() {
  return (
    <div className="rdv-marquee" aria-label="Segmentos atendidos">
      <div className="rdv-marquee-track">
        <NicheRow />
        <NicheRow />
      </div>
    </div>
  );
}
