import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.state';

export const selectProjectState = createFeatureSelector<ProjectState>('project');

export const selectProjectInfo = createSelector(
    selectProjectState,
    (state) => state.projectInfo
);

export const selectProjectFeatures = createSelector(
    selectProjectState,
    (state) => state.features
);

export const selectProjectTechStack = createSelector(
    selectProjectState,
    (state) => state.techStack
);

export const selectInstallation = createSelector(
    selectProjectState,
    (state) => state.installation
);

export const selectUsage = createSelector(
    selectProjectState,
    (state) => state.usage
);
