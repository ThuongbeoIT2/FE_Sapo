import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryResponse } from 'src/app/model/category.model';
import { ProductResponse } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss']
})
export class ProductAdminComponent {
  action: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, // Inject the ProductService,
    private categoryService: CategoryService// Inject the CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || ''; // Get action from query params
    });

  }



  insertAction(): void {
    const url = new URL(window.location.href); // Create a new URL object
    url.searchParams.set('action', 'add'); // Set action to 'add'
    window.history.pushState({}, '', url.toString()); // Update the browser's URL without reloading
    window.location.reload(); // Reload the page to reflect changes
  }
}
