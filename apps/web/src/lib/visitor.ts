/** Perfil leve do visitante — personalização do assistente (LGPD: só após consentimento no formulário) */

const PROFILE_KEY = 'rdv-visitor-profile';

export type VisitorProfile = {
  firstName?: string;
  email?: string;
  updatedAt: string;
};

export function saveVisitorProfile(partial: Pick<VisitorProfile, 'firstName' | 'email'>) {
  if (typeof window === 'undefined') return;
  try {
    const prev = getVisitorProfile();
    const firstName =
      partial.firstName?.trim().split(/\s+/)[0] || prev?.firstName;
    const email = partial.email?.trim().toLowerCase() || prev?.email;
    const profile: VisitorProfile = {
      firstName,
      email,
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* storage indisponível */
  }
}

export function getVisitorProfile(): VisitorProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as VisitorProfile;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function getVisitorFirstName(): string | null {
  const name = getVisitorProfile()?.firstName?.trim();
  return name && name.length >= 2 ? name : null;
}
