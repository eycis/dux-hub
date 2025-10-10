import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetExperimentService {

  constructor(private http: HttpClient ) { }

  getExperiment(){
    const url = "http://localhost:8000/api/experiments"
    return this.http.get<Experiment>(url).pipe(
      catchError(error => {
        console.log("error:", error.error.detail);
        return throwError(() => error)
      })
    );
  }
}
