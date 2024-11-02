import { Component } from '@angular/core';
import { ProductOSImageResponse } from '../model/productOSImageResponse.model';
import { ProductOfStoreResponse } from '../model/productOS.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { ApiResponse } from '../model/ApiResponse.model';

@Component({
  selector: 'app-product-os-detail',
  templateUrl: './product-os-detail.component.html',
  styleUrls: ['./product-os-detail.component.scss']
})
export class ProductOSDetailComponent {
  productOSImages: ProductOSImageResponse[] = [];
  productOSImagesActive: ProductOSImageResponse[] = [];
  storeCode: string = '';
  priceI!: number;
  priceO!: number;
  discount!: number;
  quantity!: number;
  description: string = '';
  productosid!: number;
  slugProduct!: string;
  proName!: string;
  view!: number;
  status!: boolean;
  category!: string;
  storeName!: string;
  id!: number;
  product?: ProductOfStoreResponse;

  title = '';
  imageDescription = '';

  fakeComments = [
    {
      userName: 'Nguyễn Văn A',
      comment: 'Sản phẩm tuyệt vời! Tôi rất thích.',
      date: new Date(2024, 10, 1, 12, 30) // Thay đổi ngày giờ theo nhu cầu
    },
    {
      userName: 'Trần Thị B',
      comment: 'Dịch vụ khách hàng rất tốt. Tôi sẽ quay lại!',
      date: new Date(2024, 10, 2, 15, 0)
    },
    {
      userName: 'Lê Văn C',
      comment: 'Giá cả hợp lý, chất lượng sản phẩm rất tốt.',
      date: new Date(2024, 10, 3, 9, 15)
    },
    {
      userName: 'Phạm Thị D',
      comment: 'Giao hàng nhanh chóng, sản phẩm đúng như mô tả.',
      date: new Date(2024, 10, 4, 10, 45)
    },
    {
      userName: 'Ngô Văn E',
      comment: 'Tôi rất hài lòng với sản phẩm này, sẽ giới thiệu cho bạn bè.',
      date: new Date(2024, 10, 5, 14, 20)
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeCode = localStorage.getItem('storeCode') || '';
    this.route.queryParams.subscribe((params) => {
      this.productosid = params['productosid'];
      if (this.productosid) {
        this.loadProduct(this.productosid);
        this.loadProductOSImages(this.productosid);

      }
    });
  }
  loadProductOSImages(id :number){
    this.storeService.getAllProductOSImageById(this.productosid).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.status === 'OK') {
        this.productOSImages = response.data;
        this.productOSImagesActive = this.productOSImages.filter((image) => image.status === true).slice(0, 3);
        console.log(this.productOSImagesActive);
      }
      else {
        alert('Product images not found');
      }
    });
  }
  // Load product details
  loadProduct(id: number) {
    this.storeService.getProductFromMyStore(this.productosid).subscribe((response: ProductOfStoreResponse) => {
      if (response) {
        this.product = response;
        this.id = response.id;
        this.priceI = response.priceI;
        this.priceO = response.priceO;
        this.discount = response.discount;
        this.quantity = response.quantity;
        this.description = response.description;
        this.slugProduct = response.slug;
        this.proName = response.proName;
        this.view = response.view;
        this.status = response.status;
        this.category = response.category;
        this.storeName = response.storeName;
        this.storeCode = response.storeCode;
      }
    });
  }

   swapWithLargeImage(smallImageId: string) {
    const largeImage = document.getElementById('largeImage');
    const smallImage = document.getElementById(smallImageId);
    if (!largeImage || !smallImage) {
      return;
    }
    console.log(smallImage.getAttribute('src'));
    console.log(largeImage.getAttribute('src'));
    const tempSrc = largeImage.getAttribute('src') || '';
    largeImage.setAttribute('src', smallImage.getAttribute('src') || '');
    smallImage.setAttribute('src', tempSrc);
  }

}
