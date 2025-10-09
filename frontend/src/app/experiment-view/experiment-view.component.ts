import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-view',
  imports: [],
  templateUrl: './experiment-view.component.html',
  styleUrl: './experiment-view.component.scss'
})
export class ExperimentViewComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    console.log("experimentid:", id);
  }
}
