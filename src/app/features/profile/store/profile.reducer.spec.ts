import { profileReducer } from './profile.reducer';
import { initialProfileState, ProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

describe('ProfileReducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = { type: 'UNKNOWN' };
            const result = profileReducer(initialProfileState, action);
            expect(result).toBe(initialProfileState);
        });
    });

    describe('updatePersonalInfo', () => {
        it('should update personal info', () => {
            const personalInfo = {
                name: 'John Doe',
                role: 'Developer',
                bio: 'Hello world',
                location: 'Earth',
            };
            const action = ProfileActions.updatePersonalInfo({ personalInfo });
            const result = profileReducer(initialProfileState, action);
            expect(result.personalInfo).toEqual(personalInfo);
        });
    });

    describe('updateSocialLinks', () => {
        it('should update social links', () => {
            const socialLinks = {
                github: 'johndoe',
                twitter: 'johndoe_dev',
            };
            const action = ProfileActions.updateSocialLinks({ socialLinks });
            const result = profileReducer(initialProfileState, action);
            expect(result.socialLinks).toEqual(socialLinks);
        });
    });

    describe('techStack actions', () => {
        it('should add a tech badge', () => {
            const badge = { name: 'Angular', color: 'red', logo: 'angular' };
            const action = ProfileActions.addTechBadge({ badge });
            const result = profileReducer(initialProfileState, action);
            expect(result.techStack).toContain(badge);
        });

        it('should remove a tech badge', () => {
            const state = {
                ...initialProfileState,
                techStack: [{ name: 'Angular', color: 'red', logo: 'angular' }],
            };
            const action = ProfileActions.removeTechBadge({ badgeName: 'Angular' });
            const result = profileReducer(state, action);
            expect(result.techStack.length).toBe(0);
        });
    });

    describe('toggleSection', () => {
        it('should toggle section visibility', () => {
            const action = ProfileActions.toggleSection({ section: 'about' });
            const result = profileReducer(initialProfileState, action);
            expect(result.sections.about).toBe(false);
        });
    });

    describe('resetProfile', () => {
        it('should reset to initial state', () => {
            const state: ProfileState = {
                ...initialProfileState,
                personalInfo: { name: 'Dirty State', role: '', bio: '', location: '' },
            };
            const action = ProfileActions.resetProfile();
            const result = profileReducer(state, action);
            expect(result).toEqual(initialProfileState);
        });
    });
});
