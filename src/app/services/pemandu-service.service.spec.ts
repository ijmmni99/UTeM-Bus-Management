import { TestBed } from '@angular/core/testing';

import { PemanduServiceService } from './pemandu-service.service';

describe('PemanduServiceService', () => {
  let service: PemanduServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PemanduServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
