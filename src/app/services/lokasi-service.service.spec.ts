import { TestBed } from '@angular/core/testing';

import { LokasiServiceService } from './lokasi-service.service';

describe('LokasiServiceService', () => {
  let service: LokasiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LokasiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
