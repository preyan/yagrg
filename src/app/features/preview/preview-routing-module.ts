import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewContainerComponent } from './preview-container/preview-container.component';

const routes: Routes = [
  {
    path: '',
    component: PreviewContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewRoutingModule { }
