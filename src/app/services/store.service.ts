// store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreResponse } from '../model/store.model'; // Ensure correct path
import { ApiResponse } from '../model/ApiResponse.model'; // Ensure correct path
import { PaginatedResponse } from '../model/paginated-response.model'; // Ensure correct path

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/store/'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all stores with pagination
  getStores(page: number = 0): Observable<PaginatedResponse<StoreResponse>> {
    return this.http
      .get<PaginatedResponse<StoreResponse>>(`${this.apiUrl}getall?page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // Get store details by storeCode
  getStoreByCode(storeCode: string): Observable<StoreResponse> {
    return this.http
      .get<StoreResponse>(`${this.apiUrl}view/${storeCode}`)
      .pipe(catchError(this.handleError));
  }

  // Register a new store
  registerStore(
    storeName: string,
    address: string,
    phoneNumber: string,
    description: string,
    thumbnail: File,
    eKyc: File,
    storeType: string
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('eKyc', eKyc);
    formData.append('storeType', storeType);

    return this.http
      .post<ApiResponse>(`${this.apiUrl}register-store`, formData)
      .pipe(catchError(this.handleError));
  }

  // Update store information
  updateStore(
    storeCode: string,
    storeName: string,
    address: string,
    description: string,
    phoneNumber: string
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('phoneNumber', phoneNumber);

    return this.http
      .post<ApiResponse>(`${this.apiUrl}update/${storeCode}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Approve a store
  approveStore(storeCode: string): Observable<string> {
    return this.http
      .get<string>(`${this.apiUrl}acpstore/${storeCode}`)
      .pipe(catchError(this.handleError));
  }

  // Get stores by store type
  getStoresByType(slug: string, page: number = 0): Observable<PaginatedResponse<StoreResponse>> {
    return this.http
      .get<PaginatedResponse<StoreResponse>>(`${this.apiUrl}list-store/${slug}?page=${page}`)
      .pipe(catchError(this.handleError));
  }

  warningStore(storeCode: string, email: string, message: string): Observable<string> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('message', message);

    return this.http
      .post<string>(`${this.apiUrl}warningstore/${storeCode}`, formData)
      .pipe(catchError(this.handleError));
  }
  // Search stores by keyword
  searchStores(key: string, page: number = 0): Observable<PaginatedResponse<StoreResponse>> {
    return this.http
      .get<PaginatedResponse<StoreResponse>>(`${this.apiUrl}search?key=${key}&page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // Login to store
  loginStore(storeCode: string, password: string): Observable<string> {
    const formData = new FormData();
    formData.append('storeCode', storeCode);
    formData.append('password', password);

    return this.http
      .post<string>(`${this.apiUrl}login-store`, formData)
      .pipe(catchError(this.handleError));
  }

  // Get current manager's store information
  getMyStore(): Observable<StoreResponse> {
    return this.http
      .get<StoreResponse>(`${this.apiUrl}manager-store/my-store`)
      .pipe(catchError(this.handleError));
  }

  // Get products from the manager's store
  getProductsOfMyStore(page: number = 0): Observable<PaginatedResponse<any>> {
    return this.http
      .get<PaginatedResponse<any>>(`${this.apiUrl}manager-store/my-store/product?page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // Search products in manager's store
  searchProductsInMyStore(key: string, page: number = 0): Observable<PaginatedResponse<any>> {
    return this.http
      .get<PaginatedResponse<any>>(`${this.apiUrl}manager-store/my-store/product/search?key=${key}&page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // Get product details from manager's store
  getProductFromMyStore(productOfStoreId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}manager-store/my-store/product/${productOfStoreId}`)
      .pipe(catchError(this.handleError));
  }

  // Insert a new product to manager's store
  insertProductToMyStore(
    priceI: number,
    priceO: number,
    discount: number,
    slugProduct: string
  ): Observable<string> {
    const formData = new FormData();
    formData.append('priceI', priceI.toString());
    formData.append('priceO', priceO.toString());
    formData.append('discount', discount.toString());
    formData.append('slugProduct', slugProduct);

    return this.http
      .post<string>(`${this.apiUrl}manager-store/my-store/product/insert`, formData)
      .pipe(catchError(this.handleError));
  }

  // Update a product in manager's store
  updateProductInMyStore(
    id: number,
    priceI: number,
    priceO: number,
    discount: number
  ): Observable<string> {
    const formData = new FormData();
    formData.append('priceI', priceI.toString());
    formData.append('priceO', priceO.toString());
    formData.append('discount', discount.toString());

    return this.http
      .post<string>(`${this.apiUrl}manager-store/my-store/product/update/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Delete a product from manager's store
  deleteProductFromMyStore(id: number): Observable<string> {
    return this.http
      .get<string>(`${this.apiUrl}manager-store/my-store/product/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}