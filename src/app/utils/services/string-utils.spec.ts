import { TestBed } from '@angular/core/testing';

import { StringUtils } from './string-utils';

describe('StringUtils', () => {
  let service: StringUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
