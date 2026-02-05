import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectProjectState } from '../store/project.selectors';
import { MarkdownComposerService } from '../../../core/services/markdown-composer';
import { DownloadService } from '../../../core/services/download.service';

/**
 * Main container component for the Project README Generator.
 * Hosts the project metadata, features, and installation forms.
 */
@Component({
  selector: 'app-project-container',
  standalone: false,
  templateUrl: './project-container.component.html',
  styleUrl: './project-container.component.scss',
})
export class ProjectContainerComponent {
  private store = inject(Store);
  private composer = inject(MarkdownComposerService);
  private downloadService = inject(DownloadService);

  /**
   * Observable of the generated markdown string.
   */
  public markdown$ = this.store.select(selectProjectState).pipe(
    map(state => this.composer.composeProjectMarkdown(state))
  );

  /**
   * Copies the generated markdown to the clipboard.
   */
  public copyToClipboard(): void {
    this.markdown$.pipe(take(1)).subscribe(markdown => {
      this.downloadService.copyToClipboard(markdown);
    });
  }

  /**
   * Downloads the generated markdown as a README.md file.
   */
  public downloadReadme(): void {
    this.markdown$.pipe(take(1)).subscribe(markdown => {
      this.downloadService.downloadFile(markdown, 'README.md');
    });
  }
}
