import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../store/project.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

/**
 * Form component for entering installation steps and prerequisites.
 */
@Component({
  selector: 'app-installation-form',
  standalone: false,
  templateUrl: './installation-form.component.html',
  styleUrl: './installation-form.component.scss',
})
export class InstallationFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  installationForm: FormGroup = this.fb.group({
    prerequisites: this.fb.array([]),
    steps: this.fb.array([]),
  });

  get prerequisites() {
    return this.installationForm.get('prerequisites') as FormArray;
  }

  get steps() {
    return this.installationForm.get('steps') as FormArray;
  }

  constructor() {
    /*
    this.store.select(selectInstallation).pipe(
      takeUntilDestroyed()
    ).subscribe(install => {
      // Logic to sync form arrays if needed (complex for FormArray, starting simple)
    });
    */

    this.installationForm.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed()
    ).subscribe(value => {
      this.store.dispatch(ProjectActions.updateInstallation({
        prerequisites: value.prerequisites,
        steps: value.steps
      }));
    });
  }

  addPrerequisite(): void {
    this.prerequisites.push(this.fb.control('', Validators.required));
  }

  removePrerequisite(index: number): void {
    this.prerequisites.removeAt(index);
  }

  addStep(): void {
    this.steps.push(this.fb.group({
      step: ['', Validators.required],
      command: ['', Validators.required],
    }));
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }
}
