import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateSocialLinks } from '../../store/profile.actions';
import { selectSocialLinks } from '../../store/profile.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Form component for entering social links.
 */
@Component({
    selector: 'app-social-links-form',
    standalone: false,
    templateUrl: './social-links-form.component.html',
    styleUrl: './social-links-form.component.scss',
})
export class SocialLinksFormComponent {
    private fb = inject(FormBuilder);
    private store = inject(Store);

    socialLinksForm: FormGroup = this.fb.group({
        github: [''],
        twitter: [''],
        linkedin: [''],
        website: [''],
    });

    constructor() {
        this.store.select(selectSocialLinks).pipe(
            takeUntilDestroyed()
        ).subscribe(links => {
            this.socialLinksForm.patchValue(links, { emitEvent: false });
        });

        this.socialLinksForm.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
            takeUntilDestroyed()
        ).subscribe(value => {
            this.store.dispatch(updateSocialLinks({ socialLinks: value }));
        });
    }
}
