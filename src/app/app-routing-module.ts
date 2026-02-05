import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-module').then(m => m.ProfileModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./features/project/project-module').then(m => m.ProjectModule)
  },
  {
    path: 'preview',
    loadChildren: () => import('./features/preview/preview-module').then(m => m.PreviewModule)
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
