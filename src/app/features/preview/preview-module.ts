import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing-module';
import { PreviewContainerComponent } from './preview-container/preview-container.component';
import { MarkdownRendererComponent } from './components/markdown-renderer/markdown-renderer.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PreviewContainerComponent,
    MarkdownRendererComponent
  ],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    SharedModule
  ],
  exports: [
    MarkdownRendererComponent
  ]
})
export class PreviewModule { }
