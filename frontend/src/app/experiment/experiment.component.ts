import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperimentsService } from '../services/experiments.service';
import { Experiment } from '../model/experiment.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-experiment',
  imports: [],
  templateUrl: './experiment.component.html',
  styleUrl: './experiment.component.scss'
})
export class ExperimentComponent implements OnInit{
  private experimentService = inject(ExperimentsService);
  experimentList = signal<Array<Experiment>>([]);

  ngOnInit(): void {
    this.experimentService.getExperiments()
      .pipe().subscribe({
        next: (data) => {
          this.experimentList.set(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
