import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreviewContainerComponent } from './preview-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PreviewContainerComponent', () => {
  let component: PreviewContainerComponent;
  let fixture: ComponentFixture<PreviewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewContainerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
