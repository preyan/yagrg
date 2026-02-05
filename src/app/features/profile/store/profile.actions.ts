import { createAction, props } from '@ngrx/store';
import { PersonalInfo, SocialLinks, TechBadge } from './profile.state';

/**
 * Updates personal information.
 */
export const updatePersonalInfo = createAction(
    '[Profile] Update Personal Info',
    props<{ personalInfo: PersonalInfo }>()
);

/**
 * Updates social links.
 */
export const updateSocialLinks = createAction(
    '[Profile] Update Social Links',
    props<{ socialLinks: SocialLinks }>()
);

/**
 * Adds a tech badge to the stack.
 */
export const addTechBadge = createAction(
    '[Profile] Add Tech Badge',
    props<{ badge: TechBadge }>()
);

/**
 * Removes a tech badge from the stack.
 */
export const removeTechBadge = createAction(
    '[Profile] Remove Tech Badge',
    props<{ badgeName: string }>()
);

/**
 * Toggles a section's visibility.
 */
export const toggleSection = createAction(
    '[Profile] Toggle Section',
    props<{ section: 'about' | 'skills' | 'stats' | 'socials' }>()
);

/**
 * Resets the entire profile state.
 */
export const resetProfile = createAction('[Profile] Reset');
