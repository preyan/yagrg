import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProjectRoutingModule } from './project-routing-module';
import { SharedModule } from '../../shared/shared.module';
import { ProjectContainerComponent } from './project-container/project-container.component';

import { StoreModule } from '@ngrx/store';
import { projectReducer } from './store/project.reducer';
import { ProjectInfoFormComponent } from './components/project-info-form/project-info-form.component';
import { FeaturesFormComponent } from './components/features-form/features-form.component';
import { InstallationFormComponent } from './components/installation-form/installation-form.component';

@NgModule({
  declarations: [
    ProjectContainerComponent,
    ProjectInfoFormComponent,
    FeaturesFormComponent,
    InstallationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    SharedModule,
    StoreModule.forFeature('project', projectReducer)
  ]
})
export class ProjectModule { }
