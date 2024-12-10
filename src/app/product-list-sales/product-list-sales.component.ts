import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { ProductOfStoreResponse } from '../model/productOS.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-sales',
  templateUrl: './product-list-sales.component.html',
  styleUrls: ['./product-list-sales.component.scss']
})
export class ProductListSalesComponent implements OnInit{

  currentPage: number = 0;
  productOS : ProductOfStoreResponse[] = [];
  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 0;
    });
      this.storeService.getProductsOfMyStoreDashboard(this.currentPage)
        .subscribe({
          next: (data) => {
            console.log('Data:', data);
            this.productOS = data.content;
          },
          error: (error) => {
            console.error('Error loading products:', error);
          }
        });
  }
  navigateToDetail(product: ProductOfStoreResponse): void {
    this.router.navigate(['/productOS-detail'],
       { queryParams: { productosid: product.id, slug: product.slug } });
  }
}
