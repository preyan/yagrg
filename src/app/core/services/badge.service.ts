import { Injectable } from '@angular/core';
import { TechBadge } from '../../features/profile/store/profile.state';

/**
 * Service for generating Shields.io badge URLs.
 */
@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  /**
   * Generates a Shields.io badge URL.
   * @param badge - The badge configuration.
   * @returns The full Shields.io URL.
   */
  getBadgeUrl(badge: TechBadge): string {
    const name = encodeURIComponent(badge.name);
    const color = badge.color.replace('#', '');
    const logo = encodeURIComponent(badge.logo);

    return `https://img.shields.io/badge/${name}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
  }
}
