import { createReducer, on } from '@ngrx/store';
import { initialProfileState, ProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

export const profileReducer = createReducer(
    initialProfileState,

    on(ProfileActions.updatePersonalInfo, (state, { personalInfo }): ProfileState => ({
        ...state,
        personalInfo,
    })),

    on(ProfileActions.updateSocialLinks, (state, { socialLinks }): ProfileState => ({
        ...state,
        socialLinks,
    })),

    on(ProfileActions.addTechBadge, (state, { badge }): ProfileState => ({
        ...state,
        techStack: [...state.techStack, badge],
    })),

    on(ProfileActions.removeTechBadge, (state, { badgeName }): ProfileState => ({
        ...state,
        techStack: state.techStack.filter(b => b.name !== badgeName),
    })),

    on(ProfileActions.toggleSection, (state, { section }): ProfileState => ({
        ...state,
        sections: {
            ...state.sections,
            [section]: !state.sections[section],
        },
    })),

    on(ProfileActions.resetProfile, () => initialProfileState)
);
