import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { MarkdownRendererComponent } from './components/markdown-renderer/markdown-renderer.component';

/**
 * SharedModule contains reusable components, pipes, and directives.
 * It also exports common Angular modules (CommonModule, Forms)
 * to be used across feature modules.
 */
@NgModule({
    declarations: [
        HeaderComponent,
        MarkdownRendererComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent,
        MarkdownRendererComponent
    ]
})
export class SharedModule { }
