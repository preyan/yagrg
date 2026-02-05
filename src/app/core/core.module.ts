import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Core module that provides singleton services and guards.
 * This module should only be imported once in the AppModule.
 */
@NgModule({
    imports: [CommonModule],
})
export class CoreModule {
    constructor() {
        const parentModule = inject(CoreModule, { optional: true, skipSelf: true });
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
