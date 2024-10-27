// detail-store.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../services/store.service'; // Adjust path if needed
import { StoreResponse } from '../model/store.model'; // Adjust path if needed
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'; // Adjust path if needed
import { User } from '../model/user.model';

@Component({
  selector: 'app-detail-store',
  templateUrl: './detail-store.component.html',
  styleUrls: ['./detail-store.component.scss']
})
export class DetailStoreComponent implements OnInit {
  @Input() storeCode: string | null = ''; // Optional input from parent
  storeDetails!: StoreResponse; // Store details to display
  managerDetails!: User; // Store manager details fetched by email
  errorMessage: string = ''; // Store error messages

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    // Extract storeCode from query parameters
    this.route.queryParams.subscribe((params) => {
      this.storeCode = params['storeCode'] || ''; // Get storeCode from params
      console.log('Store code:', this.storeCode);
      if (this.storeCode) {
        this.fetchStoreDetails(this.storeCode);
      }
    });
  }

  // Approve a store and handle response
  approveStore(): void {
    if (!this.storeCode) {
      this.errorMessage = 'Store code is required!';
      console.error(this.errorMessage);
      return;
    }

    this.storeService.approveStore(this.storeCode).subscribe(
      (response: string) => {
        console.log('Store approved successfully:', response);
        this.storeDetails.status = true; // Update store status

        // Fetch manager details after approving the store
        if (this.storeDetails.email_manager) {
          this.fetchManagerDetails(this.storeDetails.email_manager);
        }
      },
      (error) => {
        this.errorMessage = 'Error approving store!';
        console.error('Approval error:', error);
      }
    );
  }

  // Fetch store details by storeCode
  fetchStoreDetails(storeCode: string): void {
    this.storeService.getStoreByCode(storeCode).subscribe(
      (response: StoreResponse) => {
        console.log('Store details:', response);
        this.storeDetails = response;

        // Fetch manager details if available
        if (this.storeDetails.email_manager) {
          this.fetchManagerDetails(this.storeDetails.email_manager);
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching store details!';
        console.error('Fetch error:', error);
      }
    );
  }

  // Fetch manager details by email
  fetchManagerDetails(email: string): void {
    this.userService.getUserByEmail(email).subscribe(
      (user: User) => {
        console.log('Manager details:', user);
        this.managerDetails = user; // Store manager details for further use
      },
      (error) => {
        this.errorMessage = 'Error fetching manager details!';
        console.error('Email fetch error:', error);
      }
    );
  }
}
