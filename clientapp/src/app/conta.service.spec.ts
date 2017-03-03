import { TestBed, inject } from '@angular/core/testing';

import { ContaService } from './conta.service';

describe('ContaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContaService]
    });
  });

  it('should ...', inject([ContaService], (service: ContaService) => {
    expect(service).toBeTruthy();
  }));
});
