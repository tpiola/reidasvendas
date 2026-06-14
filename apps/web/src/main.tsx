import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { initTracking } from './lib/analytics'
import { runAfterFirstPaint } from './lib/defer-idle'

function initThemeClass() {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
      root.classList.add(saved)
      return
    }
  } catch {
    /* localStorage indisponível */
  }
  root.classList.add(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
}

initThemeClass()

// Scroll Progress Bar
const progressBar = document.createElement('div')
progressBar.className = 'scroll-progress'
document.body.appendChild(progressBar)

// IntersectionObserver for scroll-reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
)

// Observe all .reveal elements after DOM is ready
runAfterFirstPaint(() => {
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

runAfterFirstPaint(() => {
  initTracking()
}, 800)

if ('serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => Promise.all(regs.map((r) => r.unregister())))
      .catch(() => undefined)
  }

  if (import.meta.env.PROD) {
    runAfterFirstPaint(() => {
      navigator.serviceWorker.register('/sw.js').catch(() => undefined)
    }, 1200)
  }
}
