import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;

    beforeEach(() => {
        // Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(), // Deprecated
                removeListener: vi.fn(), // Deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        // Clear localStorage before each test
        localStorage.clear();
        TestBed.configureTestingModule({
            providers: [ThemeService],
        });
        service = TestBed.inject(ThemeService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Initial State', () => {
        it('should default to light theme if no preference is stored', () => {
            expect(service.currentTheme()).toBe('light');
        });

        it('should load theme from localStorage if available', () => {
            // Set localStorage before creating service
            localStorage.setItem('yagrg-theme', 'dark');
            // Reset TestBed and re-create service
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [ThemeService],
            });
            const freshService: ThemeService = TestBed.inject(ThemeService);
            expect(freshService.currentTheme()).toBe('dark');
        });
    });

    describe('toggleTheme', () => {
        it('should switch from light to dark', async () => {
            service.toggleTheme();
            // Effects are usually sync in Vitest environment if possible, 
            // but let's wait a bit to be sure
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(service.currentTheme()).toBe('dark');
        });

        it('should switch from dark to light', async () => {
            service.setTheme('dark');
            await new Promise(resolve => setTimeout(resolve, 0));
            service.toggleTheme();
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(service.currentTheme()).toBe('light');
        });
    });

    describe('setTheme', () => {
        it('should set the theme to dark', async () => {
            service.setTheme('dark');
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(service.currentTheme()).toBe('dark');
        });

        it('should set the theme to light', async () => {
            service.setTheme('dark'); // First set to dark
            await new Promise(resolve => setTimeout(resolve, 0));
            service.setTheme('light'); // Then set to light
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(service.currentTheme()).toBe('light');
        });

        it('should persist theme to localStorage', async () => {
            service.setTheme('dark');
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(localStorage.getItem('yagrg-theme')).toBe('dark');
        });
    });

    describe('isDarkMode', () => {
        it('should return false for light theme', () => {
            expect(service.isDarkMode()).toBe(false);
        });

        it('should return true for dark theme', () => {
            service.setTheme('dark');
            expect(service.isDarkMode()).toBe(true);
        });
    });
});
