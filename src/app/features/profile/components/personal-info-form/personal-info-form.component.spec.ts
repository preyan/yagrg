import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PersonalInfoFormComponent } from './personal-info-form.component';
import { updatePersonalInfo } from '../../store/profile.actions';
import { selectPersonalInfo } from '../../store/profile.selectors';
import { vi } from 'vitest';

describe('PersonalInfoFormComponent', () => {
  let component: PersonalInfoFormComponent;
  let fixture: ComponentFixture<PersonalInfoFormComponent>;
  let store: MockStore;
  const initialState = {
    profile: {
      personalInfo: {
        name: '',
        role: '',
        bio: '',
        location: '',
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PersonalInfoFormComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectPersonalInfo, value: initialState.profile.personalInfo }
          ]
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    vi.spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from store', () => {
    const info = { name: 'Test User', role: 'Tester', bio: 'Bio', location: 'Location' };
    store.overrideSelector(selectPersonalInfo, info);
    store.refreshState();
    fixture.detectChanges();

    // Re-initialize to pick up store value or use subscribe logic
    // The constructor subscribes to store
    expect(component.personalInfoForm.value).toEqual(info);
  });

  it('should dispatch updatePersonalInfo when form value changes and is valid', async () => {
    const validValue = {
      name: 'Jane Doe',
      role: 'Architect',
      bio: 'New bio',
      location: 'Moon',
    };

    component.personalInfoForm.patchValue(validValue);

    // Wait for debounceTime(500)
    await new Promise(resolve => setTimeout(resolve, 600));

    expect(store.dispatch).toHaveBeenCalledWith(updatePersonalInfo({ personalInfo: validValue }));
  });

  it('should not dispatch updatePersonalInfo if form is invalid', async () => {
    component.personalInfoForm.patchValue({ name: '', role: '' }); // Invalid because required

    await new Promise(resolve => setTimeout(resolve, 600));

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
