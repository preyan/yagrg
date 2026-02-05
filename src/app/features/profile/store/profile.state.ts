/**
 * Personal information for the GitHub Profile.
 */
export interface PersonalInfo {
    name: string;
    role: string;
    bio: string;
    location: string;
}

/**
 * Social links and handles.
 */
export interface SocialLinks {
    github: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
}

/**
 * Tech stack badge configuration.
 */
export interface TechBadge {
    name: string;
    color: string;
    logo: string;
}

/**
 * Profile Generator feature state.
 */
export interface ProfileState {
    personalInfo: PersonalInfo;
    socialLinks: SocialLinks;
    techStack: TechBadge[];
    sections: {
        about: boolean;
        skills: boolean;
        stats: boolean;
        socials: boolean;
    };
}

/**
 * Initial state for the Profile Generator.
 */
export const initialProfileState: ProfileState = {
    personalInfo: {
        name: '',
        role: '',
        bio: '',
        location: '',
    },
    socialLinks: {
        github: '',
    },
    techStack: [],
    sections: {
        about: true,
        skills: true,
        stats: true,
        socials: true,
    },
};
