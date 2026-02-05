import { Injectable, inject } from '@angular/core';
import { ProfileState } from '../../profile/store/profile.state';
import { ProjectState } from '../../project/store/project.state';
import { BadgeService } from '../../../core/services/badge.service';

@Injectable({
  providedIn: 'root'
})
export class MarkdownComposerService {
  private badgeService = inject(BadgeService);

  /**
   * Composes a profile README in Markdown format.
   */
  composeProfileMarkdown(profile: ProfileState): string {
    const info = profile.personalInfo;
    const social = profile.socialLinks;
    const skills = profile.techStack;

    let markdown = `# Hi, I'm ${info.name || 'Your Name'} 👋\n\n`;

    if (info.bio) {
      markdown += `> ${info.bio}\n\n`;
    }

    if (info.role || info.location) {
      markdown += `📍 **Location:** ${info.location || 'Unknown'}  \n`;
      markdown += `💼 **Role:** ${info.role || 'Developer'}\n\n`;
    }

    if (skills.length > 0) {
      markdown += `## 🛠️ Tech Stack\n\n`;
      markdown += skills.map(skill => `![${skill.name}](${this.badgeService.getBadgeUrl(skill)})`).join(' ');
      markdown += `\n\n`;
    }

    if (Object.values(social).some(val => !!val)) {
      markdown += `## 📫 Reach Out\n\n`;
      if (social.github) markdown += `[![GitHub](https://img.shields.io/badge/GitHub-Black?style=flat&logo=github)](${social.github}) `;
      if (social.linkedin) markdown += `[![LinkedIn](https://img.shields.io/badge/LinkedIn-Blue?style=flat&logo=linkedin)](${social.linkedin}) `;
      if (social.twitter) markdown += `[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter)](${social.twitter}) `;
      if (social.website) markdown += `[![Website](https://img.shields.io/badge/Website-4CAF50?style=flat&logo=google-chrome)](${social.website}) `;
      markdown += `\n`;
    }

    return markdown;
  }

  /**
   * Composes a project README in Markdown format.
   */
  composeProjectMarkdown(project: ProjectState): string {
    const info = project.projectInfo;
    const features = project.features;
    const install = project.installation;
    const usage = project.usage;
    const stack = project.techStack;

    let markdown = `# ${info.name || 'Project Name'}\n\n`;

    if (info.description) {
      markdown += `${info.description}\n\n`;
    }

    if (stack.length > 0) {
      markdown += stack.map(skill => `![${skill.name}](${this.badgeService.getBadgeUrl(skill)})`).join(' ');
      markdown += `\n\n`;
    }

    if (features.length > 0) {
      markdown += `## ✨ Features\n\n`;
      markdown += features.map(f => `- **${f.title}**: ${f.description}`).join('\n');
      markdown += `\n\n`;
    }

    if (install.prerequisites.length > 0 || install.steps.length > 0) {
      markdown += `## 🚀 Installation\n\n`;
      if (install.prerequisites.length > 0) {
        markdown += `### Prerequisites\n\n`;
        markdown += install.prerequisites.map(p => `- ${p}`).join('\n');
        markdown += `\n\n`;
      }
      if (install.steps.length > 0) {
        markdown += `### Steps\n\n`;
        markdown += install.steps.map(s => `1. **${s.step}**  \n   \`\`\`bash\n   ${s.command}\n   \`\`\``).join('\n');
        markdown += `\n\n`;
      }
    }

    if (usage.description || usage.codeSnippet) {
      markdown += `## 💡 Usage\n\n`;
      if (usage.description) markdown += `${usage.description}\n\n`;
      if (usage.codeSnippet) {
        markdown += `\`\`\`bash\n${usage.codeSnippet}\n\`\`\`\n\n`;
      }
    }

    if (info.license) {
      markdown += `## License\n\n`;
      markdown += `This project is licensed under the ${info.license} License.`;
      if (info.author) markdown += ` - &copy; ${info.author}`;
    }

    return markdown;
  }
}
