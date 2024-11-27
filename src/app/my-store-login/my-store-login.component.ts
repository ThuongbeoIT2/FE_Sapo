import { Component, OnInit } from '@angular/core';
import { StoreResponse } from '../model/store.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { ToastService } from '../services/toast.service';
import { StoretypeService } from '../services/storetype.service';
import { StoreType } from '../model/store-type.model';
import { ApiResponse } from '../model/ApiResponse.model';

@Component({
  selector: 'app-my-store-login',
  templateUrl: './my-store-login.component.html',
  styleUrls: ['./my-store-login.component.scss']
})
export class MyStoreLoginComponent implements OnInit {
  myStore: StoreResponse | null = null; // My store
  storeTypes: StoreType[] = []; // Store type list
  filteredStores: StoreResponse[] = []; // Filtered stores
  storeType: string = ''; // Selected store type (slug)
  password: string = ''; // Password
  passwordError: boolean = false; // Error state for password
  loginData: any = {
    storeCode: '',
    password: '',
  }
  storeData: any = {
    storeName: '',
    address: '',
    phoneNumber: '',
    thumbnail: null,
    eKyc_01: null,
    eKyc_02: null,
    description: '',
    storeType: '',
    termsAccepted: false,
    VNPayAccountLink: '',
  };

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.storeData[field] = file;
    }
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private storeTypeService: StoretypeService) { }

    ngOnInit(): void {
      this.fetchStoreTypes();
      this.loadMyStore();
    }

    registerStore() {
      console.log('Registering store:', this.storeData);
      if (!this.storeData.storeName || !this.storeData.address || !this.storeData.phoneNumber || !this.storeData.thumbnail || !this.storeData.eKyc_01 || !this.storeData.eKyc_02 || !this.storeData.description || !this.storeData.storeType || !this.storeData.VNPayAccountLink) {
        alert('All fields are required!');
        return;
      }

      this.storeService.registerStore(this.storeData.storeName,this.storeData.address,this.storeData.phoneNumber,this.storeData.description,this.storeData.thumbnail,this.storeData.eKyc_01,this.storeData.eKyc_02,this.storeData.storeType, this.storeData.VNPayAccountLink).subscribe({
        next: (data) => {
          console.log('Store registered successfully!', data);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error registering store!', error);
        }
      });
    }

    loadMyStore(): void {
      this.storeService.getMyStore().subscribe({
        next: (data) => {
          this.myStore = data;
          this.loginData.storeCode = this.myStore.storeCode;
          console.log('My store:', this.myStore);
        },
        error: (error) => {
          console.error('Error fetching my store!', error);
        }
      });

    }

    login(): void {
      console.log('Logging in:', this.loginData);
      if (!this.loginData.storeCode || !this.loginData.password) {
        console.error('Store code and password are required!');
        return;
      }
      this.storeService.loginStore(this.loginData.storeCode,this.loginData.password).subscribe(
        (res : ApiResponse) => {
          if(res.status == 'OK'){
            localStorage.setItem('storeCode', this.loginData.storeCode);
            this.router.navigateByUrl('/store-dashboard');
        }else{
          this.passwordError = true;
          this.password = '';
        }
        }
      );

    }
    fetchStoreTypes(): void {
      this.storeTypeService.getStoreTypes().subscribe({
        next: (data) => {
          this.storeTypes = data;
          this.storeType = this.storeTypes[0].slug; // Default to 'All'
        },
        error: (error) => {
          console.error('Error fetching store types!', error);
        }
      });
    }
}

