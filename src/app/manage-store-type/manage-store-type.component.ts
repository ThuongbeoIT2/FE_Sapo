import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreType } from '../model/store-type.model';
import { StoretypeService } from '../services/storetype.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-manage-store-type',
  templateUrl: './manage-store-type.component.html',
  styleUrls: ['./manage-store-type.component.scss']
})
export class ManageStoreTypeComponent {
  storeTypes: StoreType[] = [];
  action!: string;

  constructor(
    private route: ActivatedRoute,
    private storeTypeService: StoretypeService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.storeTypeService.getStoreTypes().subscribe({
      next: (data) => {
        this.storeTypes = data;
        console.log('Store Types:', this.storeTypes); // Kiểm tra dữ liệu
      },
      error: (error) => {
        console.error('There was an error!', error); // Kiểm tra lỗi
      }
    });
  }

  insertAction(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('action', 'add');
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
  onDelete(storeType: StoreType): void {
    if (confirm('Delete store type with ID: ' + storeType.id)) {
      this.storeTypeService.deleteStoreType(storeType.id).subscribe({
        next: () => {
          this.showSuccessToast('Success', 'Store type deleted successfully');

          this.storeTypes = this.storeTypes.filter(st => st.id !== storeType.id);

        },
        error: (error) => {
          this.showErrorToast('Error', 'Failed to delete store type');
          window.location.reload();
        }
      });
    }
  }
  updateAction(storeType: StoreType): void {
    const url = new URL(window.location.href);
    url.searchParams.set('action', 'update');
    url.searchParams.set('id', storeType.id.toString());
    window.history.pushState({}, '', url.toString());
    window.location.reload();
  }
  onUpdate(id: number, typeName: string, slug: string, description: string, thumbnailImg: File): void {
    this.storeTypeService.updateStoreType(id, typeName, slug, description, thumbnailImg).subscribe({
      next: () => {
        this.showSuccessToast('Success', 'Store type updated successfully');
        const index = this.storeTypes.findIndex(st => st.id === id);
        if (index !== -1) {
          this.storeTypes[index] = { id, typeName, slug, description, thumbnail: URL.createObjectURL(thumbnailImg) };
        }
      },
      error: (error) => {
        this.showErrorToast('Error', 'Failed to update store type');
        console.error('There was an error!', error);
      }
    });
  }

  showSuccessToast(title: string, message: string) {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'success',
      duration: 2000
    });
  }

  showErrorToast(title: string, message: string) {
    this.toastService.showToast({
      title: title,
      message: message,
      type: 'error',
      duration: 2000
    });
  }
}
