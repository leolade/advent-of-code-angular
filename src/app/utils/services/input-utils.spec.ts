import { TestBed } from '@angular/core/testing';

import { InputUtils } from './input-utils';

describe('InputUtils', () => {
  let service: InputUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
