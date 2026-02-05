import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing-module';
import { PreviewContainerComponent } from './preview-container/preview-container.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PreviewContainerComponent
  ],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    SharedModule
  ]
})
export class PreviewModule { }
