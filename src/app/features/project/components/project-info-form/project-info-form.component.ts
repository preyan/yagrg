import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../store/project.actions';
import { selectProjectInfo } from '../../store/project.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

/**
 * Form component for entering project metadata (Name, Description, etc.).
 */
@Component({
  selector: 'app-project-info-form',
  standalone: false,
  templateUrl: './project-info-form.component.html',
  styleUrl: './project-info-form.component.scss',
})
export class ProjectInfoFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  projectInfoForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    version: ['1.0.0', Validators.required],
    license: ['MIT', Validators.required],
    author: [''],
  });

  constructor() {
    this.store.select(selectProjectInfo).pipe(
      takeUntilDestroyed()
    ).subscribe(info => {
      this.projectInfoForm.patchValue(info, { emitEvent: false });
    });

    this.projectInfoForm.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
      takeUntilDestroyed()
    ).subscribe(value => {
      if (this.projectInfoForm.valid) {
        this.store.dispatch(ProjectActions.updateProjectInfo({ projectInfo: value }));
      }
    });
  }
}
