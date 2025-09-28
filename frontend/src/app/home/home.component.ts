import { Component, inject, signal } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { ExperimentsService } from '../services/experiments.service';
import { StatusCountPipe } from '../status-count.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [StatusCountPipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
