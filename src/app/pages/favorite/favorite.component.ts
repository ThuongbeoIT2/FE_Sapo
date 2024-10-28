import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  products: ProductResponse[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    const storedProducts = localStorage.getItem('favoriteProducts');
    if (storedProducts) {
      const allProducts = JSON.parse(storedProducts);
      this.products = allProducts.length > 12 ? allProducts.slice(-12) : allProducts;
      console.log(this.products);
    }
  }

  navigateToCategory(slug: string): void {
    this.router.navigate(['/product-detail'], { queryParams: { slug: slug } });
  }
}
