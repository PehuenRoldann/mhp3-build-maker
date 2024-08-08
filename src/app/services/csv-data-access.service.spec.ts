import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CsvDataAccessService } from './csv-data-access.service';

describe('CsvDataAccessService', () => {
  let service: CsvDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Importa HttpClientModule aquí
      providers: [CsvDataAccessService]
    });
    service = TestBed.inject(CsvDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should not be empty', async () => {
    let data = await service.getArmorData();
    expect(data !== '').toBeFalse();
  })
});
