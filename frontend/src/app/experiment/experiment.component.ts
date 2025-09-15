import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperimentsService } from '../services/experiments.service';
import { Experiment } from '../model/experiment.type';

@Component({
  selector: 'app-experiment',
  imports: [],
  templateUrl: './experiment.component.html',
  styleUrl: './experiment.component.scss'
})
export class ExperimentComponent implements OnInit{
  experimentService = inject(ExperimentsService);
  experimentList = signal<Array<Experiment>>([]);

  ngOnInit(): void {
    console.log(this.experimentService.experimentList);
    this.experimentList.set(this.experimentService.experimentList); 
  }
}
