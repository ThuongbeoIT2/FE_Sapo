// store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreResponse } from '../model/store.model'; // Ensure correct path
import { ApiResponse } from '../model/ApiResponse.model'; // Ensure correct path
import { PaginatedResponse } from '../model/paginated-response.model'; // Ensure correct path
import { ProductOfStoreResponse } from '../model/productOS.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private apiUrl = 'http://localhost:8080/store/'; // Backend API URL
  private apiUrlOS = 'http://localhost:8080/productOS/';
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
    eKyc_01: File,
    eKyc_02: File,
    storeType: string
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('storeName', storeName);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('eKyc_01', eKyc_01);
    formData.append('eKyc_02', eKyc_02);
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
// Login to store
loginStore(storeCode: string, password: string): Observable<ApiResponse> {
  const formData = new FormData();
  formData.append('storeCode', storeCode);
  formData.append('password', password);

  return this.http
    .post<ApiResponse>(`${this.apiUrl}login-store`, formData)
    .pipe(
      catchError((error) => this.handleError(error))
    );
}

  // Get current manager's store information
  getMyStore(): Observable<StoreResponse> {
    return this.http
      .get<StoreResponse>(`${this.apiUrl}manager-store/my-store`)
      .pipe(catchError(this.handleError));
  }

  // Get products from the manager's store
  getProductsOfMyStore(page: number = 0): Observable<PaginatedResponse<ProductOfStoreResponse>> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('storeCode', storeCode);
    formData.append('page', page.toString());
    return this.http
      .post<PaginatedResponse<ProductOfStoreResponse>>(`${this.apiUrlOS}product`,formData)
      .pipe(catchError(this.handleError));
  }
  getListProductOfStoreBySlug(slug:string,page: number): Observable<PaginatedResponse<ProductOfStoreResponse>> {
    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('page', page.toString());
    return this.http
      .post<PaginatedResponse<ProductOfStoreResponse>>(`${this.apiUrlOS}getPOSBySlug`,formData)
      .pipe(catchError(this.handleError));
  }
  // Search products in manager's store
  searchProductsInMyStore(key: string, page: number = 0): Observable<PaginatedResponse<ProductOfStoreResponse>> {
    return this.http
      .get<PaginatedResponse<ProductOfStoreResponse>>(`${this.apiUrlOS}/search?key=${key}&page=${page}`)
      .pipe(catchError(this.handleError));
  }

  // Get product details from manager's store
  getProductFromMyStore(productOfStoreId: number): Observable<ProductOfStoreResponse> {
    const formData = new FormData();
    return this.http
      .post<ProductOfStoreResponse>(`${this.apiUrlOS}${productOfStoreId}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Insert a new product to manager's store
  insertProductToMyStore(
    storeCode: string,
    priceI: number,
    priceO: number,
    discount: number,
    quantity: number,
    slugProduct: string,
    description: string
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('storeCode', storeCode);
    formData.append('priceI', priceI.toString());
    formData.append('priceO', priceO.toString());
    formData.append('discount', discount.toString());
    formData.append('quantity', quantity.toString());
    formData.append('slugProduct', slugProduct);
    formData.append('description', description);

    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}insert`, formData)
      .pipe(catchError(this.handleError));
  }

  // Update a product in manager's store
  updateProductInMyStore(
    id: number,
    priceI: number,
    priceO: number,
    discount: number,
    description: string,
    quantity: number,
  ): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('storeCode', storeCode);
    formData.append('priceI', priceI.toString());
    formData.append('priceO', priceO.toString());
    formData.append('discount', discount.toString());
    formData.append('description', description);
    formData.append('quantity', quantity.toString());

    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}update/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  activeProductInMyStore(
    id: number
  ): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('storeCode', storeCode);

    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}active/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Delete a product from manager's store
  deleteProductFromMyStore(id: number): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('storeCode', storeCode);
    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}delete/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  uploadProductImageToMyStore(title:string,imageDescription:string,imageOS:File,productOSID:number): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', imageDescription);
    formData.append('imageOS', imageOS);
    formData.append('productOSID', productOSID.toString());
    formData.append('storeCode', storeCode);
    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}image/insert`, formData)
      .pipe(catchError(this.handleError));
  }
getAllProductOSImageById( productOSID: number): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('productOSID', productOSID.toString());
    formData.append('storeCode', storeCode);
    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}image/getAll`, formData)
      .pipe(catchError(this.handleError));
  }
  activeImageProductFromMyStore(id: number, productOSID: number): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('productOSID', productOSID.toString());
    formData.append('storeCode', storeCode);
    formData.append('id', 'id');
    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}image/active/${id}`, formData)
      .pipe(catchError(this.handleError));
  }
  inActiveImageProductFromMyStore(id: number, productOSID: number): Observable<ApiResponse> {
    const storeCode = localStorage.getItem('storeCode');
    if (!storeCode) {
      return throwError(() => 'Store code not found!');
    }
    const formData = new FormData();
    formData.append('productOSID', productOSID.toString());
    formData.append('storeCode', storeCode);
    formData.append('id', 'id');
    return this.http
      .post<ApiResponse>(`${this.apiUrlOS}image/inactive/${id}`, formData)
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
