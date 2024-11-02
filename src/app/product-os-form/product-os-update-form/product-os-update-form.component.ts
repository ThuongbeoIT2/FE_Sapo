import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { ProductOfStoreResponse } from 'src/app/model/productOS.model';
import { ProductOSImageResponse } from 'src/app/model/productOSImageResponse.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-os-update-form',
  templateUrl: './product-os-update-form.component.html',
  styleUrls: ['./product-os-update-form.component.scss']
})
export class ProductOsUpdateFormComponent implements OnInit {
  productOSImages: ProductOSImageResponse[] = [];
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
      this.productosid = params['productosid'];
      if (this.productosid) {
        this.loadProduct(this.productosid);
        this.loadProductOSImages(this.productosid);
        console.log(this.productosid);
      }
    });
  }
  loadProductOSImages(id :number){
    this.storeService.getAllProductOSImageById(id).subscribe((response: ApiResponse) => {
      console.log(response);
      if (response.status === 'OK') {
        this.productOSImages = response.data;
      }
      else {
        alert('Product images not found');
      }
    });
  }
  // Load product details
  loadProduct(id: number) {
    this.storeService.getProductFromMyStore(id).subscribe((response: ProductOfStoreResponse) => {
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

  active(id : number){
    this.storeService.activeProductInMyStore(this.id).subscribe((response: ApiResponse) => {
      if(response.status === 'OK'){
        window.location.href = '/store-product';
      }else{
        alert(response.message);
      }
    });
  }
  activeImage(id : number){
    this.storeService.activeImageProductFromMyStore(id,this.productosid).subscribe((response: ApiResponse) => {
      if(response.status === 'OK'){
        window.location.reload();
      }else{
        alert(response.message);
      }
    });
  }
  inActiveImage(id : number){
    this.storeService.inActiveImageProductFromMyStore(id,this.productosid).subscribe((response: ApiResponse) => {
      if(response.status === 'OK'){
        window.location.reload();
      }else{
        alert(response.message);
      }
    });
  }
  // Update product details with the current form values
  updateProductOS() {
    const updatedProductData = {
      storeCode: this.storeCode,
      priceI: this.priceI,
      priceO: this.priceO,
      discount: this.discount,
      quantity: this.quantity,
      description: this.description,
      slugProduct: this.slugProduct,
      proName: this.proName,
      view: this.view,
      status: this.status,
      category: this.category,
      storeName: this.storeName
    };

    this.storeService.updateProductInMyStore(this.id, this.priceI, this.priceO, this.discount, this.description, this.quantity).subscribe(
      (response: ApiResponse) => {
        if (response.status === 'OK') {
          window.location.href = '/store-product';
        } else {
          alert(response.message);
        }
      }
    );
  }

  selectedFile: File | null = null;

  // Triggered when a file is selected
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      console.log('File selected:', this.selectedFile.name);
    }
  }

  // Handles the image upload
  uploadProductImage() {
    console.log(this.title, this.imageDescription, this.selectedFile);
    if(this.title.trim() === ''|| this.imageDescription.trim() === ''){
      this.title = '';
      this.imageDescription = '';
      return;
    }
    if (!this.selectedFile) {
      alert('Please select an image to upload');
      this.title = '';
      this.imageDescription = '';
      return;
    }
    if (!this.productosid) {
      alert('Please save the product before uploading an image');
      this.title = '';
      this.imageDescription = '';
      return;
    }
    this.storeService.uploadProductImageToMyStore(this.title, this.imageDescription, this.selectedFile,this.productosid).subscribe(
      (response: ApiResponse) => {
        if (response.status === 'OK') {
          alert('Image uploaded successfully');
           window.location.reload();
        } else {
          alert('Image not uploaded');
        }
      }
    );


  }


}
