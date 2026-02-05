import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTechBadge, removeTechBadge } from '../../store/profile.actions';
import { selectTechStack } from '../../store/profile.selectors';
import { TechBadge } from '../../store/profile.state';
import { BadgeService } from '../../../../core/services/badge.service';
import { Observable } from 'rxjs';

/**
 * Component for managing the tech stack skills.
 */
@Component({
  selector: 'app-skills-form',
  standalone: false,
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent {
  private store = inject(Store);
  public badgeService = inject(BadgeService);

  techStack$: Observable<TechBadge[]> = this.store.select(selectTechStack);

  availableSkills: TechBadge[] = [
    { name: 'Angular', color: 'DD0031', logo: 'angular' },
    { name: 'React', color: '61DAFB', logo: 'react' },
    { name: 'Node JS', color: '339933', logo: 'nodedotjs' },
    { name: 'TypeScript', color: '3178C6', logo: 'typescript' },
    { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript' },
    { name: 'HTML5', color: 'E34F26', logo: 'html5' },
    { name: 'CSS3', color: '1572B6', logo: 'css3' },
    { name: 'Sass', color: 'CC6699', logo: 'sass' },
    { name: 'Git', color: 'F05032', logo: 'git' },
  ];

  addSkill(skill: TechBadge): void {
    this.store.dispatch(addTechBadge({ badge: skill }));
  }

  removeSkill(skillName: string): void {
    this.store.dispatch(removeTechBadge({ badgeName: skillName }));
  }

  isSkillSelected(skillName: string, selectedSkills: TechBadge[]): boolean {
    return selectedSkills.some(s => s.name === skillName);
  }
}
