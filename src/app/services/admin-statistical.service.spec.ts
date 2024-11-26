import { TestBed } from '@angular/core/testing';

import { AdminStatisticalService } from './admin-statistical.service';

describe('AdminStatisticalService', () => {
  let service: AdminStatisticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStatisticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
