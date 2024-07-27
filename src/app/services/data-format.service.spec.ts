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

  it('should split the word', () => {
    expect(service.separateWord('HolaMundo')).toBe('Hola Mundo');
  });

  it ('should create the key', () => {
    expect(service.getResourcesMap('[YukumoWood:1,GarwaFeather:1]').has('Garwa Feather')).toBeTrue();
  });

  
});
