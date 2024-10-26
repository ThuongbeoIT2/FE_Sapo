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
  queryKey: string = ''; // Lưu từ khóa tìm kiếm

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Lắng nghe query params
    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
      this.queryKey = params['query'] || ''; // Lấy query key từ URL nếu có

      if (this.queryKey) {
        this.searchCategories(this.queryKey); // Thực hiện tìm kiếm nếu có query
      } else {
        this.loadCategories(); // Nếu không có query, load tất cả danh mục
      }
    });
  }

  // Tải tất cả danh mục
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

  // Tìm kiếm danh mục theo query key
  searchCategories(query: string): void {
    this.categoryService.searchCategories(query).subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Search Results:', this.categories);
        if (data.length > 0) {
          this.showToast('Search', `${data.length} categories found.`, 'success');
        } else {
          this.showToast('Search', 'No categories found.', 'error');
        }
      },
      error: (error) => {
        console.error('Search Error:', error);
        this.showToast('Error', 'Failed to search categories', 'error');
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
    const url = new URL(window.location.href); // Create a new URL object
    url.searchParams.delete('query');
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

 

  showToast(title: string, message: string, type: 'success' | 'error') {
    this.toastService.showToast({
      title: title,
      message: message,
      type: type,
      duration: 2000
    });
  }
}
