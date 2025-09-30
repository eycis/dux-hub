import { TestBed } from '@angular/core/testing';

import { CreateExperimentService } from './create-experiment.service';

describe('CreateExperimentService', () => {
  let service: CreateExperimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExperimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
