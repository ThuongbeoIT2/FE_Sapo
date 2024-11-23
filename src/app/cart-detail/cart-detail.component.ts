import { Component ,OnInit} from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { OrderDetailResponse } from '../model/orderDetail.model';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  orders: OrderDetailResponse[] = [];
  constructor(private paymentService : PaymentService) { }
  orderSuccess: OrderDetailResponse[] = [];
  orderInit: OrderDetailResponse[] = [];
  ngOnInit(): void {

    this.paymentService.getOrderDetailsInCart().subscribe({
      next: (ApiResponse) => {
        this.orders = ApiResponse.data;
        this.orderSuccess = this.orders.filter(order => order.initStatus === 'SUCCESS');
        this.orderInit = this.orders.filter(order => order.initStatus === 'INIT');
        console.log('Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });

  }
  editOrder(order: OrderDetailResponse): void {
    // Logic to edit the order
    console.log('Editing order', order);
  }

  buyOrder(order: OrderDetailResponse): void {
      this.paymentService.PaymentInCart(order.id).subscribe({
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

  deleteOrder(order: OrderDetailResponse): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.paymentService.deleteOrder(order.id).subscribe({
        next: (ApiResponse) => {
          if (ApiResponse.status === 'OK') {
            this.orders = this.orders.filter((o) => o.id !== order.id);
            console.log('Orders:', this.orders);
            window.location.reload();
          }
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        }
      });
    }
  }
  viewOrderById(userOrder : OrderDetailResponse){
  window.location.href = `/order-detail?orderId=${userOrder.id}`;

  }
}
