import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SocialLinksFormComponent } from './social-links-form.component';
import { updateSocialLinks } from '../../store/profile.actions';
import { selectSocialLinks } from '../../store/profile.selectors';
import { vi } from 'vitest';

describe('SocialLinksFormComponent', () => {
    let component: SocialLinksFormComponent;
    let fixture: ComponentFixture<SocialLinksFormComponent>;
    let store: MockStore;
    const initialState = {
        profile: {
            socialLinks: {
                github: '',
                twitter: '',
                linkedin: '',
                website: '',
            }
        }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [SocialLinksFormComponent],
            providers: [
                provideMockStore({
                    initialState,
                    selectors: [
                        { selector: selectSocialLinks, value: initialState.profile.socialLinks }
                    ]
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SocialLinksFormComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        vi.spyOn(store, 'dispatch');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch updateSocialLinks when form changes', async () => {
        const value = { github: 'testuser', twitter: 'twit', linkedin: '', website: '' };
        component.socialLinksForm.patchValue(value);

        await new Promise(resolve => setTimeout(resolve, 600));

        expect(store.dispatch).toHaveBeenCalledWith(updateSocialLinks({ socialLinks: value }));
    });
});
