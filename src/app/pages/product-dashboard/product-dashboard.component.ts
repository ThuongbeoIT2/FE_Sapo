import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { ProductResponse } from 'src/app/model/product.model';
import { ProductOfStoreResponse } from 'src/app/model/productOS.model';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent {
  slug!: string;
  products: ProductResponse[] = [];
  productOSBySlug: ProductOfStoreResponse[]=[];
  product!: ProductResponse;

  constructor(
    private productService: ProductService,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const slug = params['slug'];
      const page = params['page'] || 0;
      console.log('slug : '+slug + '  |page : '+page);
      if (slug) {
        this.slug = slug;
        this.loadProductBySlug(slug);
        this.loadProductOSBySlug(slug,page);
      }
    });
  }
  loadProductOSBySlug(slug: string, page: number): void {
    this.storeService.getListProductOfStoreBySlug(slug, page).subscribe({
      next: (data: PaginatedResponse<ProductOfStoreResponse>) => {
        this.productOSBySlug = data.content;

      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }
  addProduct(newProduct: ProductResponse): void {
    const storedProducts = localStorage.getItem('favoriteProducts');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
    // Kiểm tra nếu sản phẩm đã tồn tại
    const isAlreadyFavorite = this.products.some(product => product.proId === newProduct.proId);

    if (!isAlreadyFavorite) {
      // Thêm sản phẩm mới vào danh sách
      this.products.push(newProduct);

      // Nếu danh sách vượt quá 12 sản phẩm, xóa sản phẩm cũ nhất
      if (this.products.length > 12) {
        this.products.shift(); // Xóa sản phẩm đầu tiên
      }

      // Cập nhật vào localStorage
      localStorage.setItem('favoriteProducts', JSON.stringify(this.products));
    } else {
      console.log('Product is already in favorites');
    }
  }
  loadProductBySlug(slug: string): void {
    this.productService.getProductBySlug(slug).subscribe({
      next: (product: ProductResponse) => {
        this.product = product;
        this.addProduct(this.product);
      },
      error: (error) => {
        console.error('Error loading product:', error);
      }
    });
  }
  productOSDetail(productOS: ProductOfStoreResponse): void {
    const productosid = productOS.id;
    this.router.navigate(['/productOS-detail'], { queryParams: { productosid: productosid, slug: this.slug } });
  }
}
