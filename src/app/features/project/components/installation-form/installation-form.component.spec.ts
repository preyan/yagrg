import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { InstallationFormComponent } from './installation-form.component';

describe('InstallationFormComponent', () => {
  let component: InstallationFormComponent;
  let fixture: ComponentFixture<InstallationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallationFormComponent],
      imports: [ReactiveFormsModule],
      providers: [provideMockStore()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InstallationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
