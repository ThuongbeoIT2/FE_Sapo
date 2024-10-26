import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { StoretypeService } from 'src/app/services/storetype.service';
import { Router , ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../model/ApiResponse.model';

@Component({
  selector: 'app-add-store-type-form',
  templateUrl: './add-store-type-form.component.html',
  styleUrls: ['./add-store-type-form.component.scss']
})
export class AddStoreTypeFormComponent {
  thumbnail: File | null = null;
  typeName: string = '';
  slug: string = '';
  description: string = '';
  typingTimer: any;

  constructor(
    private storeTypeService: StoretypeService,
    private toastService: ToastService,
    private router : Router
  ) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];
    }
  }

  onStoreTypeNameChange(event: any): void {
    this.typeName = event.target.value;
    this.slug = this.typeName.trim().toLowerCase().replace(/\s+/g, '-');
  }

  onTypeNameInput(event: any): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onStoreTypeNameChange(event);
    }, 300); // Adjust the delay as needed
  }

  // Add this method to capture the description input
  onDescriptionInput(event: any): void {
    this.description = event.target.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    // Kiểm tra xem thumbnail có tồn tại không
    if (!this.thumbnail) {
        this.showErrorToast('Error', 'Thumbnail image is required');
        return; // Kết thúc hàm nếu không có thumbnail
    }

    // Gọi service để thêm loại cửa hàng
    this.storeTypeService.insertStoreType(this.typeName, this.slug, this.description, this.thumbnail)
        .subscribe({
            next: (res: ApiResponse) => { // Sử dụng ApiResponse để kiểm tra kiểu dữ liệu
                console.log(res);
                if (res.status === 'OK') { // Kiểm tra trạng thái của phản hồi
                    this.showSuccessToast('Success', res.message || 'Store type added successfully');
                    this.resetForm();  // Reset the form
                    this.router.navigateByUrl('/admin/storetype');  // Chuyển hướng đến route mong muốn
                } else {
                    this.showErrorToast('Error', res.message || 'Something went wrong');
                }
            },
            error: (error) => {
                // Ghi lại lỗi và hiển thị thông báo lỗi
                console.error("Error occurred: ", error);
                this.showErrorToast('Error', `Failed to add store type: ${error.message || error.error || error}`);
            }
        });
}


  resetForm(): void {
    this.thumbnail = null;
    this.typeName = '';
    this.slug = '';
    this.description = '';
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
