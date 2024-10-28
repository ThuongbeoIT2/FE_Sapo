import { Component, Input } from '@angular/core';
import { ProductResponse } from 'src/app/model/product.model';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss']
})
export class ItemProductComponent {
  @Input() productResponse!: ProductResponse;
}
