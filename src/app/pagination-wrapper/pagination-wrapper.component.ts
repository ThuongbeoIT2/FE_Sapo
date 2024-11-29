import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination-wrapper',
  templateUrl: './pagination-wrapper.component.html',
  styleUrls: ['./pagination-wrapper.component.scss']
})
export class PaginationWrapperComponent implements OnInit {
  pages: number[] = [];
  visiblePages: number[] = [];
  currentPage: number = 1;
  maxVisiblePages: number = 5;

  @Input() maxPage: number = 100; // Nhận giá trị tổng số trang từ component cha
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>(); // Emit khi thay đổi trang

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Khởi tạo danh sách các trang
    this.pages = Array.from({ length: this.maxPage }, (_, i) => i + 1);

    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.currentPage = page;
      this.updateVisiblePages();
    });
  }

  // Điều hướng trang (tăng/giảm)
  navigate(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 0 && newPage <this.maxPage -1) {
      this.navigateToPage(newPage);
    }
  }

  // Điều hướng đến một trang cụ thể
  navigateToPage(page: number): void {
    if (page >= 1 && page <= this.maxPage) { // Chỉ cho phép trong giới hạn trang
      this.currentPage = page;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge' // Giữ các query parameters khác
      });
      this.updateVisiblePages();
      this.pageChanged.emit(this.currentPage); // Emit sự kiện thay đổi trang
    }
  }

  // Cập nhật các trang hiển thị (visiblePages)
  updateVisiblePages(): void {
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = this.currentPage - half;
    let end = this.currentPage + half;

    if (start < 1) {
      start = 1;
      end = this.maxVisiblePages;
    }

    if (end > this.maxPage) {
      end = this.maxPage;
      start = this.maxPage - this.maxVisiblePages + 1;
    }

    if (start < 1) {
      start = 1;
    }

    this.visiblePages = this.pages.slice(start - 1, end);
  }

}
