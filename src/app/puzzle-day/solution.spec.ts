import { TestBed } from '@angular/core/testing';

import { Solution } from './solution';

describe('Solution', () => {
  let service: Solution;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solution);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
