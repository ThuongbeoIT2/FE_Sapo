import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products: ProductResponse[] = []; // Array to hold product data
  action!: string;
  query!: string; // Action to be performed (add/update)
  currentPage: number = 1; // Current page number, default to 1

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || ''; // Get action parameter from route
      this.currentPage = +params['page'] || 1;
      this.query = params['query'] || ''; // Get query parameter from route

      if(this.query){
        this.searchProducts(this.query,this.currentPage - 1);
      }
      this.loadProducts(this.currentPage - 1); // Load products, subtract 1 for API call
    });
  }

  loadProducts(page: number): void {
    this.productService.getProducts(page).subscribe({
      next: (data) => {
        console.log('Fetched Products:', data); // Log fetched products to console
        this.products = data.content; // Assuming 'content' holds the products in paginated response
      },
      error: (error) => {
        this.showToast('Error', 'Failed to load products', 'error');
        console.error('Error loading products:', error); // Log error to console
      }
    });
  }
  searchProducts(key:string,page: number): void {
    this.productService.searchProducts(key,page).subscribe({
      next: (data) => {
        console.log('Fetched Products:', data); // Log fetched products to console
        this.products = data.content; // Assuming 'content' holds the products in paginated response
      },
      error: (error) => {
        this.showToast('Error', 'Failed to load products', 'error');
        console.error('Error loading products:', error); // Log error to console
      }
    });
  }


  insertAction(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'add', page: this.currentPage }, // Keep the current page when navigating
      queryParamsHandling: 'merge'
    });
  }

  onDelete(product: ProductResponse): void {
    const confirmDelete = confirm(`Are you sure you want to delete the product with ID: ${product.proId}?`);
    if (confirmDelete) {
      this.productService.deleteProduct(product.proId).subscribe({
        next: () => {
          this.showToast('Success', 'Product deleted successfully', 'success');
          this.products = this.products.filter(pr => pr.proId !== product.proId); // Remove deleted product from list
        },
        error: (error) => {
          this.showToast('Error', 'Failed to delete product', 'error');
          console.error('Deletion error:', error); // Log error to console
        }
      });
    }
  }

  updateAction(product: ProductResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'update', slug: product.slug, page: this.currentPage }, // Keep the current page when navigating
      queryParamsHandling: 'merge'
    });
  }

  showToast(title: string, message: string, type: 'success' | 'error'): void {
    this.toastService.showToast({
      title: title,
      message: message,
      type: type,
      duration: 2000 // Set duration for toast notification
    });
  }
}
