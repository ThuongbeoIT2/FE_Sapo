import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model'; // Cập nhật đường dẫn nếu cần


@Component({
  selector: 'app-product-detail-card',
  templateUrl: './product-detail-card.component.html',
  styleUrls: ['./product-detail-card.component.scss']
})
export class ProductDetailCardComponent  {
  @Input() product!: ProductResponse; // Nhận sản phẩm từ component cha
}
