import { createReducer, on } from '@ngrx/store';
import { AppState, initialAppState } from './app.state';
import { setTheme, toggleTheme, setPreviewMode } from './app.actions';

/**
 * Root reducer for the application state.
 */
export const appReducer = createReducer(
    initialAppState,

    on(setTheme, (state, { theme }): AppState => ({
        ...state,
        theme,
    })),

    on(toggleTheme, (state): AppState => ({
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),

    on(setPreviewMode, (state, { mode }): AppState => ({
        ...state,
        previewMode: mode,
    }))
);
