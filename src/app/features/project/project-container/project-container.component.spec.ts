import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectContainerComponent } from './project-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { MarkdownComposerService } from '../../../core/services/markdown-composer';
import { DownloadService } from '../../../core/services/download.service';
import { initialProjectState } from '../store/project.state';


describe('ProjectContainerComponent', () => {
  let component: ProjectContainerComponent;
  let fixture: ComponentFixture<ProjectContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectContainerComponent],
      providers: [
        provideMockStore({ initialState: { project: initialProjectState } }),
        MarkdownComposerService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call copyToClipboard on downloadService when copyToClipboard is called', () => {
    const downloadService = TestBed.inject(DownloadService);
    const spy = vi.spyOn(downloadService, 'copyToClipboard');
    component.copyToClipboard();
    expect(spy).toHaveBeenCalled();
  });

  it('should call downloadFile on downloadService when downloadReadme is called', () => {
    const downloadService = TestBed.inject(DownloadService);
    const spy = vi.spyOn(downloadService, 'downloadFile');
    component.downloadReadme();
    expect(spy).toHaveBeenCalled();
  });
});

