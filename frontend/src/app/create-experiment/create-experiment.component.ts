import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


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
    experimentDetails: string = "";

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

    // submit() {console.log(this.primaryMetrics.value);}
}

