import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ProjectInfoFormComponent } from './project-info-form.component';
import { initialProjectState } from '../../store/project.state';
import { ProjectActions } from '../../store/project.actions';

describe('ProjectInfoFormComponent', () => {
  let component: ProjectInfoFormComponent;
  let fixture: ComponentFixture<ProjectInfoFormComponent>;
  let store: MockStore;

  beforeEach(async () => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    await TestBed.configureTestingModule({
      declarations: [ProjectInfoFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: { project: initialProjectState }
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectInfoFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch updateProjectInfo when form value changes', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.projectInfoForm.patchValue({
      name: 'New Project',
      description: 'Test Description',
      version: '1.0.0',
      license: 'MIT'
    });

    // Wait for debounceTime(500)
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(dispatchSpy).toHaveBeenCalled();
    const action = dispatchSpy.mock.calls[0][0] as unknown as ReturnType<typeof ProjectActions.updateProjectInfo>;
    expect(action.type).toBe(ProjectActions.updateProjectInfo.type);
    expect(action.projectInfo.name).toBe('New Project');
  });
});
