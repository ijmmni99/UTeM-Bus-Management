import { TestBed } from '@angular/core/testing';

import { PelajarService } from './pelajar.service';

describe('PelajarService', () => {
  let service: PelajarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelajarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
