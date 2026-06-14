import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Scroll Progress Bar
const bar = document.createElement('div');
bar.className = 'scroll-progress';
document.body.appendChild(bar);

// IntersectionObserver for scroll-reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Observe .reveal elements after mount
const initReveal = () => {
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

// Parallax effect on hero
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

// Init after paint
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
