import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Theme type definition.
 */
export type Theme = 'light' | 'dark';

/**
 * Service responsible for managing the application's visual theme.
 * Supports light/dark mode with persistence to localStorage.
 */
@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly STORAGE_KEY = 'yagrg-theme';
    private readonly themeSignal = signal<Theme>('light');

    /**
     * Read-only signal for the current theme.
     */
    readonly currentTheme = this.themeSignal.asReadonly();

    constructor() {
        // Initialize theme from localStorage
        this.themeSignal.set(this.getInitialTheme());
        // Apply theme to document on changes
        effect(() => {
            this.applyTheme(this.themeSignal());
        });
    }

    /**
     * Toggles the theme between light and dark.
     */
    toggleTheme(): void {
        this.themeSignal.update((t) => (t === 'light' ? 'dark' : 'light'));
    }

    /**
     * Sets a specific theme.
     * @param theme - The theme to set.
     */
    setTheme(theme: Theme): void {
        this.themeSignal.set(theme);
    }

    /**
     * Determines if the current theme is dark mode.
     * @returns True if dark mode is active.
     */
    isDarkMode(): boolean {
        return this.themeSignal() === 'dark';
    }

    /**
     * Gets the initial theme based on localStorage or system preference.
     */
    private getInitialTheme(): Theme {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
            if (savedTheme) {
                return savedTheme;
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    }

    /**
     * Applies the theme to the document and persists it.
     */
    private applyTheme(theme: Theme): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.setAttribute('data-bs-theme', theme);
            localStorage.setItem(this.STORAGE_KEY, theme);
        }
    }
}
