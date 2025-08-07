import { TestBed } from '@angular/core/testing';

import { Sproducts } from './sproducts';

describe('Sproducts', () => {
  let service: Sproducts;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sproducts);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
