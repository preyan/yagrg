import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

/**
 * Top navigation header component.
 * Includes logo and theme toggle.
 */
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false,
})
export class HeaderComponent {
    constructor(private themeService: ThemeService) { }

    /**
     * Toggles the application theme.
     */
    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    /**
     * Checks if the dark mode is currently active.
     * @returns True if dark mode is active.
     */
    isDarkMode(): boolean {
        return this.themeService.isDarkMode();
    }
}
