import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectProfileState } from '../store/profile.selectors';
import { MarkdownComposerService } from '../../../core/services/markdown-composer';

/**
 * Main container component for the Profile README Generator.
 * Hosts the sub-forms and the live preview.
 */
@Component({
    selector: 'app-profile-container',
    standalone: false,
    templateUrl: './profile-container.component.html',
    styleUrl: './profile-container.component.scss',
})
export class ProfileContainerComponent {
    private store = inject(Store);
    private composer = inject(MarkdownComposerService);

    /**
     * Observable of the generated markdown string.
     */
    public markdown$ = this.store.select(selectProfileState).pipe(
        map(state => this.composer.composeProfileMarkdown(state))
    );
}
