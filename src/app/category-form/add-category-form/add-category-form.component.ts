import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CategoryService } from 'src/app/services/category.service'; // Adjust the import path if necessary
import { Router } from '@angular/router';
import { ApiResponse } from '../../model/ApiResponse.model';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.scss']
})
export class AddCategoryFormComponent {
  thumbnail: File | null = null;
  cateName: string = '';
  slug: string = '';
  description: string = '';
  typingTimer: any;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    private router: Router
  ) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];
    }
  }

  onCategoryNameChange(event: any): void {
    this.cateName = event.target.value;
    this.slug = this.cateName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  onCategoryNameInput(event: any): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onCategoryNameChange(event);
    }, 300); // Adjust the delay as needed
  }

  onDescriptionInput(event: any): void {
    this.description = event.target.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Check if thumbnail is provided
    if (!this.thumbnail) {
      this.showErrorToast('Error', 'Thumbnail image is required');
      return; // Exit the function if no thumbnail
    }

    // Call service to add category
    this.categoryService.insertCategory(this.cateName, this.slug, this.description, this.thumbnail)
      .subscribe({
        next: (res: ApiResponse) => {
          console.log(res);
          if (res.status === 'OK') {
            this.showSuccessToast('Success', res.message || 'Category added successfully');
            this.resetForm(); // Reset the form
            this.router.navigateByUrl('/admin/category'); // Navigate to the desired route
          } else {
            this.showErrorToast('Error', res.message || 'Something went wrong');
          }
        },
        error: (error) => {
          console.error("Error occurred: ", error);
          this.showErrorToast('Error', `Failed to add category: ${error.message || error.error || error}`);
        }
      });
  }

  resetForm(): void {
    this.thumbnail = null;
    this.cateName = '';
    this.slug = '';
    this.description = '';
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
}
