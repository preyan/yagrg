import { TechBadge } from '../../profile/store/profile.state';

/**
 * Project metadata information.
 */
export interface ProjectInfo {
    name: string;
    description: string;
    version: string;
    license: string;
    author: string;
}

/**
 * Project feature item.
 */
export interface ProjectFeature {
    title: string;
    description: string;
}

/**
 * Installation step.
 */
export interface InstallationStep {
    step: string;
    command: string;
}

/**
 * Project Generator feature state.
 */
export interface ProjectState {
    projectInfo: ProjectInfo;
    features: ProjectFeature[];
    techStack: TechBadge[];
    installation: {
        prerequisites: string[];
        steps: InstallationStep[];
    };
    usage: {
        description: string;
        codeSnippet: string;
    };
}

/**
 * Initial state for the Project Generator.
 */
export const initialProjectState: ProjectState = {
    projectInfo: {
        name: '',
        description: '',
        version: '1.0.0',
        license: 'MIT',
        author: '',
    },
    features: [],
    techStack: [],
    installation: {
        prerequisites: [],
        steps: [],
    },
    usage: {
        description: '',
        codeSnippet: '',
    },
};
