import { appReducer } from './app.reducer';
import { initialAppState, AppState } from './app.state';
import { setTheme, toggleTheme, setPreviewMode } from './app.actions';

describe('AppReducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = { type: 'UNKNOWN' };
            const result = appReducer(initialAppState, action);
            expect(result).toBe(initialAppState);
        });
    });

    describe('setTheme action', () => {
        it('should set theme to dark', () => {
            const action = setTheme({ theme: 'dark' });
            const result = appReducer(initialAppState, action);
            expect(result.theme).toBe('dark');
        });

        it('should set theme to light', () => {
            const darkState: AppState = { ...initialAppState, theme: 'dark' };
            const action = setTheme({ theme: 'light' });
            const result = appReducer(darkState, action);
            expect(result.theme).toBe('light');
        });
    });

    describe('toggleTheme action', () => {
        it('should toggle theme from light to dark', () => {
            const action = toggleTheme();
            const result = appReducer(initialAppState, action);
            expect(result.theme).toBe('dark');
        });

        it('should toggle theme from dark to light', () => {
            const darkState: AppState = { ...initialAppState, theme: 'dark' };
            const action = toggleTheme();
            const result = appReducer(darkState, action);
            expect(result.theme).toBe('light');
        });
    });

    describe('setPreviewMode action', () => {
        it('should set preview mode to fullscreen', () => {
            const action = setPreviewMode({ mode: 'fullscreen' });
            const result = appReducer(initialAppState, action);
            expect(result.previewMode).toBe('fullscreen');
        });

        it('should set preview mode to hidden', () => {
            const action = setPreviewMode({ mode: 'hidden' });
            const result = appReducer(initialAppState, action);
            expect(result.previewMode).toBe('hidden');
        });

        it('should set preview mode to split', () => {
            const fullscreenState: AppState = { ...initialAppState, previewMode: 'fullscreen' };
            const action = setPreviewMode({ mode: 'split' });
            const result = appReducer(fullscreenState, action);
            expect(result.previewMode).toBe('split');
        });
    });
});
