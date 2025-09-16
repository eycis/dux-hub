import { inject, Injectable } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  
  http = inject(HttpClient);

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

  getExperiments() {
    //testing data to try out the http call first:
    //TODO: after the backend setup, replace this with real url: 
    const url = `https://jsonplaceholder.typicode.com/todos`
    //then the return will be: return this.http.get<Array<experiment>>(url);
     //return this.http.get<Array<Experiment>>(url);
    return this.http.get(url);
  }

  constructor() { }
}
