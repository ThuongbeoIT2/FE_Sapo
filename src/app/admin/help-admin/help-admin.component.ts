import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service'; // Import the CategoryService
import { CategoryResponse } from '../../model/category.model';
@Component({
  selector: 'app-help-admin',
  templateUrl: './help-admin.component.html',
  styleUrls: ['./help-admin.component.scss']
})
export class HelpAdminComponent implements OnInit {
  action: string | null = '';
  query : string = ''; // Save search keyword
  categories: CategoryResponse[] = []; // Array to hold categories

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService // Inject the CategoryService
  ) {}

  ngOnInit(): void {
    const url = new URL(window.location.href); // Create a new URL object
    this.route.queryParams.subscribe(params => {
      this.action = params['action'] || ''; // Get action from query params
      this.query = params['query'] || ''; // Get action from query params
      if (this.query=== '') {
          url.searchParams.delete('query'); // Remove query param if empty
      }
    });
  }

  insertAction(): void {
    const url = new URL(window.location.href); // Create a new URL object
    url.searchParams.delete('query');
    url.searchParams.set('action', 'add'); // Set action to 'add'
    window.history.pushState({}, '', url.toString()); // Update the browser's URL without reloading
    window.location.reload(); // Reload the page to reflect changes
  }


  requests = [
    {
      id: 1,
      email: 'customer1@example.com',
      content: 'Tôi muốn hỏi về chính sách bảo hành của sản phẩm.',
      image: 'https://via.placeholder.com/50?text=1',
      date: new Date(2024, 10, 29),
    },
    {
      id: 2,
      email: 'customer2@example.com',
      content: 'Làm sao để đổi trả sản phẩm bị lỗi?',
      image: 'https://via.placeholder.com/50?text=2',
      date: new Date(2024, 10, 28),
    },
    {
      id: 3,
      email: 'customer3@example.com',
      content: 'Sản phẩm của tôi bị giao sai màu, tôi cần hỗ trợ.',
      image: 'https://via.placeholder.com/50?text=3',
      date: new Date(2024, 10, 27),
    },
    {
      id: 4,
      email: 'customer4@example.com',
      content: 'Khi nào hàng đặt trước của tôi sẽ được giao?',
      image: 'https://via.placeholder.com/50?text=4',
      date: new Date(2024, 10, 26),
    },
    {
      id: 5,
      email: 'customer5@example.com',
      content: 'Tôi cần hóa đơn đỏ cho đơn hàng vừa mua.',
      image: 'https://via.placeholder.com/50?text=5',
      date: new Date(2024, 10, 25),
    },
    {
      id: 6,
      email: 'customer6@example.com',
      content: 'Hỗ trợ thay đổi địa chỉ nhận hàng.',
      image: 'https://via.placeholder.com/50?text=6',
      date: new Date(2024, 10, 24),
    },
    {
      id: 7,
      email: 'customer7@example.com',
      content: 'Sản phẩm này có kích thước khác không?',
      image: 'https://via.placeholder.com/50?text=7',
      date: new Date(2024, 10, 23),
    },
    {
      id: 8,
      email: 'customer8@example.com',
      content: 'Tôi muốn hỏi về phí vận chuyển cho đơn hàng này.',
      image: 'https://via.placeholder.com/50?text=8',
      date: new Date(2024, 10, 22),
    },
    {
      id: 9,
      email: 'customer9@example.com',
      content: 'Tôi cần gấp, có thể giao hàng nhanh trong ngày không?',
      image: 'https://via.placeholder.com/50?text=9',
      date: new Date(2024, 10, 21),
    },
    {
      id: 10,
      email: 'customer10@example.com',
      content: 'Sản phẩm này có sẵn ở cửa hàng không?',
      image: 'https://via.placeholder.com/50?text=10',
      date: new Date(2024, 10, 20),
    },
    // Thêm các yêu cầu tiếp theo
  ];

  


  // Hàm xử lý khi nhấn nút Sửa
  editRequest(item: any): void {
    alert(`Bạn muốn sửa yêu cầu của: ${item.email}`);
  }

  // Hàm xử lý khi nhấn nút Xóa
  deleteRequest(id: number): void {
    if (confirm('Bạn có chắc muốn xóa yêu cầu này?')) {
      this.requests = this.requests.filter(request => request.id !== id);
    }
  }
}
