import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillPaymentResponse } from 'src/app/model/BillPaymentResponse.model';
import { OrderDetailResponse } from 'src/app/model/orderDetail.model';
import { ProductOfStoreResponse } from 'src/app/model/productOS.model';
import { User } from 'src/app/model/user.model';
import { PaymentService } from 'src/app/services/payment.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-order-detail-admin',
  templateUrl: './order-detail-admin.component.html',
  styleUrls: ['./order-detail-admin.component.scss']
})
export class OrderDetailAdminComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute,
     private paymentService: PaymentService,
     private storeService: StoreService,
     private userService: UserService
   ) {}
 orderId!: number ;
 user!: User;
 billPaymentResponse!: BillPaymentResponse ;

 productOS!: ProductOfStoreResponse;
 orderData!: OrderDetailResponse ;

 ngOnInit(): void {
   this.route.queryParams.subscribe(params => {
     const orderId = +params['orderId'] || 0;
     this.orderId = orderId;
     console.log('Order ID:', orderId);
   });
   this.loadBillDetail(this.orderId);
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

 loadBillDetail(orderId: number) {
   this.paymentService.getPaymentBillDetail(orderId).subscribe({
     next: (ApiResponse) => {
       if (ApiResponse.status === 'OK') {
         console.log('Bill detail:', ApiResponse);
         this.billPaymentResponse = ApiResponse.data;
       } else {
         console.error('Error loading bill detail:', ApiResponse);
       }
     },
     error: (error) => {
       console.error('Error loading bill detail:', error);
     }
   });
 }

 completeOrder(){
    this.storeService.completeOrder(this.orderId).subscribe({
      next: (ApiResponse) => {
        if (ApiResponse.status === 'OK') {
          console.log('Order completed:', ApiResponse);
          window.location.reload();
        } else {
          console.error('Error completing order:', ApiResponse);
        }
      },
      error: (error) => {
        console.error('Error completing order:', error);
      }
    });
 }

 returnOrder() {
   this.storeService.cancelOrder(this.orderId).subscribe({
     next: (ApiResponse) => {
       if (ApiResponse.status === 'OK') {
         console.log('Order returned:', ApiResponse);
         window.location.reload();
       } else {
         console.error('Error returning order:', ApiResponse);
       }
     },
     error: (error) => {
       console.error('Error returning order:', error);
     }
   });
 }


 shipperPaymentAccount: string = '';

payShipper() {
  if (this.shipperPaymentAccount === '') {
    console.error('Invalid payment amount');
    return;
  }

  this.paymentService.orderReceived( this.shipperPaymentAccount,this.billPaymentResponse.billID).subscribe({
    next: (ApiResponse) => {
      if (ApiResponse.status === 'OK') {
        console.log('Payment to shipper successful:', ApiResponse);
        window.location.reload();
      } else {
        console.error('Error paying shipper:', ApiResponse);
      }
    },
    error: (error) => {
      console.error('Error paying shipper:', error);
    }
  });
}
}
