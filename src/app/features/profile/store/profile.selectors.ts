import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

/**
 * Feature selector for the profile state.
 */
export const selectProfileState = createFeatureSelector<ProfileState>('profile');

/**
 * Selector for personal information.
 */
export const selectPersonalInfo = createSelector(
    selectProfileState,
    (state: ProfileState) => state.personalInfo
);

/**
 * Selector for social links.
 */
export const selectSocialLinks = createSelector(
    selectProfileState,
    (state: ProfileState) => state.socialLinks
);

/**
 * Selector for the tech stack.
 */
export const selectTechStack = createSelector(
    selectProfileState,
    (state: ProfileState) => state.techStack
);

/**
 * Selector for section visibility toggles.
 */
export const selectSections = createSelector(
    selectProfileState,
    (state: ProfileState) => state.sections
);
