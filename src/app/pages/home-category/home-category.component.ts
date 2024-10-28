import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryResponse } from '../../model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss']
})
export class HomeCategoryComponent implements OnInit {
  categories: CategoryResponse[] = [];

  constructor(private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  navigateToCategory(id: number): void {
    this.router.navigate(['/category-detail'], { queryParams: { cateId: id } });
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: CategoryResponse[]) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }
}
