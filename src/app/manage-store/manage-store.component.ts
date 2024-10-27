import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreResponse } from '../model/store.model';
import { StoreService } from '../services/store.service';
import { ToastService } from '../services/toast.service';
import { StoreType } from '../model/store-type.model';
import { StoretypeService } from '../services/storetype.service';

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.scss']
})
export class ManageStoreComponent implements OnInit {
  stores: StoreResponse[] = []; // All stores
  filteredStores: StoreResponse[] = []; // Filtered stores
  storeTypes: StoreType[] = []; // Store type list

  storeType: string = ''; // Selected store type (slug)
  action!: string; // Action (add, update, view detail)
  query!: string; // Search query
  currentPage: number = 1; // Current page

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private toastService: ToastService,
    private storeTypeService: StoretypeService
  ) {}

  ngOnInit(): void {
    this.fetchStoreTypes(); // Fetch store types
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'] || '';
      this.currentPage = +params['page'] || 1;
      this.query = params['query'] || '';

      if (this.query) {
        this.searchStores(this.query, this.currentPage - 1);
      } else {
        this.loadStores(this.currentPage - 1);
      }
    });
  }

  fetchStoreTypes(): void {
    this.storeTypeService.getStoreTypes().subscribe({
      next: (data) => {
        this.storeTypes = [
          { id: 0, typeName: 'All', slug: '', thumbnail: '', description: '' },
          ...data
        ];
        this.storeType = this.storeTypes[0].slug; // Default to 'All'
      },
      error: (error) => {
        console.error('Error fetching store types!', error);
      }
    });
  }

  loadStores(page: number): void {
    this.storeService.getStores(page).subscribe({
      next: (data) => {
        this.stores = data.content; // All stores loaded
        this.filterStores(); // Apply filter
      },
      error: (error) => {
        this.showToast('Error', 'Unable to load stores', 'error');
        console.error('Error loading stores:', error);
      }
    });
  }

  searchStores(query: string, page: number): void {
    this.storeService.searchStores(query, page).subscribe({
      next: (data) => {
        this.stores = data.content; // Search result stores
        this.filterStores(); // Apply filter
      },
      error: (error) => {
        this.showToast('Error', 'Unable to search stores', 'error');
        console.error('Error searching stores:', error);
      }
    });
  }

  onStoreTypeChange(): void {
    this.filterStores(); // Filter when store type changes
  }

  filterStores(): void {
    if (this.storeType === '') {
      // Show all stores if 'All' is selected
      this.filteredStores = [...this.stores];
    } else {
      // Filter stores by selected store type
      this.filteredStores = this.stores.filter(
        (store) =>
          store.storeType.trim().toLowerCase().replace(/\s+/g, '-') ===
          this.storeType
      );
    }
  }

  viewDetail(store: StoreResponse): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        action: 'viewDetail',
        storeCode: store.storeCode
      },
      queryParamsHandling: 'merge'
    });
  }

  showToast(title: string, message: string, type: 'success' | 'error'): void {
    this.toastService.showToast({
      title,
      message,
      type,
      duration: 2000
    });
  }
}
