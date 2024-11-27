import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminStatistical } from 'src/app/model/AdminStatistical.model';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { ProductResponse } from 'src/app/model/product.model';
import { StoreResponse } from 'src/app/model/store.model';
import { AdminStatisticalService } from 'src/app/services/admin-statistical.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-overalladmin',
  templateUrl: './overalladmin.component.html',
  styleUrls: ['./overalladmin.component.scss']
})
export class OveralladminComponent implements OnInit {
  constructor(private adminStatisticalService: AdminStatisticalService,
              private storeService : StoreService,
              private route: ActivatedRoute,
              private router: Router,
              private productService : ProductService
  ) {
  }
  stores : StoreResponse []= [];
  adminStatistical !: AdminStatistical;
  products: ProductResponse[] = [];
  ngOnInit(): void {
    this.adminStatisticalService.getStatisticalData().subscribe(
      (data: AdminStatistical) => {
      this.adminStatistical = data;
      console.log(this.adminStatistical);
    });
    this.loadStores();
    this.loadHotProduct(0);
  }

  loadStores(): void {
    this.storeService.getStoresInActive().subscribe({
      next: (rp :ApiResponse) => {
        this.stores = rp.data ;

      },
      error: (error) => {
        console.error('Error loading stores:', error);
      }
    });
  }
  loadHotProduct(page: number): void {
    this.productService.getHOtProducts(page).subscribe({
      next: (data) => {
        console.log('Products:', data);
        this.products = data.content;
      },
      error: (error) => {
        console.error('Error loading products:', error);
      },
    });
  }

  viewDetail(store: StoreResponse): void {
    alert('View detail of store: ' + store.storeCode);
    // this.router.navigate(['/admin/store'], {
    //   queryParams: {
    //   action: 'viewDetail',
    //   storeCode: store.storeCode
    //   },
    //   queryParamsHandling: 'merge'
    // });
  }
}
