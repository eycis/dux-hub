import { inject, Injectable } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperimentsService {
  
  constructor(private http: HttpClient) {}

  getExperiments() {
    const url = `http://localhost:8000/api/experiments`
    return this.http.get<Experiment[]>(url).pipe(
      catchError(error => { 
        console.error("Failed to load experiments", error);
        return throwError(() => error);
      })
    );
  }
}
