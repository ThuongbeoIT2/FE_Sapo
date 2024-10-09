import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { StoretypeService } from 'src/app/services/storetype.service';

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
    private toastService: ToastService
  ) {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];
    }
  }

  onStoreTypeNameChange(event: any): void {
    this.typeName = event.target.value;
    this.slug = this.typeName.toLowerCase().replace(/\s+/g, '-');
  }

  onTypeNameInput(event: any): void {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.onStoreTypeNameChange(event);
    }, 300); // Adjust the delay as needed
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.thumbnail) {
      this.showErrorToast('Error', 'Thumbnail image is required');
      return;
    }

    this.storeTypeService.insertStoreType(this.typeName, this.slug, this.description, this.thumbnail)
      .subscribe(
        response => {
          alert('Insert Payment method success:');
          window.location.href = '/admin/storetype';
        },
        error => {
          window.location.href = '/admin/storetype';
          this.showSuccessToast('Success', 'Store type added successfully');
        }
      );
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
