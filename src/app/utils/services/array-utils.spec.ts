import { TestBed } from '@angular/core/testing';

import { ArrayUtils } from './array-utils';

describe('ArrayUtils', () => {
  let service: ArrayUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrayUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
