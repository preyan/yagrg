import { projectReducer } from './project.reducer';
import { ProjectActions } from './project.actions';
import { initialProjectState, ProjectState } from './project.state';
import { Action } from '@ngrx/store';

describe('Project Reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as Action;
        const state = projectReducer(initialProjectState, action);
        expect(state).toBe(initialProjectState);
    });

    it('should update project info', () => {
        const projectInfo = {
            name: 'New Project',
            description: 'Desc',
            version: '2.0.0',
            license: 'GPL',
            author: 'Jane Doe'
        };
        const action = ProjectActions.updateProjectInfo({ projectInfo });
        const state = projectReducer(initialProjectState, action);

        expect(state.projectInfo).toEqual(projectInfo);
    });

    it('should add a feature', () => {
        const feature = { title: 'Fast', description: 'Really fast' };
        const action = ProjectActions.addFeature({ feature });
        const state = projectReducer(initialProjectState, action);

        expect(state.features.length).toBe(1);
        expect(state.features[0]).toEqual(feature);
    });

    it('should remove a feature', () => {
        const initialState: ProjectState = {
            ...initialProjectState,
            features: [{ title: 'Delete Me', description: 'Bye' }]
        };
        const action = ProjectActions.removeFeature({ featureTitle: 'Delete Me' });
        const state = projectReducer(initialState, action);

        expect(state.features.length).toBe(0);
    });

    it('should reset the project state', () => {
        const dirtyState: ProjectState = {
            ...initialProjectState,
            projectInfo: { ...initialProjectState.projectInfo, name: 'Dirty' }
        };
        const action = ProjectActions.resetProject();
        const state = projectReducer(dirtyState, action);

        expect(state).toEqual(initialProjectState);
    });
});
