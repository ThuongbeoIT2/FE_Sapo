import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../model/ApiResponse.model';
import { CategoryResponse } from '../../model/category.model';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
})
export class AddProductFormComponent implements OnInit {
  thumbnail: File | null = null;
  proName: string = '';
  slug: string = '';
  description: string = '';
  category: string = '';
  categories: CategoryResponse[] = []; // Fetch categories from API

  typingTimer: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.thumbnail = input.files[0];
    }
  }

  onProductNameChange(event: Event): void {
    this.proName = (event.target as HTMLInputElement).value;
    this.slug = this.proName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  onProductNameInput(event: Event): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onProductNameChange(event);
    }, 300);
  }

  onDescriptionInput(event: Event): void {
    this.description = (event.target as HTMLTextAreaElement).value;
  }

  onCategoryChange(event: Event): void {
    this.category = (event.target as HTMLSelectElement).value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Validate required fields
    if (!this.thumbnail) {
      this.showErrorToast('Error', 'Thumbnail is required');
      return;
    }
    if (!this.proName || !this.slug || !this.description || !this.category) {
      this.showErrorToast('Error', 'All fields are required');
      return;
    }

    // Call the service to insert a new product
    this.productService.insertProduct(this.proName, this.slug, this.description, this.category, this.thumbnail)
      .subscribe({
        next: (res: ApiResponse) => {
          console.log(res);
          if (res.status === 'OK') {
            this.showSuccessToast('Success', res.message || 'Product added successfully');
            this.resetForm(); // Reset the form
            this.router.navigateByUrl('/admin/product'); // Navigate to the desired route
          } else {
            this.showErrorToast('Error', res.message || 'Something went wrong');
          }
        },
        error: (error) => {
          console.error('Error occurred: ', error);
          this.showErrorToast('Error', `Failed to add product: ${error.message || error.error || error}`);
        }
      });
  }

  resetForm(): void {
    this.thumbnail = null;
    this.proName = '';
    this.slug = '';
    this.description = '';
    this.category = '';
  }

  showSuccessToast(title: string, message: string): void {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'success',
      duration: 2000,
    });
  }

  showErrorToast(title: string, message: string): void {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'error',
      duration: 2000,
    });
  }
}
