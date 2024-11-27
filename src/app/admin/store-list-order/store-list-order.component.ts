import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailResponse } from 'src/app/model/orderDetail.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list-order',
  templateUrl: './store-list-order.component.html',
  styleUrls: ['./store-list-order.component.scss']
})
export class StoreListOrderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService
  ) {}

  page: number = 0; // Trang hiện tại
  orderDetailResponse: OrderDetailResponse[] = []; // Danh sách đơn hàng

  ngOnInit(): void {
    // Lắng nghe thay đổi của queryParams
    this.route.queryParams.subscribe(params => {
      this.page = +params['page'] || 0; // Lấy giá trị `page` từ query params (mặc định là 0)
      this.loadOrderDetails(this.page); // Gọi lại API khi `page` thay đổi
    });
  }

  // Gọi API để lấy danh sách OrderDetail
  loadOrderDetails(page: number): void {
    this.storeService.getOrderDetails(page).subscribe({
      next: (response: PaginatedResponse<OrderDetailResponse>) => {
        this.orderDetailResponse = response.content; // Lưu kết quả trả về từ API
        console.log('orderDetailResponse:', this.orderDetailResponse);
      },
      error: (error) => {
        console.error('Error:', error); // Xử lý lỗi nếu API thất bại
      },
    });
  }

  // Điều hướng đến một trang cụ thể
  goToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page }, // Cập nhật `page` trong URL
      queryParamsHandling: 'merge', // Giữ lại các queryParams khác nếu có
    });
  }

  viewDetails(order: OrderDetailResponse): void {
    console.log('Order details:', order);
  }
}
