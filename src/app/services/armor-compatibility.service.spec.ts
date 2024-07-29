import { TestBed } from '@angular/core/testing';

import { ArmorCompatibilityService } from './armor-compatibility.service';

describe('ArmorCompatibilityService', () => {
  let service: ArmorCompatibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorCompatibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
