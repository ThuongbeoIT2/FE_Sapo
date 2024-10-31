import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent {
  products: ProductResponse[] = [];
 urlEvent: string = 'https://res.cloudinary.com/dqvr7kat6/image/upload/v1721289530/agbhiqut7wyrgpjcgxm9.jpg';
  constructor(private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts(0);
  }
  navigateToProduct(slug: string): void {
    this.router.navigate(['/product-detail'], { queryParams: { slug: slug } });
  }
  loadProducts(page: number): void {
    this.productService.getProducts(page).subscribe({
      next: (data) => {
        this.products = data.content; // Lưu tất cả sản phẩm
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
}
