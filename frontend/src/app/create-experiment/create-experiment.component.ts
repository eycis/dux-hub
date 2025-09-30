import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateExperimentService } from '../services/create-experiment.service';

@Component({
  selector: 'app-create-experiment',
  imports: [FormsModule, 
            CommonModule,
            ReactiveFormsModule ],
  standalone: true,
  templateUrl: './create-experiment.component.html',
  styleUrl: './create-experiment.component.scss'
})
export class CreateExperimentComponent {

    metricsDropdowns = new FormGroup({
      primaryMetrics : new FormControl<string | null>(null),
      secondaryMetrics : new FormControl<string | null>(null)
    });

    experimentName: string = "";
    hypothesis: string = "";
    totalTrafficSplit: number | null = null;
    variantA : string = "";
    variantB: string = "";

    primary_options = [
      { value: 'cr', label: 'Conversion Rate' },
      { value: 'pv', label: 'Page Views' },
      { value: 'ctr', label: 'Click-Through Rate' },
    ];
  
    secondary_options = [
      { value: 'bounce', label: 'Bounce Rate' },
      { value: 'time', label: 'Time on Page' },
      { value: 'aov', label: 'Avg. Order Value' },
    ];

    constructor(private api: CreateExperimentService){}

    save() {
      const dto = {
        name: this.experimentName,
        hypothesis : this.hypothesis,
        primaryMetrics: this.metricsDropdowns.value.primaryMetrics,
        secondaryMetrics: this.metricsDropdowns.value.secondaryMetrics,
        variantA : this.variantA,
        variantB : this.variantB,
        totalTrafficSplit: this.totalTrafficSplit,
      };

      
    }
}

