import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Scroll Progress Bar
const bar = document.createElement('div');
bar.className = 'scroll-progress';
document.body.appendChild(bar);

// ─── Reveal: visível imediatamente se estiver acima da dobra ───
const ELEMENTS_BEFORE_REVEAL = 6; // primeiros N elementos .reveal ficam visíveis de cara

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);

const initReveal = () => {
  const elements = document.querySelectorAll('.reveal');
  elements.forEach((el, index) => {
    (el as HTMLElement).style.transitionDelay = `${Math.min(index * 60, 400)}ms`;
    // Acima da dobra: já aparece visível
    if (index < ELEMENTS_BEFORE_REVEAL) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
};

// Parallax
const initParallax = () => {
  const hero = document.querySelector('.hero-parallax');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    (hero as HTMLElement).style.transform = `translateY(${scrolled * 0.3}px)`;
  }, { passive: true });
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

requestAnimationFrame(() => {
  initReveal();
  initParallax();
});

// Service Worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
