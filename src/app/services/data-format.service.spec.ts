import { TestBed } from '@angular/core/testing';

import { DataFormatService } from './data-format.service';

describe('DataFormatService', () => {
  let service: DataFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
