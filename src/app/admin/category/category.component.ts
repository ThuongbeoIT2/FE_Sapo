import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service'; // Import the CategoryService
import { CategoryResponse } from '../../model/category.model'; // Import the CategoryResponse model

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  action: string | null = '';
  query : string = ''; // Save search keyword
  categories: CategoryResponse[] = []; // Array to hold categories

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService // Inject the CategoryService
  ) {}

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

  insertAction(): void {
    const url = new URL(window.location.href); // Create a new URL object
    url.searchParams.delete('query');
    url.searchParams.set('action', 'add'); // Set action to 'add'
    window.history.pushState({}, '', url.toString()); // Update the browser's URL without reloading
    window.location.reload(); // Reload the page to reflect changes
  }
}
