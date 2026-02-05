import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProjectInfo, ProjectFeature, InstallationStep } from './project.state';
import { TechBadge } from '../../profile/store/profile.state';

export const ProjectActions = createActionGroup({
    source: 'Project Generator',
    events: {
        'Update Project Info': props<{ projectInfo: ProjectInfo }>(),
        'Update Features': props<{ features: ProjectFeature[] }>(),
        'Add Feature': props<{ feature: ProjectFeature }>(),
        'Remove Feature': props<{ index: number }>(),
        'Update Tech Stack': props<{ stack: TechBadge[] }>(),
        'Add Tech Badge': props<{ badge: TechBadge }>(),
        'Remove Tech Badge': props<{ badgeName: string }>(),
        'Update Installation': props<{ prerequisites: string[], steps: InstallationStep[] }>(),
        'Update Usage': props<{ description: string, codeSnippet: string }>(),
        'Reset Project': emptyProps(),
    }
});
