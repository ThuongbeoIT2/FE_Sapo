import { TestBed } from '@angular/core/testing';

import { StoretypeService } from './storetype.service';

describe('StoretypeService', () => {
  let service: StoretypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoretypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
