import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { SkillsFormComponent } from './skills-form.component';
import { profileReducer } from '../../store/profile.reducer';
import { BadgeService } from '../../../../core/services/badge.service';

describe('SkillsFormComponent', () => {
  let component: SkillsFormComponent;
  let fixture: ComponentFixture<SkillsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('profile', profileReducer)
      ],
      declarations: [SkillsFormComponent],
      providers: [BadgeService]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of available skills', () => {
    expect(component.availableSkills.length).toBeGreaterThan(0);
  });

  it('should dispatch addTechBadge when addSkill is called', () => {
    const store = TestBed.inject(Store);
    const spy = vi.spyOn(store, 'dispatch');
    const skill = component.availableSkills[0];
    component.addSkill(skill);
    expect(spy).toHaveBeenCalled();
  });

  it('should dispatch removeTechBadge when removeSkill is called', () => {
    const store = TestBed.inject(Store);
    const spy = vi.spyOn(store, 'dispatch');
    component.removeSkill('Angular');
    expect(spy).toHaveBeenCalled();
  });

  it('should return true if skill is selected', () => {
    const skills = [{ name: 'Angular', color: 'red', logo: 'ang' }];
    expect(component.isSkillSelected('Angular', skills)).toBe(true);
    expect(component.isSkillSelected('React', skills)).toBe(false);
  });
});

