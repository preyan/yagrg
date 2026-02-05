import { Action } from '@ngrx/store';
import { projectReducer } from './project.reducer';
import { initialProjectState, ProjectState } from './project.state';
import { ProjectActions } from './project.actions';

describe('Project Reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as Action;
        const state = projectReducer(initialProjectState, action);
        expect(state).toBe(initialProjectState);
    });

    it('should update project info', () => {
        const info = {
            name: 'New Project',
            description: 'Desc',
            version: '1.0.0',
            license: 'MIT',
            author: 'Jane'
        };
        const action = ProjectActions.updateProjectInfo({ projectInfo: info });
        const state = projectReducer(initialProjectState, action);
        expect(state.projectInfo).toEqual(info);
    });

    it('should add a feature', () => {
        const feature = { title: 'New Feature', description: 'Desc' };
        const action = ProjectActions.addFeature({ feature });
        const state = projectReducer(initialProjectState, action);
        expect(state.features).toContain(feature);
    });

    it('should remove a feature', () => {
        const feature = { title: 'Feature 1', description: 'Desc' };
        const stateWithFeatures: ProjectState = {
            ...initialProjectState,
            features: [feature]
        };
        const action = ProjectActions.removeFeature({ index: 0 });
        const state = projectReducer(stateWithFeatures, action);
        expect(state.features).not.toContain(feature);
    });

    it('should update features list', () => {
        const features = [{ title: 'F1', description: 'D1' }, { title: 'F2', description: 'D2' }];
        const action = ProjectActions.updateFeatures({ features });
        const state = projectReducer(initialProjectState, action);
        expect(state.features).toEqual(features);
    });

    it('should update installation', () => {
        const installation = { prerequisites: ['P1'], steps: [{ step: 'S1', command: 'C1' }] };
        const action = ProjectActions.updateInstallation(installation);
        const state = projectReducer(initialProjectState, action);
        expect(state.installation).toEqual(installation);
    });

    it('should update usage', () => {
        const usage = { description: 'U1', codeSnippet: 'CS1' };
        const action = ProjectActions.updateUsage(usage);
        const state = projectReducer(initialProjectState, action);
        expect(state.usage).toEqual(usage);
    });

    it('should add a tech badge', () => {
        const badge = { name: 'B1', color: 'C1', logo: 'L1' };
        const action = ProjectActions.addTechBadge({ badge });
        const state = projectReducer(initialProjectState, action);
        expect(state.techStack).toContain(badge);
    });

    it('should remove a tech badge', () => {
        const badge = { name: 'B1', color: 'C1', logo: 'L1' };
        const stateWithBadge = { ...initialProjectState, techStack: [badge] };
        const action = ProjectActions.removeTechBadge({ badgeName: 'B1' });
        const state = projectReducer(stateWithBadge, action);
        expect(state.techStack).not.toContain(badge);
    });

    it('should reset project state', () => {
        const modifiedState: ProjectState = {
            ...initialProjectState,
            projectInfo: { ...initialProjectState.projectInfo, name: 'Modified' }
        };
        const action = ProjectActions.resetProject();
        const state = projectReducer(modifiedState, action);
        expect(state).toEqual(initialProjectState);
    });

});
