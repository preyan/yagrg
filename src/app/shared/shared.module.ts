import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './components/header/header.component';

/**
 * SharedModule contains reusable components, pipes, and directives.
 * It also exports common Angular modules (CommonModule, Forms) and 
 * third-party modules (ng-bootstrap) to be used across feature modules.
 */
@NgModule({
    declarations: [
        HeaderComponent
    ],
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
        HeaderComponent
    ]
})
export class SharedModule { }
