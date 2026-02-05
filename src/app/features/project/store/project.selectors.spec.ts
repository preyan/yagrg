import { selectProjectInfo, selectProjectFeatures, selectInstallation, selectUsage, selectProjectTechStack, selectProjectState } from './project.selectors';
import { initialProjectState } from './project.state';

describe('Project Selectors', () => {
    const state = {
        project: {
            ...initialProjectState,
            projectInfo: {
                name: 'Test Project',
                description: 'Test Desc',
                version: '1.0.0',
                license: 'MIT',
                author: 'Tester'
            }
        }
    };

    it('should select the project state', () => {
        const result = selectProjectState(state);
        expect(result).toEqual(state.project);
    });

    it('should select project info', () => {
        const result = selectProjectInfo.projector(state.project);
        expect(result.name).toBe('Test Project');
    });

    it('should select features', () => {
        const result = selectProjectFeatures.projector(state.project);
        expect(result).toEqual([]);
    });

    it('should select installation', () => {
        const result = selectInstallation.projector(state.project);
        expect(result).toEqual(initialProjectState.installation);
    });

    it('should select usage', () => {
        const result = selectUsage.projector(state.project);
        expect(result).toEqual(initialProjectState.usage);
    });

    it('should select tech stack', () => {
        const result = selectProjectTechStack.projector(state.project);
        expect(result).toEqual([]);
    });
});
