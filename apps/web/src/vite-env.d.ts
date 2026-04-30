/// <reference types="vite/client" />

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }

  interface ImportMetaEnv {
    readonly VITE_GTM_ID?: string;
    readonly VITE_GA4_ID?: string;
    readonly VITE_GSC_VERIFICATION?: string;
    readonly VITE_CHAT_ENABLED?: string;
    readonly VITE_VOICE_ENABLED?: string;
    readonly VITE_SOCIAL_INSTAGRAM?: string;
    readonly VITE_SOCIAL_YOUTUBE?: string;
    readonly VITE_SOCIAL_LINKEDIN?: string;
    readonly VITE_SOCIAL_FACEBOOK?: string;
    readonly VITE_SOCIAL_X?: string;
  }
}

export {};
