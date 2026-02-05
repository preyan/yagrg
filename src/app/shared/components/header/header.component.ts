import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

/**
 * Application header component containing the brand and theme toggle.
 */
@Component({
    selector: 'app-header',
    standalone: false,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private themeService = inject(ThemeService);

    /**
     * Toggles the application theme.
     */
    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    /**
     * Checks if dark mode is active.
     */
    isDarkMode(): boolean {
        return this.themeService.isDarkMode();
    }
}
