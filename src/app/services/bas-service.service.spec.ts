import { TestBed } from '@angular/core/testing';

import { BasServiceService } from './bas-service.service';

describe('BasServiceService', () => {
  let service: BasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
