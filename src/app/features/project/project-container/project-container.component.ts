import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectProjectState } from '../store/project.selectors';
import { MarkdownComposerService } from '../../../core/services/markdown-composer';

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

  /**
   * Observable of the generated markdown string.
   */
  public markdown$ = this.store.select(selectProjectState).pipe(
    map(state => this.composer.composeProjectMarkdown(state))
  );
}
