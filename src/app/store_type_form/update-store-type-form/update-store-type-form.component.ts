import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/ApiResponse.model';
import { StoreType } from 'src/app/model/store-type.model';
import { StoretypeService } from 'src/app/services/storetype.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-store-type-form',
  templateUrl: './update-store-type-form.component.html',
  styleUrls: ['./update-store-type-form.component.scss']
})
export class UpdateStoreTypeFormComponent implements OnInit {
  id: number = 0;
  thumbnail: File | undefined = undefined;
  thumbnailUrl: string | null = null;
  typeName: string = '';
  slug: string = '';
  description: string = '';
  typingTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private storeTypeService: StoretypeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] ? +params['id'] : 0;
      console.log('Store type ID:', this.id);
      if (this.id) {
        this.loadStoreType(this.id);
      }
    });
  }

  loadStoreType(id: number): void {
    this.storeTypeService.getStoreTypeById(id).subscribe({
      next: (storeType: StoreType) => {
        console.log('Store type:', storeType);
        this.typeName = storeType.typeName;
        this.slug = storeType.slug;
        this.description = storeType.description;
        this.thumbnailUrl = storeType.thumbnail;
      },
      error: (error) => {
        console.error('Error loading store type:', error);
        this.showErrorToast('Error', 'Failed to load store type');
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.thumbnail = event.target.files[0];
    } else {
      this.thumbnail = undefined;
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
    }, 300);
  }

  onDescriptionInput(event: any): void {
    this.description = event.target.value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Form submitted:', this.typeName, this.slug, this.description, this.thumbnail);
    this.storeTypeService.updateStoreType(this.id, this.typeName, this.slug, this.description, this.thumbnail)
        .subscribe({
            next: (res: ApiResponse) => {
                console.log(res);
                if (res.status === 'OK') {
                    this.showSuccessToast('Success', res.message || 'Store type updated successfully');
                    this.resetForm();
                    this.router.navigateByUrl('/admin/storetype');
                } else {
                    this.showErrorToast('Error', res.message || 'Something went wrong');
                }
            },
            error: (error) => {
                console.error("Error occurred: ", error);
                this.showErrorToast('Error', `Failed to update store type: ${error.message || error.error || error}`);
            }
        });
  }

  resetForm(): void {
    this.thumbnail = undefined;
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
