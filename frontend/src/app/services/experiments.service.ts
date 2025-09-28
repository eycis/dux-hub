import { inject, Injectable } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  
  http = inject(HttpClient);

  getExperiments() {
    const url = `http://localhost:8000/experiments`
    return this.http.get<Experiment[]>(url).pipe(
      catchError(error => { 
        console.error("Failed to load experiments", error);
        return throwError(() => error);
      })
    );
  }

  constructor() { }
}
