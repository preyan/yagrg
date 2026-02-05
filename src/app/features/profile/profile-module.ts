import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing-module';
import { SharedModule } from '../../shared/shared.module';
import { ProfileContainerComponent } from './profile-container/profile-container.component';

import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/profile.reducer';
import { PersonalInfoFormComponent } from './components/personal-info-form/personal-info-form.component';
import { SocialLinksFormComponent } from './components/social-links-form/social-links-form.component';
import { SkillsFormComponent } from './components/skills-form/skills-form.component';

@NgModule({
  declarations: [
    ProfileContainerComponent,
    PersonalInfoFormComponent,
    SocialLinksFormComponent,
    SkillsFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    StoreModule.forFeature('profile', profileReducer)
  ]
})
export class ProfileModule { }
