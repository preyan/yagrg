import { createReducer, on } from '@ngrx/store';
import { initialProjectState, ProjectState } from './project.state';
import { ProjectActions } from './project.actions';

export const projectReducer = createReducer(
    initialProjectState,

    on(ProjectActions.updateProjectInfo, (state, { projectInfo }): ProjectState => ({
        ...state,
        projectInfo,
    })),

    on(ProjectActions.addFeature, (state, { feature }): ProjectState => ({
        ...state,
        features: [...state.features, feature],
    })),

    on(ProjectActions.removeFeature, (state, { featureTitle }): ProjectState => ({
        ...state,
        features: state.features.filter(f => f.title !== featureTitle),
    })),

    on(ProjectActions.addTechBadge, (state, { badge }): ProjectState => ({
        ...state,
        techStack: [...state.techStack, badge],
    })),

    on(ProjectActions.removeTechBadge, (state, { badgeName }): ProjectState => ({
        ...state,
        techStack: state.techStack.filter(b => b.name !== badgeName),
    })),

    on(ProjectActions.updateInstallation, (state, { prerequisites, steps }): ProjectState => ({
        ...state,
        installation: { prerequisites, steps },
    })),

    on(ProjectActions.updateUsage, (state, { description, codeSnippet }): ProjectState => ({
        ...state,
        usage: { description, codeSnippet },
    })),

    on(ProjectActions.resetProject, () => initialProjectState)
);
