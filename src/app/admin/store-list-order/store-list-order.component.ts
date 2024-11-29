import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailResponse } from 'src/app/model/orderDetail.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list-order',
  templateUrl: './store-list-order.component.html',
  styleUrls: ['./store-list-order.component.scss'],
})
export class StoreListOrderComponent implements OnInit {
  page: number = 0;
  maxPage: number=100;
    goToPage(page: number): void {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge',
      });
    }
  orderDetailResponse: OrderDetailResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
    });
    if(this.page == 0){
    this.loadOrderDetails(0);
    }
    this.loadOrderDetails(this.page);
  }


  loadOrderDetails(page: number): void {
    this.storeService.getOrderDetails(page).subscribe({
      next: (response: PaginatedResponse<OrderDetailResponse>) => {
        this.orderDetailResponse = response.content;
        this.maxPage = response.totalPages;
      },
      error: (error) => {
        console.error('Error:', error); // Xử lý lỗi nếu API thất bại
      },
    });
  }

  isStoreDashboardUrl(): boolean {
    return this.router.url.includes('/store-dashboard');
  }

  // Hiển thị chi tiết đơn hàng
  viewDetails(order: OrderDetailResponse): void {
    this.router.navigate(['/store-order-detail'], {
      relativeTo: this.route,
      queryParams: { orderId: order.id },
    });
  }
}
