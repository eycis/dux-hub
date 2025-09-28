import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-experiment',
  imports: [FormsModule, 
            FormsModule,
            CommonModule,
            ReactiveFormsModule ],
  templateUrl: './create-experiment.component.html',
  styleUrl: './create-experiment.component.scss'
})
export class CreateExperimentComponent {
    experimentName: string = "";
    experimentDetails: string = "";

    primaryMetricsForm = new FormGroup({
      primaryMetrics : new FormControl<string | null>(null)
    });

    options= [
      {value: "cr", label: "Conversion Rate"},
      {value: "cr", label: "Conversion Rate"},
      {value: "cr", label: "Conversion Rate"},
    ];

    submit() {console.log(this.primaryMetricsForm.value);}

    secondaryMetricsForm = new FormGroup({
      secondaryMetrics : new FormControl<string | null>(null)
    });

    secondary_options= [
      {value: "cr", label: "Conversion Rate"},
      {value: "cr", label: "Conversion Rate"},
      {value: "cr", label: "Conversion Rate"},
    ];

    // submit() {console.log(this.primaryMetrics.value);}
}

