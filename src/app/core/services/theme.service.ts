import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Theme type definition.
 */
export type Theme = 'light' | 'dark';

/**
 * Service responsible for managing the application's visual theme.
 * Supports light/dark mode with persistence to localStorage.
 *
 * @example
 * ```typescript
 * constructor(private themeService: ThemeService) {
 *   themeService.toggleTheme();
 * }
 * ```
 */
@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly STORAGE_KEY = 'yagrg-theme';
    private readonly themeSignal = signal<Theme>('light');

    /**
     * Read-only signal for the current theme.
     */
    readonly currentTheme = this.themeSignal.asReadonly();

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        // Initialize theme from localStorage after platformId is available
        this.themeSignal.set(this.getInitialTheme());
        // Apply theme to document on changes
        effect(() => {
            this.applyTheme(this.themeSignal());
        });
    }

    /**
     * Gets the initial theme from localStorage or defaults to 'light'.
     * @returns The initial theme.
     */
    private getInitialTheme(): Theme {
        if (isPlatformBrowser(this.platformId)) {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored === 'dark' || stored === 'light') {
                return stored;
            }
            // Check system preference
            if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    }

    /**
     * Toggles the theme between light and dark.
     */
    toggleTheme(): void {
        const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    /**
     * Sets the theme explicitly.
     * @param theme - The theme to set ('light' or 'dark').
     */
    setTheme(theme: Theme): void {
        this.themeSignal.set(theme);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, theme);
        }
    }

    /**
     * Checks if the current theme is dark mode.
     * @returns True if dark mode is active.
     */
    isDarkMode(): boolean {
        return this.themeSignal() === 'dark';
    }

    /**
     * Applies the theme to the document body.
     * @param theme - The theme to apply.
     */
    private applyTheme(theme: Theme): void {
        if (isPlatformBrowser(this.platformId)) {
            document.body.setAttribute('data-theme', theme);
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }
}
