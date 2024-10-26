import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { CategoryResponse } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-category-form',
  templateUrl: './update-category-form.component.html',
  styleUrls: ['./update-category-form.component.scss']
})
export class UpdateCategoryFormComponent implements OnInit {
  id: number = 0;
  thumbnail: File | undefined = undefined;
  thumbnailUrl: string | null = null;
  cateName: string = '';
  slug: string = '';
  description: string = '';
  typingTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ? +params['id'] : 0;
      console.log('Category ID:', this.id);
      if (this.id) {
        this.loadCategory(this.id);
      }
    });
  }

  loadCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category: CategoryResponse) => {
        console.log('Category:', category);
        this.cateName = category.cateName;
        this.slug = category.slug;
        this.description = category.description;
        this.thumbnailUrl = category.thumbnail;
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.showErrorToast('Error', 'Failed to load category');
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

  onCategoryNameChange(event: any): void {
    this.cateName = event.target.value;
    this.slug = this.cateName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  onCategoryNameInput(event: any): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onCategoryNameChange(event);
    }, 300);
  }

  onDescriptionInput(event: any): void {
    this.description = event.target.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted:', this.cateName, this.slug, this.description, this.thumbnail);
    this.categoryService.updateCategory(this.id, this.cateName, this.slug, this.description, this.thumbnail)
        .subscribe({
            next: (res: ApiResponse) => {
                console.log(res);
                if (res.status === 'OK') {
                    this.showSuccessToast('Success', res.message || 'Category updated successfully');
                    this.resetForm();
                    this.router.navigateByUrl('/admin/category');
                } else {
                    this.showErrorToast('Error', res.message || 'Something went wrong');
                }
            },
            error: (error) => {
                console.error("Error occurred: ", error);
                this.showErrorToast('Error', `Failed to update category: ${error.message || error.error || error}`);
            }
        });
  }

  resetForm(): void {
    this.thumbnail = undefined;
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
