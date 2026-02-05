import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectProfileState } from '../store/profile.selectors';
import { MarkdownComposerService } from '../../../core/services/markdown-composer';
import { DownloadService } from '../../../core/services/download.service';

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
    private downloadService = inject(DownloadService);

    /**
     * Observable of the generated markdown string.
     */
    public markdown$ = this.store.select(selectProfileState).pipe(
        map(state => this.composer.composeProfileMarkdown(state))
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
