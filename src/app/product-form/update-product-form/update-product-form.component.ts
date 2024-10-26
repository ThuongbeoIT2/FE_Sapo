import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { CategoryResponse } from 'src/app/model/category.model';
import { ProductResponse } from 'src/app/model/product.model'; // Ensure the path is correct
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service'; // Adjust the path if necessary
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss']
})
export class UpdateProductFormComponent implements OnInit {
  id: number = 0; // Product ID
  thumbnail: File | undefined = undefined; // For thumbnail file
  thumbnailUrl: string | null = null; // URL of the thumbnail
  proName: string = ''; // Product name
  slug: string = ''; // Slug for the product
  description: string = ''; // Description of the product
  category: string = ''; // Category of the product
  categories: CategoryResponse[] = [];
  typingTimer: any; // Timer for debouncing input

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private categoryService: CategoryService, // Service to handle category requests
    private productService: ProductService // Service to handle product requests
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.route.queryParams.subscribe(params => {
      this.slug = params['slug'] ? params['slug'] : ''; // Get product slug from query params
      console.log('Product slug:', this.slug);
      if (this.slug) {
        this.loadProduct(this.slug); // Load product details using slug
      }
    });
}

fetchCategories(): void {
  this.categoryService.getCategories().subscribe({
    next: (data) => {
      this.categories = data;
    },
    error: (error) => {
      console.error('There was an error!', error); // Log any error
      this.showErrorToast('Error', 'Failed to fetch categories');
    }
  });
}
  loadProduct(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product: ProductResponse) => {
        console.log('Product:', product);
        this.id = product.proId; // Set product ID
        this.proName = product.proName; // Set product name
        this.slug = product.slug; // Set product slug
        this.description = product.description; // Set description
        this.thumbnailUrl = product.thumbnail; // Set thumbnail URL
        this.category = product.category; // Set category
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.showErrorToast('Error', 'Failed to load product');
      }
    });
  }


  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];
    } else {
      this.thumbnail = undefined;
    }
  }
  onProductNameChange(event: any): void {
    this.proName = event.target.value; // Update product name
    this.slug = this.proName.trim().toLowerCase().replace(/\s+/g, '-'); // Generate slug
  }

  onProductNameInput(event: any): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onProductNameChange(event); // Handle input change after debounce
    }, 300);
  }

  onDescriptionInput(event: any): void {
    this.description = event.target.value; // Update description
  }
  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted:', this.proName, this.slug, this.description, this.category, this.thumbnail);
    this.category = this.category.trim().toLowerCase().replace(/\s+/g, '-'); // Trim category
    // Call the product service to update the product
    this.productService.updateProduct(this.id, this.proName, this.slug, this.description, this.category, this.thumbnail)
      .subscribe({
        next: (res: ApiResponse) => {
          console.log(res);
          if (res.status === 'OK') {
            this.showSuccessToast('Success', res.message || 'Product updated successfully');
            this.resetForm(); // Reset the form after successful update
            this.router.navigateByUrl('/admin/product'); // Navigate to products list
          } else {
            this.showErrorToast('Error', res.message || 'Something went wrong');
          }
        },
        error: (error) => {
          console.error("Error occurred: ", error);
          this.showErrorToast('Error', `Failed to update product: ${error.message || error.error || error}`);
        }
      });
  }


  resetForm(): void {
    this.thumbnail = undefined; // Reset thumbnail
    this.proName = ''; // Reset product name
    this.slug = ''; // Reset slug
    this.description = ''; // Reset description
    this.category = ''; // Reset category
    this.thumbnailUrl = null; // Reset thumbnail URL
  }

  showSuccessToast(title: string, message: string) {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'success',
      duration: 2000
    });
  }

  showErrorToast(title: string, message: string) {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'error',
      duration: 2000
    });
  }

  cancel(): void {
    this.router.navigate(['/admin/products']); // Navigate to the products list or any other route
  }
}
