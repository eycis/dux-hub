import { TestBed } from '@angular/core/testing';

import { GetExperimentService } from './get-experiment.service';

describe('GetExperimentService', () => {
  let service: GetExperimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetExperimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
