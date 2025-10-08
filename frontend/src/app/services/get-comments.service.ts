import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Comment } from "../model/comment.type";

@Injectable({
  providedIn: 'root'
})
export class GetCommentsService {

  constructor(private http: HttpClient) { }

  getComments() { 
    const url = "http://localhost:8000/api/comments";
    return this.http.get<Comment[]>(url).pipe(
      catchError(error => {
        console.error("Failed to load comments", error.error.detail)
        return throwError(() => error);
      })
    );
  }
}
