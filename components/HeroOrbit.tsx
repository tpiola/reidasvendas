export default function HeroOrbit() {
  return (
    <div className="royal-scene" data-paused="false" data-active="false">
      <div className="royal-scene-art" aria-hidden="true">
        <div className="royal-grid" />
        <div className="royal-ring royal-ring-outer">
          <i />
        </div>
        <div className="royal-ring royal-ring-inner">
          <i />
        </div>
        <div className="royal-axis" />
        <div className="royal-core">
          <img
            src="/logo/original-mark.svg"
            width="260"
            height="260"
            alt=""
            fetchPriority="high"
          />
        </div>
        <span className="royal-node royal-node-site">
          <span>01</span> Seu site
        </span>
        <span className="royal-node royal-node-search">
          <span>02</span> Busca local
        </span>
        <span className="royal-node royal-node-contact">
          <span>03</span> O próximo contato <b>↗</b>
        </span>
      </div>
      <div className="royal-scene-footer">
        <p>
          Uma presença conectada.
          <br />
          <strong>Do seu negócio ao seu cliente.</strong>
        </p>
        <button
          type="button"
          className="royal-motion-control"
          aria-label="Pausar animação"
          aria-pressed="false"
          data-motion-toggle
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path className="motion-play" d="m5 3 8 5-8 5Z" />
            <path className="motion-pause" d="M4 3h3v10H4zm5 0h3v10H9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
