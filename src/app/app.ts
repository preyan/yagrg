import { Component, inject, signal } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class AppComponent {
  public themeService = inject(ThemeService);
  protected readonly title = signal('yagrg');
}
