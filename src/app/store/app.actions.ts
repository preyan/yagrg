import { createAction, props } from '@ngrx/store';
import { Theme } from '../core/services/theme.service';

/**
 * Action to set the application theme.
 */
export const setTheme = createAction(
    '[App] Set Theme',
    props<{ theme: Theme }>()
);

/**
 * Action to toggle the application theme.
 */
export const toggleTheme = createAction('[App] Toggle Theme');

/**
 * Action to set the preview mode.
 */
export const setPreviewMode = createAction(
    '[App] Set Preview Mode',
    props<{ mode: 'split' | 'fullscreen' | 'hidden' }>()
);
