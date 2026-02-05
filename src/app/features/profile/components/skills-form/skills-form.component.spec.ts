import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
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
});
