import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Core module that provides singleton services and guards.
 * This module should only be imported once in the AppModule.
 */
@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [],
})
export class CoreModule {
    /**
     * Prevents re-importing the CoreModule.
     * @param parentModule - The parent module (should be undefined if imported correctly).
     */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it only in AppModule.');
        }
    }
}
