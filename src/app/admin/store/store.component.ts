import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  action: string | null = '';
  query : string = ''; // Save search keyword
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const url = new URL(window.location.href); // Create a new URL object
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || ''; // Get action from query params
      this.query = params['query'] || ''; // Get action from query params
      if (this.query=== '') {
          url.searchParams.delete('query'); // Remove query param if empty
      }
    });
  }
}
