import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * SharedModule contains reusable components, pipes, and directives.
 * It also exports common Angular modules (CommonModule, Forms) and 
 * third-party modules (ng-bootstrap) to be used across feature modules.
 */
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        // [Export shared components here as they are created]
    ]
})
export class SharedModule { }
