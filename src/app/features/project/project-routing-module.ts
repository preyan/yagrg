import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectContainerComponent } from './project-container/project-container.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
