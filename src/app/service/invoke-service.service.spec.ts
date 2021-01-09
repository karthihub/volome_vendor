import { TestBed } from '@angular/core/testing';

import { InvokeServiceService } from './invoke-service.service';

describe('InvokeServiceService', () => {
  let service: InvokeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvokeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
