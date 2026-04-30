import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * AnalyticsProvider
 * Centraliza o tracking de Ad-Tech (Google, Meta, TikTok, Bing) e PageViews.
 */
export function AnalyticsProvider() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    
    // [MVO Rei das Vendas] PageView Tracking
    // console.log(`[Analytics] PageView: ${pagePath}`);

    // 1. Google Tag Manager (GTM) / Google Analytics 4 (GA4)
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('config', 'G-XXXXXXXXXX', { page_path: pagePath });
    // }

    // 2. Meta Pixel (Facebook)
    // if (typeof window !== 'undefined' && window.fbq) {
    //   window.fbq('track', 'PageView');
    // }

    // 3. TikTok Pixel
    // if (typeof window !== 'undefined' && window.ttq) {
    //   window.ttq.page();
    // }

    // 4. Bing Ads (UET)
    // if (typeof window !== 'undefined' && window.uetq) {
    //   window.uetq.push('pageLoad');
    // }

  }, [location.pathname, location.search]);

  return null;
}

/**
 * Dispara eventos de conversão padronizados para todas as plataformas de Ad-Tech.
 */
export function trackConversion(eventName: string, payload?: Record<string, unknown>) {
  // console.log(`[Analytics] Conversion: ${eventName}`, payload);

  // 1. Google Ads / GA4
  // if (typeof window !== 'undefined' && window.gtag) {
  //   window.gtag('event', eventName, payload);
  // }

  // 2. Meta Pixel
  // if (typeof window !== 'undefined' && window.fbq) {
  //   window.fbq('track', eventName, payload);
  // }

  // 3. TikTok Pixel
  // if (typeof window !== 'undefined' && window.ttq) {
  //   window.ttq.track(eventName, payload);
  // }

  // 4. Bing Ads
  // if (typeof window !== 'undefined' && window.uetq) {
  //   window.uetq.push({ 'ec': 'Conversion', 'ea': eventName, ...payload });
  // }
}
