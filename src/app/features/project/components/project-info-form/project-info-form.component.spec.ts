import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { ProjectInfoFormComponent } from './project-info-form.component';

describe('ProjectInfoFormComponent', () => {
  let component: ProjectInfoFormComponent;
  let fixture: ComponentFixture<ProjectInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectInfoFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
