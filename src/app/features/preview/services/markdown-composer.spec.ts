import { TestBed } from '@angular/core/testing';
import { MarkdownComposerService } from './markdown-composer';
import { provideMockStore } from '@ngrx/store/testing';
import { initialProfileState } from '../../profile/store/profile.state';
import { initialProjectState } from '../../project/store/project.state';

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
  });
});
