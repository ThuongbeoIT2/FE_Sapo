import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailResponse } from '../model/orderDetail.model';
import { PaymentService } from '../services/payment.service';
import { StoreService } from '../services/store.service';
import { ProductOfStoreResponse } from '../model/productOS.model';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { urlVNPayResponse } from '../model/urlVNPayResponse.model';

@Component({
  selector: 'app-order-detail-user',
  templateUrl: './order-detail-user.component.html',
  styleUrls: ['./order-detail-user.component.scss']
})
export class OrderDetailUserComponent implements OnInit {
  constructor(private router: Router,
     private route: ActivatedRoute,
      private paymentService: PaymentService,
      private storeService: StoreService,
      private userService: UserService
    ) {}
  orderId: number = 0;
  user!: User;
  dataUser = {
    fullName: '',
    phoneNumber: '',
    address: '',
    paymentMethod: ''
  };
  urlVNPayResponse!: urlVNPayResponse;
  productOS!: ProductOfStoreResponse;
  orderData!: OrderDetailResponse ;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const orderId = +params['orderId'] || 0;
      this.orderId = orderId;
      console.log('Order ID:', orderId);
    });
    this.paymentService.getOrderById(this.orderId).subscribe({
      next: (ApiResponse) => {
        if (ApiResponse.status === 'OK') {
          this.orderData = ApiResponse.data;
        } else {
          console.error('Error loading order detail:', ApiResponse);
        }
      },
      error: (error) => {
        console.error('Error loading order detail:', error);
      }
    });
    this.userService.getCurrentUser().subscribe({

      next: (response: User) => {
        console.log('User:', response);
        this.user = response;
        this.dataUser.fullName = this.user.email;
        this.dataUser.phoneNumber = this.user.phoneNumber;
        this.dataUser.address = this.user.address;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });

  }
  loadProduct(id: number) {
    this.storeService.getProductFromMyStore(id).subscribe({
      next: (response: ProductOfStoreResponse) => {
        this.productOS = response;
        console.log('Product:', this.productOS);
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }

  payment(){
   if(this.dataUser.paymentMethod==='1'){
    this.paymentService.paymentWithVNPAY(this.orderId, this.dataUser.fullName, this.dataUser.phoneNumber, this.dataUser.address).subscribe({
      next: (ApiResponse) => {
        if (ApiResponse.status === 'OK') {
           this.urlVNPayResponse = ApiResponse.data;
           const url = this.urlVNPayResponse.redirectUrl;
          window.location.href = url;
        } else {
          console.error('Payment failed:', ApiResponse);
        }
      },
      error: (error) => {
        console.error('Error making payment:', error);
      }
    });
   }else{
    this.paymentService.paymentManual(this.orderId, this.dataUser.fullName, this.dataUser.phoneNumber, this.dataUser.address).subscribe({
      next: (ApiResponse) => {
        if (ApiResponse.status === 'OK') {
          console.log('Payment success:', ApiResponse);
          window.location.href = '/my-cart';
        } else {
          console.error('Payment failed:', ApiResponse);
        }
      },
      error: (error) => {
        console.error('Error making payment:', error);
      }
    });
   }
  }

}
