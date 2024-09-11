import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination-wrapper',
  templateUrl: './pagination-wrapper.component.html',
  styleUrls: ['./pagination-wrapper.component.scss']
})
export class PaginationWrapperComponent implements OnInit {
  pages: number[] = Array.from({ length: 100 }, (_, i) => i + 1); // Assuming 100 pages for example
  visiblePages: number[] = [];
  currentPage: number = 1;
  maxVisiblePages: number = 5;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = +params['page'] || 1;
      this.currentPage = page;
      this.updateVisiblePages();
    });
  }

  navigate(direction: number): void {
    const newPage = this.currentPage + direction;
    if (newPage >= 1 && newPage <= this.pages.length) {
      this.navigateToPage(newPage);
    }
  }

  navigateToPage(page: number): void {
    this.currentPage = page;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge' // merge with existing query parameters
    });
    this.updateVisiblePages();
  }

  updateVisiblePages(): void {
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = this.currentPage - half;
    let end = this.currentPage + half;

    if (start < 1) {
      start = 1;
      end = this.maxVisiblePages;
    }

    if (end > this.pages.length) {
      end = this.pages.length;
      start = this.pages.length - this.maxVisiblePages + 1;
    }

    if (start < 1) {
      start = 1;
    }

    this.visiblePages = this.pages.slice(start - 1, end);
  }
}
