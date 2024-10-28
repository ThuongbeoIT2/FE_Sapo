import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent {
  slug!: string;
  products: ProductResponse[] = [];
  product!: ProductResponse;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.slug = slug;
        this.loadProductBySlug(slug);
        console.log(this.product);
      }
    });
    console.log(this.product);
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
}
