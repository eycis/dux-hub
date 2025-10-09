import { Component, inject, signal } from '@angular/core';
import { Experiment } from '../model/experiment.type';
import { ExperimentsService } from '../services/experiments.service';
import { StatusCountPipe } from '../status-count.pipe';
import { RouterLink } from '@angular/router';
import { GetCommentsService } from '../services/get-comments.service';
import { CommonModule } from '@angular/common';
import { Comment } from "../model/comment.type";

@Component({
  selector: 'app-home',
  imports: [StatusCountPipe, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private experimentService = inject(ExperimentsService);
  private commentsService = inject(GetCommentsService);
  experimentList = signal<Array<Experiment>>([]);
  commentList = signal<Array<Comment>>([]);

  ngOnInit(): void {
    this.experimentService.getExperiments()
      .pipe().subscribe({
        next: (data) => {
          this.experimentList.set(data);
        },
        error: (error) => {
          console.error(error.error.detail);
        }
      });

      this.commentsService.getComments()
      .pipe().subscribe({
        next: (data) => {
          //TODO: sort already in service?
          data = data.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0,3);
          this.commentList.set(data);
        },
        error: (error) => {
          console.error(error.error.detail);
        }
      });
  }
}
