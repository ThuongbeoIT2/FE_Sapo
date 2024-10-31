import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model'; // Cập nhật đường dẫn nếu cần


@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent  {
  @Input() product!: ProductResponse;
  productAdded: boolean = false; // Nhận sản phẩm từ component cha
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slugProduct = params.get('slugProduct');
      if (slugProduct) {
        this.addProductOS(slugProduct);
      }
    });
    this.checkStoreCode();
  }


  checkStoreCode(): void {
    const storeCode = localStorage.getItem('storeCode');
    if (storeCode) {
      this.productAdded = true;
    }
  }
  addProductOS(slugProduct: string): void {
  this.router.navigate(['/store-product'], { queryParams: { action: 'insert', slugProduct: slugProduct } });
  }
}
