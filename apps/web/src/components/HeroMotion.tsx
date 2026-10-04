/** Static vector artwork; only the three outer layers move, through CSS transforms. */
export default function HeroMotion({ active }: { active: boolean }) {
  return (
    <div className="rdv-light-motion" data-motion-active={active ? 'true' : 'false'} aria-hidden="true">
      <svg className="rdv-light-motion__art" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id="rdv-ribbon-metal" x1="118" y1="120" x2="435" y2="485" gradientUnits="userSpaceOnUse">
            <stop stopColor="#44474C" />
            <stop offset=".18" stopColor="#DADDE2" />
            <stop offset=".29" stopColor="#FCFCFA" />
            <stop offset=".43" stopColor="#70777F" />
            <stop offset=".56" stopColor="#1B1E23" />
            <stop offset=".71" stopColor="#A8ADB4" />
            <stop offset=".83" stopColor="#F2F0E9" />
            <stop offset="1" stopColor="#34383F" />
          </linearGradient>
          <linearGradient id="rdv-ribbon-gold" x1="192" y1="457" x2="412" y2="157" gradientUnits="userSpaceOnUse">
            <stop stopColor="#33281A" />
            <stop offset=".24" stopColor="#8E754A" />
            <stop offset=".45" stopColor="#F4E4B9" />
            <stop offset=".62" stopColor="#B59862" />
            <stop offset=".8" stopColor="#FFF2CF" />
            <stop offset="1" stopColor="#5A492F" />
          </linearGradient>
          <linearGradient id="rdv-ribbon-edge" x1="150" y1="105" x2="411" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity=".9" />
            <stop offset=".44" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".6" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="rdv-ribbon-halo">
            <stop stopColor="#CDB483" stopOpacity=".09" />
            <stop offset="1" stopColor="#CDB483" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="240" fill="url(#rdv-ribbon-halo)" />
        <g className="rdv-light-motion__layer rdv-light-motion__back">
          <path d="M154 395C96 347 107 254 185 182C261 111 359 106 413 156C468 207 439 277 374 312L266 370C226 392 218 419 239 438C277 471 366 450 439 390" stroke="#15191D" strokeWidth="40" strokeLinecap="round" />
          <path d="M154 383C96 335 107 242 185 170C261 99 359 94 413 144C468 195 439 265 374 300L266 358C226 380 218 407 239 426C277 459 366 438 439 378" stroke="url(#rdv-ribbon-metal)" strokeWidth="28" strokeLinecap="round" />
          <path d="M145 376C94 328 118 243 192 175C265 109 359 102 407 148" stroke="url(#rdv-ribbon-edge)" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        <g className="rdv-light-motion__layer rdv-light-motion__front">
          <path d="M181 448C233 479 348 436 409 357C463 287 475 213 433 174C400 143 353 149 317 175L239 231C207 254 174 264 150 245C121 222 145 176 187 142" stroke="#0B0C0E" strokeWidth="31" strokeLinecap="round" />
          <path d="M181 444C233 475 348 432 409 353C463 283 475 209 433 170C400 139 353 145 317 171L239 227C207 250 174 260 150 241C121 218 145 172 187 138" stroke="url(#rdv-ribbon-gold)" strokeWidth="17" strokeLinecap="round" />
          <path d="M181 438C233 469 343 425 403 348C456 279 467 210 430 176" stroke="url(#rdv-ribbon-edge)" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        <g className="rdv-light-motion__layer rdv-light-motion__trace">
          <path d="M108 442C76 392 94 329 120 301M414 100C474 131 506 192 494 254M301 487C348 481 397 455 432 421" stroke="#7B7568" strokeOpacity=".5" strokeWidth=".75" strokeLinecap="round" />
          <circle cx="108" cy="442" r="2" fill="#D2BD8B" />
          <circle cx="414" cy="100" r="2" fill="#D2BD8B" />
          <circle cx="301" cy="487" r="2" fill="#D2BD8B" />
        </g>
      </svg>
      <span className="rdv-light-motion__glint" />
    </div>
  );
}
