import { selectPersonalInfo, selectTechStack, selectSocialLinks, selectSections, selectProfileState } from './profile.selectors';
import { initialProfileState } from './profile.state';

describe('Profile Selectors', () => {
    const state = {
        profile: {
            ...initialProfileState,
            personalInfo: {
                name: 'Test User',
                bio: 'Test Bio',
                role: 'Tester',
                location: 'Test Location'
            }
        }
    };

    it('should select the profile state', () => {
        const result = selectProfileState(state);
        expect(result).toEqual(state.profile);
    });

    it('should select personal info', () => {
        const result = selectPersonalInfo.projector(state.profile);
        expect(result.name).toBe('Test User');
    });


    it('should select tech stack', () => {
        const result = selectTechStack.projector(state.profile);
        expect(result).toEqual([]);
    });

    it('should select social links', () => {
        const result = selectSocialLinks.projector(state.profile);
        expect(result).toEqual(initialProfileState.socialLinks);
    });

    it('should select sections', () => {
        const result = selectSections.projector(state.profile);
        expect(result).toBe(state.profile.sections);
    });
});
