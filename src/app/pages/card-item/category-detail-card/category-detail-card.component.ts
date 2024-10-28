import { Component } from '@angular/core';
import { CategoryResponse } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail-card',
  templateUrl: './category-detail-card.component.html',
  styleUrls: ['./category-detail-card.component.scss']
})
export class CategoryDetailCardComponent {
  id!: number;
  category!: CategoryResponse;


  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
     const id = params['cateId'];
      if (id) {
        this.id = id;
        this.loadCategoryById(id);
      }
    });
  }

  loadCategoryById(id: number): void {
    this.categoryService.getCategoryById(id).subscribe({
      next: (category: CategoryResponse) => {
       this.category = category;
      },
      error: (error) => {
        console.error('Error loading category:', error);
      }
    });
  }



}
