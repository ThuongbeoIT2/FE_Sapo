import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '../model/product.model';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';
import { CategoryResponse } from '../model/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  products: ProductResponse[] = []; // Tất cả sản phẩm
  filteredProducts: ProductResponse[] = []; // Sản phẩm sau khi lọc
  categories: CategoryResponse[] = []; // Danh sách danh mục

  category: string = ''; // Giá trị danh mục hiện tại (slug)
  action!: string; // Thao tác (add/update)
  query!: string; // Từ khóa tìm kiếm
  currentPage: number = 1; // Trang hiện tại (bắt đầu từ 1)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories(); // Lấy danh mục
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'] || '';
      this.currentPage = +params['page'] || 1;
      this.query = params['query'] || '';

      if (this.query) {
        this.searchProducts(this.query, this.currentPage - 1);
      }
      this.loadProducts(this.currentPage - 1);
    });
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = [
          { id: 0, cateName: 'Tất cả', slug: '', thumbnail: '', description: '' },
          ...data
        ];
        this.category = this.categories[0].slug; // Mặc định là 'Tất cả'
      },
      error: (error) => {
        console.error('Có lỗi xảy ra khi lấy danh mục!', error);
      }
    });
  }

  loadProducts(page: number): void {
    this.productService.getProducts(page).subscribe({
      next: (data) => {
        this.products = data.content; // Lưu tất cả sản phẩm
        this.filterProducts(); // Lọc sản phẩm sau khi tải
      },
      error: (error) => {
        this.showToast('Error', 'Không thể tải sản phẩm', 'error');
        console.error('Error loading products:', error);
      }
    });
  }

  searchProducts(key: string, page: number): void {
    this.productService.searchProducts(key, page).subscribe({
      next: (data) => {
        this.products = data.content;
        this.filterProducts(); // Cập nhật danh sách đã lọc
      },
      error: (error) => {
        this.showToast('Error', 'Không thể tìm kiếm sản phẩm', 'error');
        console.error('Error loading products:', error);
      }
    });
  }

  onCategoryChange(): void {
    this.filterProducts(); // Lọc sản phẩm khi danh mục thay đổi
  }

  filterProducts(): void {
    console.log(this.category);
    if (this.category === '') {
      // Hiển thị tất cả nếu chọn "Tất cả"
      this.filteredProducts = [...this.products];
    } else {
      // Lọc sản phẩm theo danh mục
      this.filteredProducts = this.products.filter(
        (product) => product.category.trim().toLowerCase().replace(/\s+/g, '-') === this.category
      );
      console.log(this.filteredProducts);
    }
  }

  insertAction(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'add', page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  onDelete(product: ProductResponse): void {
    const confirmDelete = confirm(
      `Bạn có chắc muốn xóa sản phẩm với ID: ${product.proId}?`
    );
    if (confirmDelete) {
      this.productService.deleteProduct(product.proId).subscribe({
        next: () => {
          this.showToast('Success', 'Xóa sản phẩm thành công', 'success');
          this.products = this.products.filter(
            (pr) => pr.proId !== product.proId
          );
          this.filterProducts(); // Cập nhật danh sách sau khi xóa
        },
        error: (error) => {
          this.showToast('Error', 'Xóa sản phẩm thất bại', 'error');
          console.error('Deletion error:', error);
        }
      });
    }
  }

  updateAction(product: ProductResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { action: 'update', slug: product.slug, page: this.currentPage },
      queryParamsHandling: 'merge'
    });
  }

  showToast(title: string, message: string, type: 'success' | 'error'): void {
    this.toastService.showToast({
      title: title,
      message: message,
      type: type,
      duration: 2000
    });
  }
}
