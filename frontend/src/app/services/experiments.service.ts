import { Injectable } from '@angular/core';
import { Experiment } from '../model/experiment.type';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  
  experimentList : Array<Experiment> = [{
      userId: 0,
      variants: "variantsTest",
      name: "nameTest",
      status: "inProgress",
      objectiveMetric: "objectiveMetricTest",
      hypothesis: "hypothesisTest",
    },
    {
      userId: 1,
      variants: "variantsTest",
      name: "nameTest",
      status: "inProgress",
      objectiveMetric: "objectiveMetricTest",
      hypothesis: "hypothesisTest",
    },
  ];

  constructor() { }
}
