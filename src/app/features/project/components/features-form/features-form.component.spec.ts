import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FeaturesFormComponent } from './features-form.component';
import { initialProjectState } from '../../store/project.state';
import { ProjectActions } from '../../store/project.actions';

describe('FeaturesFormComponent', () => {
  let component: FeaturesFormComponent;
  let fixture: ComponentFixture<FeaturesFormComponent>;
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
      declarations: [FeaturesFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({
          initialState: { project: initialProjectState }
        })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeaturesFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addFeature when addFeature is called with valid form', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.featureForm.patchValue({ title: 'New Feature', description: 'desc' });
    component.addFeature();

    expect(dispatchSpy).toHaveBeenCalled();
    const action = dispatchSpy.mock.calls[0][0] as unknown as ReturnType<typeof ProjectActions.addFeature>;
    expect(action.type).toBe(ProjectActions.addFeature.type);
    expect(action.feature.title).toBe('New Feature');
  });

  it('should dispatch removeFeature when removeFeature is called', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    component.removeFeature(0);

    expect(dispatchSpy).toHaveBeenCalled();
    const action = dispatchSpy.mock.calls[0][0] as unknown as ReturnType<typeof ProjectActions.removeFeature>;
    expect(action.type).toBe(ProjectActions.removeFeature.type);
    expect(action.index).toBe(0);
  });
});
