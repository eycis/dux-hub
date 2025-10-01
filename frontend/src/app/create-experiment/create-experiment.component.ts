import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateExperimentService } from '../services/create-experiment.service';
import { ExperimentDto } from '../model/experimentDto.type';

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

    experimentForm = new FormGroup({
      name: new FormControl<string>("", {nonNullable: true}),
      hypothesis: new FormControl<string>("",{nonNullable: true}),
      // primaryMetrics : new FormControl<string | null>(null),
      // secondaryMetrics : new FormControl<string | null>(null)
    });


    // totalTrafficSplit: number | null = null;
    // variantA : string = "";
    // variantB: string = "";

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

    submit() {
      const dto : ExperimentDto = this.experimentForm.getRawValue();

      this.api.createExperiment(dto).subscribe({
        next: (res) => {
          console.log("saved:", res);
        },
        error: (error) => {
          console.log("error:", error);
        },
      });
    }
}

