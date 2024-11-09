import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { ProductResponse } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-os-add-form',
  templateUrl: './product-os-add-form.component.html',
  styleUrls: ['./product-os-add-form.component.scss']
})
export class ProductOsAddFormComponent implements OnInit {
  storeCode: string = '';
  priceI!: number;
  priceO!: number;
  discount!: number;
  quantity!: number;
  description: string = '';
  slugProduct!: string;
  product?: ProductResponse;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeCode = localStorage.getItem('storeCode') || '';
    if (!this.storeCode) {
      window.location.href = '/login';
    }
    this.route.queryParams.subscribe((params) => {
      this.slugProduct = params['slugProduct'];
      if (this.slugProduct) {
        this.loadProduct(this.slugProduct);
      }
    });
  }

  loadProduct(slug: string) {
    this.productService.getProductBySlug(slug).subscribe((response) => {
      this.product = response;
    });
  }

  insertProductOS() {
    const productData = {
      storeCode: this.storeCode,
      priceI: this.priceI,
      priceO: this.priceO,
      discount: this.discount,
      quantity: this.quantity,
      description: this.description,
      slugProduct: this.slugProduct
    };
    console.log(productData);

   this.storeService.insertProductToMyStore(this.storeCode,this.priceI,this.priceO,this.discount,this.quantity,this.slugProduct,this.description)
   .subscribe((response:ApiResponse) => {
      if(response.status === 'OK'){
        window.location.href = '/store-product';
      }else{
        alert('Product not added');
      }
    });
  }
}
