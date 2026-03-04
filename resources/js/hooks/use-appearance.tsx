import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
    readonly effectsEnabled: boolean;
    readonly toggleEffects: () => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';
let currentEffectsEnabled: boolean = true;

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('appearance') as Appearance) || 'system';
};

const getStoredEffects = (): boolean => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('effects-enabled') !== 'false';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance, effects: boolean): void => {
    if (typeof document === 'undefined') return;

    const isDark = isDarkMode(appearance);
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('no-effects', !effects);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia('(prefers-color-scheme: dark)');
};

export function initializeTheme(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    currentAppearance = getStoredAppearance();
    currentEffectsEnabled = getStoredEffects();
    applyTheme(currentAppearance, currentEffectsEnabled);

    mediaQuery()?.addEventListener('change', () => applyTheme(currentAppearance, currentEffectsEnabled));
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const effectsEnabled: boolean = useSyncExternalStore(
        subscribe,
        () => currentEffectsEnabled,
        () => true,
    );

    const resolvedAppearance: ResolvedAppearance = useMemo(
        () => (isDarkMode(appearance) ? 'dark' : 'light'),
        [appearance],
    );

    const updateAppearance = useCallback((mode: Appearance): void => {
        currentAppearance = mode;
        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);
        applyTheme(mode, currentEffectsEnabled);
        notify();
    }, []);

    const toggleEffects = useCallback((): void => {
        currentEffectsEnabled = !currentEffectsEnabled;
        localStorage.setItem('effects-enabled', String(currentEffectsEnabled));
        applyTheme(currentAppearance, currentEffectsEnabled);
        notify();
    }, []);

    return { appearance, resolvedAppearance, updateAppearance, effectsEnabled, toggleEffects } as const;
}