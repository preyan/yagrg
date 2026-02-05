import { TestBed } from '@angular/core/testing';
import { MarkdownComposerService } from './markdown-composer';
import { provideMockStore } from '@ngrx/store/testing';
import { initialProfileState } from '../../features/profile/store/profile.state';
import { initialProjectState } from '../../features/project/store/project.state';

describe('MarkdownComposerService', () => {
  let service: MarkdownComposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MarkdownComposerService,
        provideMockStore({
          initialState: {
            profile: initialProfileState,
            project: initialProjectState
          }
        })
      ]
    });
    service = TestBed.inject(MarkdownComposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('composeProfileMarkdown', () => {
    it('should generate markdown with name and bio', () => {
      const profile = {
        ...initialProfileState,
        personalInfo: {
          name: 'John Doe',
          bio: 'Developer',
          role: 'Fullstack',
          location: 'Remote'
        }
      };

      const markdown = service.composeProfileMarkdown(profile);
      expect(markdown).toContain('# Hi, I\'m John Doe');
      expect(markdown).toContain('Developer');
      expect(markdown).toContain('Location:** Remote');
      expect(markdown).toContain('Role:** Fullstack');
    });

    it('should handle missing bio and role', () => {
      const profile = {
        ...initialProfileState,
        personalInfo: {
          name: 'John Doe',
          bio: '',
          role: '',
          location: ''
        }
      };
      const markdown = service.composeProfileMarkdown(profile);
      expect(markdown).not.toContain('>');
      expect(markdown).not.toContain('Location:');
    });

    it('should include tech stack badges', () => {
      const profile = {
        ...initialProfileState,
        techStack: [{ name: 'Angular', color: 'DD0031', logo: 'angular' }]
      };
      const markdown = service.composeProfileMarkdown(profile);
      expect(markdown).toContain('## 🛠️ Tech Stack');
      expect(markdown).toContain('![Angular]');
    });

    it('should include social links', () => {
      const profile = {
        ...initialProfileState,
        socialLinks: {
          github: 'gh',
          linkedin: 'li',
          twitter: 'tw',
          website: 'web'
        }
      };
      const markdown = service.composeProfileMarkdown(profile);
      expect(markdown).toContain('## 📫 Reach Out');
      expect(markdown).toContain('[![GitHub]');
      expect(markdown).toContain('[![LinkedIn]');
      expect(markdown).toContain('[![Twitter]');
      expect(markdown).toContain('[![Website]');
    });
  });

  describe('composeProjectMarkdown', () => {
    it('should generate markdown with project title and description', () => {
      const project = {
        ...initialProjectState,
        projectInfo: {
          name: 'Awesome Project',
          description: 'A cool app',
          version: '1.0.0',
          license: 'MIT',
          author: 'Jane'
        }
      };

      const markdown = service.composeProjectMarkdown(project);
      expect(markdown).toContain('# Awesome Project');
      expect(markdown).toContain('A cool app');
      expect(markdown).toContain('## License');
      expect(markdown).toContain('MIT');
    });

    it('should include features', () => {
      const project = {
        ...initialProjectState,
        features: [{ title: 'Fast', description: 'Very fast' }]
      };
      const markdown = service.composeProjectMarkdown(project);
      expect(markdown).toContain('## ✨ Features');
      expect(markdown).toContain('**Fast**: Very fast');
    });

    it('should include installation steps', () => {
      const project = {
        ...initialProjectState,
        installation: {
          prerequisites: ['Node'],
          steps: [{ step: 'Install', command: 'npm i' }]
        }
      };
      const markdown = service.composeProjectMarkdown(project);
      expect(markdown).toContain('## 🚀 Installation');
      expect(markdown).toContain('### Prerequisites');
      expect(markdown).toContain('- Node');
      expect(markdown).toContain('### Steps');
      expect(markdown).toContain('\`\`\`bash\n   npm i');
    });

    it('should include usage and tech stack', () => {
      const project = {
        ...initialProjectState,
        usage: { description: 'Use it well', codeSnippet: 'run app' },
        techStack: [{ name: 'React', color: '61DAFB', logo: 'react' }]
      };
      const markdown = service.composeProjectMarkdown(project);
      expect(markdown).toContain('## 💡 Usage');
      expect(markdown).toContain('Use it well');
      expect(markdown).toContain('![React]');
    });
  });

});
