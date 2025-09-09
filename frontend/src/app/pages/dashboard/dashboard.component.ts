import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-dashboard',
  template: `<h1>DUX Hub</h1><p>Status: {{status}}</p>`
})
export class DashboardComponent implements OnInit {
  status = '...';
  constructor(private api: ApiService) {}
  ngOnInit() { this.api.health().subscribe(r => this.status = r.status); }
}