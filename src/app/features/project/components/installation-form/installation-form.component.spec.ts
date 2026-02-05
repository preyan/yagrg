import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { InstallationFormComponent } from './installation-form.component';
import { initialProjectState } from '../../store/project.state';
import { ProjectActions } from '../../store/project.actions';

describe('InstallationFormComponent', () => {
  let component: InstallationFormComponent;
  let fixture: ComponentFixture<InstallationFormComponent>;
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
      declarations: [InstallationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: { project: initialProjectState }
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstallationFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a prerequisite when addPrerequisite is called', () => {
    const initialLength = component.prerequisites.length;
    component.addPrerequisite();
    expect(component.prerequisites.length).toBe(initialLength + 1);
  });

  it('should add a step when addStep is called', () => {
    const initialLength = component.steps.length;
    component.addStep();
    expect(component.steps.length).toBe(initialLength + 1);
  });

  it('should dispatch updateInstallation when form value changes', async () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.addPrerequisite();
    component.addStep();
    fixture.detectChanges();

    component.installationForm.patchValue({
      prerequisites: ['Node.js'],
      steps: [{ step: 'Install', command: 'npm install' }]
    });
    fixture.detectChanges();

    // Wait for debounceTime(500)

    await new Promise(resolve => setTimeout(resolve, 600));

    expect(dispatchSpy).toHaveBeenCalled();
    const action = dispatchSpy.mock.calls[dispatchSpy.mock.calls.length - 1][0] as any;
    expect(action.type).toBe(ProjectActions.updateInstallation.type);
  });


});
