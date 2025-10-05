import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ExperimentsService } from '../services/experiments.service';
import { Experiment } from '../model/experiment.type';
import {MatTableModule}  from "@angular/material/table"
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-experiment',
  imports: [MatTableModule,
     MatFormFieldModule, 
     MatInputModule, 
     ReactiveFormsModule
  ],
  templateUrl: './experiment.component.html',
  styleUrl: './experiment.component.scss'
})
export class ExperimentComponent implements OnInit{
  private experimentService = inject(ExperimentsService);
  experimentList = signal<Array<Experiment>>([]);
  public displayColumns : string[] = ["Name", "Status", "Hypothesis"];
  public filter = new FormControl("", {nonNullable: true});
  private filterValue = signal("");

  filtered = computed(()=> {
    const f = this.filterValue().trim().toLowerCase();

    if(!f) return this.experimentList();

    return this.experimentList().filter( e =>
      e.name.toLowerCase().includes(f)
    );
  });
  


  ngOnInit(): void {
    this.experimentService.getExperiments()
      .subscribe({ 
        next: (data) => {
          this.experimentList.set(data);
          this.filter.valueChanges.pipe(startWith(""), debounceTime(200), distinctUntilChanged())
          .subscribe(v=>this.filterValue.set(v));
        },
        error: (error) => {
          console.error(error.error.detail);
        }
      });
  }
}
