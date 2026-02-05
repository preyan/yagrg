import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updatePersonalInfo } from '../../store/profile.actions';
import { selectPersonalInfo } from '../../store/profile.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Form component for entering personal information.
 * Dispatches updates to the store with a debounce.
 */
@Component({
  selector: 'app-personal-info-form',
  standalone: false,
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.scss',
})
export class PersonalInfoFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  personalInfoForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    bio: [''],
    location: [''],
  });

  constructor() {
    // Populate form with existing state
    this.store.select(selectPersonalInfo).pipe(
      takeUntilDestroyed()
    ).subscribe(info => {
      this.personalInfoForm.patchValue(info, { emitEvent: false });
    });

    // Subscriptions for auto-save/dispatch
    this.personalInfoForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntilDestroyed()
    ).subscribe(value => {
      if (this.personalInfoForm.valid) {
        this.store.dispatch(updatePersonalInfo({ personalInfo: value }));
      }
    });
  }
}
