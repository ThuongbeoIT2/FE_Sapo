import { Component } from '@angular/core';
import { ProductOfStoreResponse } from '../model/productOS.model';
import { CategoryResponse } from '../model/category.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Toast, ToastService } from '../services/toast.service';
import { CategoryService } from '../services/category.service';
import { StoreService } from '../services/store.service';
import { ApiResponse } from '../model/ApiResponse.model';

@Component({
  selector: 'app-manage-product-os',
  templateUrl: './manage-product-os.component.html',
  styleUrls: ['./manage-product-os.component.scss']
})
export class ManageProductOsComponent {
  products: ProductOfStoreResponse[] = []; // All products
  filteredProducts: ProductOfStoreResponse[] = []; // Filtered products
  categories: CategoryResponse[] = []; // List of categories

  category: string = '';
  action!: string; // Current action (add/update)
  query!: string; // Search keyword
  currentPage: number = 1; // Current page (starting from 1)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService,
    private categoryService: CategoryService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.fetchCategories(); // Load categories
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'] || '';
      this.currentPage = +params['page'] || 1;
      this.query = params['query'] || '';

      if (this.query) {
        this.searchProducts(this.query, this.currentPage - 1);
      }
      this.loadProducts(this.currentPage - 1);
    });
  }

  // Fetch categories from service
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = [
          { id: 0, cateName: 'All', slug: 'All', thumbnail: '', description: '' },
          ...data,
        ];
        this.category = this.categories[0].cateName; // Default to "All"
      },
      error: (error) => {
        console.error('Error loading categories!', error);
      },
    });
  }

  // Load products from service
  loadProducts(page: number): void {
    this.storeService.getProductsOfMyStore(page).subscribe({
      next: (data) => {
        console.log('Products:', data);
        this.products = data.content; // Store all products
        this.filterProducts(); // Filter products after loading
      },
      error: (error) => {
        this.showToast('Error', 'Failed to load products', 'error');
        console.error('Error loading products:', error);
      },
    });
  }

  addAction(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'view-product' },
      queryParamsHandling: 'merge',
    });
  }
  // Search for products by keyword
  searchProducts(key: string, page: number): void {
    this.storeService.searchProductsInMyStore(key, page).subscribe({
      next: (data) => {
        this.products = data.content;
        this.filterProducts(); // Update filtered list
      },
      error: (error) => {
        this.showToast('Error', 'Failed to search products', 'error');
        console.error('Error searching products:', error);
      },
    });
  }

  // Handle category selection change
  onCategoryChange(): void {
    this.filterProducts(); // Filter products based on selected category
  }

  // Filter products by selected category
  filterProducts(): void {
    console.log('Category:', this.category);
    if (this.category === 'All') {
      // Show all products if "All" is selected
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.category.trim().toLowerCase().replace(/\s+/g, '-') ===
          this.category
      );
    }
    console.log('Filtered products:', this.filteredProducts);
  }

  // Navigate to add product action
  insertAction(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'add', page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }

  // Delete a product
  onDelete(product: ProductOfStoreResponse): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete the product with ID: ${product.id}?`
    );
    if (confirmDelete) {
      this.storeService.deleteProductFromMyStore(product.id).subscribe((res: ApiResponse)=>{
        if(res.status === 'OK'){
          this.showToast('Success', 'Product deleted successfully', 'success');
          this.loadProducts(this.currentPage - 1);
        }else{
          this.showToast('Error', 'Failed to delete product', 'error');
        }
      });
    }
  }

  // Navigate to update product action
  updateAction(product: ProductOfStoreResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'update', productosid: product.id, page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }
  detailAction(product: ProductOfStoreResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'detail', productosid: product.id, page: this.currentPage },
      queryParamsHandling: 'merge',
    });
  }
  // Display a toast message
  showToast(title: string, message: string, type: 'success' | 'error'): void {
    this.toastService.showToast({
      title: title,
      message: message,
      type: type,
      duration: 2000,
    });
  }
}
