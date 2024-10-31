import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-dasboard',
  templateUrl: './category-dasboard.component.html',
  styleUrls: ['./category-dasboard.component.scss']
})
export class CategoryDasboardComponent implements OnInit {
  products: ProductResponse[] = []; // All products
  slug!: string; // Current category ID
  cateId!: number; // Current category ID
  currentPage: number = 1; // Current page (starting from 1)
  constructor(private router : Router,
            private productService : ProductService,
            private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const cateId = params['cateId'];
       if (cateId) {
         this.cateId = cateId;
         this.loadProductsByCategory(cateId, 0);
       }
     });
  }
  navigateToProduct(slug: string): void {
    this.router.navigate(['/product-detail'], { queryParams: { slug: slug } });
  }
  loadProductsByCategory(slug:string,page: number): void {
    this.productService.getProductsByCategory(slug, page).subscribe({
      next: (data) => {
        this.products = data.content; // Lưu tất cả sản phẩm
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
}
