import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService } from '../../../core/services/theme.service';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let themeServiceMock: {
        toggleTheme: ReturnType<typeof vi.fn>;
        isDarkMode: ReturnType<typeof vi.fn>;
        currentTheme: ReturnType<typeof vi.fn>;
    };

    beforeEach(async () => {
        themeServiceMock = {
            toggleTheme: vi.fn(),
            isDarkMode: vi.fn().mockReturnValue(false),
            currentTheme: vi.fn().mockReturnValue('light')
        };

        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                { provide: ThemeService, useValue: themeServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call themeService.toggleTheme when toggle button is clicked', () => {
        const button = fixture.debugElement.query(By.css('.theme-toggle'));
        expect(button).toBeTruthy();
        button.triggerEventHandler('click', null);
        expect(themeServiceMock.toggleTheme).toHaveBeenCalled();
    });
});
