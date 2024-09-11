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
  constructor(private route: ActivatedRoute,private storeTypeService: StoretypeService, private toastService : ToastService ) {}

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

  onEdit(storeType: StoreType): void {

    alert('Edit store type:'+ storeType.typeName);
  }

  onDelete(storeType: StoreType): void {
    if (confirm('Delete store type with ID: ' + storeType.id)) {
      this.storeTypeService.deleteStoreType(storeType.id).subscribe();
      window.location.reload();
  }
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
