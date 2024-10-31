import { Component,OnInit } from '@angular/core';
import { CategoryResponse } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.scss']
})
export class AllCategoryComponent implements OnInit {
 categories: CategoryResponse[] = []; // List of categories


 constructor(private categoryService: CategoryService,
  private router: Router
 ) { }
 ngOnInit(): void {
  this.loadCategories(); // Load categories
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
navigateToCategory(id: number): void {
  this.router.navigate(['/category-detail'], { queryParams: { cateId: id } });
}
}
