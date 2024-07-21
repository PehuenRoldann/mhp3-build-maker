import { TestBed } from '@angular/core/testing';

import { ArmorDataAccessService } from './armor-data-access.service';

describe('ArmorDataAccessService', () => {
  let service: ArmorDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArmorDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
