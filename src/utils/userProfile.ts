export interface UserProfile {
  name: string;
  gender: string;
  age: string;
}

const STORAGE_KEY = "zen-user-profile";

export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearUserProfile(): void {
  localStorage.removeItem(STORAGE_KEY);
}
