import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

/**
 * Feature selector for the app state.
 */
export const selectAppState = createFeatureSelector<AppState>('app');

/**
 * Selector for the current theme.
 */
export const selectTheme = createSelector(
    selectAppState,
    (state: AppState) => state.theme
);

/**
 * Selector for checking if dark mode is active.
 */
export const selectIsDarkMode = createSelector(
    selectTheme,
    (theme) => theme === 'dark'
);

/**
 * Selector for the current preview mode.
 */
export const selectPreviewMode = createSelector(
    selectAppState,
    (state: AppState) => state.previewMode
);
