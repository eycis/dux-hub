import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetExperimentService } from '../services/get-experiment.service';
import { Experiment } from '../model/experiment.type';

@Component({
  selector: 'app-experiment-view',
  imports: [],
  templateUrl: './experiment-view.component.html',
  styleUrl: './experiment-view.component.scss'
})
export class ExperimentViewComponent {
  constructor(private route: ActivatedRoute) {}
  private experimentService = inject(GetExperimentService);
  experiment = signal<Experiment | null>(null); 

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("experimentid:", id);

    this.experimentService.getExperiment()
      .subscribe({
        next:(data) => {
          console.log(data);
          this.experiment.set(data);
        }, 
        error: (error) => {
          console.error("error:",  error.error.detail);
        }
      });
    }
}
