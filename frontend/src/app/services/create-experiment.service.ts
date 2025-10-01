import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperimentDto } from '../model/experimentDto.type';

@Injectable({
  providedIn: 'root'
})
export class CreateExperimentService {

  constructor(private http: HttpClient) {}

  createExperiment(dto: ExperimentDto): Observable<any> {
    return this.http.post("http://localhost:8000/api/experiments", dto);
  }
}
