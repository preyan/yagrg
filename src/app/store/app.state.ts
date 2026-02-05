import { Theme } from '../core/services/theme.service';

/**
 * Root application state interface.
 * Defines the shape of the global NgRx store.
 */
export interface AppState {
    /**
     * Current UI theme preference.
     */
    theme: Theme;

    /**
     * Current preview mode for README output.
     */
    previewMode: 'split' | 'fullscreen' | 'hidden';
}

/**
 * Initial state for the application.
 */
export const initialAppState: AppState = {
    theme: 'light',
    previewMode: 'split',
};
