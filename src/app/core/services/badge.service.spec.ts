import { TestBed } from '@angular/core/testing';
import { BadgeService } from './badge.service';

describe('BadgeService', () => {
  let service: BadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBadgeUrl', () => {
    it('should return a valid Shields.io URL for a given badge', () => {
      const badge = { name: 'Angular', color: 'DD0031', logo: 'angular' };
      const url = service.getBadgeUrl(badge);
      expect(url).toContain('https://img.shields.io/badge/Angular-DD0031');
      expect(url).toContain('logo=angular');
    });

    it('should encode spaces in the badge name', () => {
      const badge = { name: 'Node JS', color: '339933', logo: 'nodedotjs' };
      const url = service.getBadgeUrl(badge);
      expect(url).toContain('Node%20JS');
    });
  });
});
