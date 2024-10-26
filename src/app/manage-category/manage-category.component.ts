import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryResponse } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  categories: CategoryResponse[] = [];
  action!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  insertAction(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'add' },
      queryParamsHandling: 'merge'
    });
  }

  onDelete(category: CategoryResponse): void {
    if (confirm(`Delete category with ID: ${category.id}?`)) {
      this.categoryService.deleteCategory(category.id).subscribe({
        next: () => {
          this.showToast('Success', 'Category deleted successfully', 'success');
          this.categories = this.categories.filter(ct => ct.id !== category.id);
        },
        error: (error) => {
          this.showToast('Error', 'Failed to delete category', 'error');
          console.error('Deletion error:', error);
        }
      });
    }
  }

  updateAction(category: CategoryResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'update', id: category.id },
      queryParamsHandling: 'merge'
    });
  }

  onUpdate(id: number, cateName: string, slug: string, description: string, thumbnailImg: File): void {
    this.categoryService.updateCategory(id, cateName, slug, description, thumbnailImg).subscribe({
      next: () => {
        this.showToast('Success', 'Category updated successfully', 'success');
        const index = this.categories.findIndex(ct => ct.id === id);
        if (index !== -1) {
          this.categories[index] = { id, cateName, slug, description, thumbnail: URL.createObjectURL(thumbnailImg) };
        }
      },
      error: (error) => {
        this.showToast('Error', 'Failed to update category', 'error');
        console.error('Update error:', error);
      }
    });
  }

  showToast(title: string, message: string, type: 'success' | 'error') {
    this.toastService.showToast({
      title: title,
      message: message,
      type: type,
      duration: 2000
    });
  }
}
