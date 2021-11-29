import { TestBed } from '@angular/core/testing';

import { JadualServiceService } from './jadual-service.service';

describe('JadualServiceService', () => {
  let service: JadualServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JadualServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
