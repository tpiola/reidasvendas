import { useState } from 'react';

/** The brand stays still; only lightweight surrounding layers rotate. */
export default function HeroMotion({ active }: { active: boolean }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="rdv-light-motion" data-motion-active={active && !paused ? 'true' : 'false'}>
      <div className="rdv-logo-scene" aria-hidden="true">
        <div className="rdv-logo-scene__halo" />
        <svg className="rdv-logo-scene__grid" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="242" />
          <circle cx="300" cy="300" r="205" strokeDasharray="1 12" />
          <path d="M300 30V74M300 526V570M30 300H74M526 300H570M109 109L137 137M463 463L491 491M109 491L137 463M463 137L491 109" />
          <path d="M87 244H128L160 212H184M416 388H440L472 356H513" />
          <circle cx="87" cy="244" r="3" /><circle cx="513" cy="356" r="3" />
        </svg>
        <div className="rdv-logo-scene__orbit rdv-logo-scene__orbit--outer"><span /></div>
        <div className="rdv-logo-scene__orbit rdv-logo-scene__orbit--inner"><span /></div>
        <div className="rdv-logo-scene__equator"><div className="rdv-logo-scene__orbit rdv-logo-scene__orbit--tilted"><span /></div></div>
        <div className="rdv-logo-scene__core">
          <img src="/logo-mark.svg" width="240" height="240" alt="" decoding="async" />
          <span className="rdv-logo-scene__shine" />
        </div>
        <span className="rdv-logo-scene__signature">REI DAS VENDAS</span>
      </div>
      <button
        type="button"
        className="rdv-logo-scene__control"
        aria-label={paused ? 'Retomar animação' : 'Pausar animação'}
        aria-pressed={paused}
        onClick={() => setPaused(value => !value)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          {paused ? <path d="M4 2L13 8L4 14Z" /> : <path d="M4 3H6V13H4ZM10 3H12V13H10Z" />}
        </svg>
      </button>
    </div>
  );
}
