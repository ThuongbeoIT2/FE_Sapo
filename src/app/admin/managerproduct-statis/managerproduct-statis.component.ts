import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailResponse } from 'src/app/model/orderDetail.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-managerproduct-statis',
  templateUrl: './managerproduct-statis.component.html',
  styleUrls: ['./managerproduct-statis.component.scss']
})
export class ManagerproductStatisComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
  ) {}
  page: number = 0;
  orderDetailResponse :OrderDetailResponse[] = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'] || ''; // Get action from query params
    });
    this.loadOrderDetails(this.page);
  }

  // Gọi API để lấy danh sách OrderDetail
  loadOrderDetails(page: number): void {
    this.storeService.getOrderDetails(page).subscribe({
      next: (response: PaginatedResponse<OrderDetailResponse>) => {
        this.orderDetailResponse = response.content;
        console.log('orderDetailResponse:', this.orderDetailResponse);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
