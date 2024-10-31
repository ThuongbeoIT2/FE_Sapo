import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router'; // Import Router
import { ProductService } from 'src/app/services/product.service'; // Service search-related logic
import { CategoryService } from 'src/app/services/category.service'; // Assuming a service for categories

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  user?: User;
  searchQuery: string = ''; // Query entered by the user
  searchResults: any[] = []; // Store results after search

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private categoryService: CategoryService, // Service for category-related searches
    private router: Router // Router to handle navigation
  ) {}

  ngOnInit(): void {
  }

  onSearchClick() {
    console.log('Search query:', this.searchQuery);
    const url = new URL(window.location.href); // Tạo đối tượng URL từ URL hiện tại

    // Xử lý query param
    if (this.searchQuery.trim() === '') {

      url.searchParams.delete('query'); // Xóa param 'query' nếu rỗng
    } else {
      url.searchParams.set('query', this.searchQuery.trim()); // Thêm hoặc cập nhật param 'query'
    }

    // Thực hiện tìm kiếm dựa trên ngữ cảnh URL
    if (url.pathname.includes('category')) {
      this.searchCategory(); // Tìm kiếm category
    } else if (url.pathname.includes('product')) {
      this.searchProduct(); // Tìm kiếm product
    } else if (url.pathname.includes('store')) {
      this.searchStore(); // Tìm kiếm store
    } else {
      console.log('Unknown search context.');
    }
  }


  // Search products and update results
  searchProduct() {
    this.router.navigate(['/admin/product'], { queryParams: { query: this.searchQuery } });
  }

  // Search categories and update results
  searchCategory() {
    this.router.navigate(['/admin/category'], { queryParams: { query: this.searchQuery } }); // Navigate to category management view
  }

  // (Optional) Search stores - example function
  searchStore() {
    this.router.navigate(['/admin/store'], { queryParams: { query: this.searchQuery } });
  }
}
