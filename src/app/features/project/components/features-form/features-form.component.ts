import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProjectActions } from '../../store/project.actions';
import { selectProjectFeatures } from '../../store/project.selectors';
import { ProjectFeature } from '../../store/project.state';
import { Observable } from 'rxjs';

/**
 * Component for managing project features.
 * Allows adding and removing features with titles and descriptions.
 */
@Component({
  selector: 'app-features-form',
  standalone: false,
  templateUrl: './features-form.component.html',
  styleUrl: './features-form.component.scss',
})
export class FeaturesFormComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  features$: Observable<ProjectFeature[]> = this.store.select(selectProjectFeatures);

  featureForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  addFeature(): void {
    if (this.featureForm.valid) {
      this.store.dispatch(ProjectActions.addFeature({ feature: this.featureForm.value }));
      this.featureForm.reset();
    }
  }

  removeFeature(index: number): void {
    this.store.dispatch(ProjectActions.removeFeature({ index }));
  }
}
