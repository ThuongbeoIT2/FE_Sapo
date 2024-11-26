import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductResponse } from '../model/product.model'; // Ensure path is correct
import { ApiResponse } from '../model/ApiResponse.model'; // Ensure path is correct
import { PaginatedResponse } from '../model/paginated-response.model'; // Ensure path is correct

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/product/'; // Backend API URL

  constructor(private http: HttpClient) {}


  // Fetch all products with pagination
  getProducts(page: number = 0): Observable<PaginatedResponse<ProductResponse>> {
    return this.http
      .get<PaginatedResponse<ProductResponse>>(`${this.apiUrl}getall?page=${page}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }
  getHOtProducts(page: number = 0): Observable<PaginatedResponse<ProductResponse>> {
    return this.http
      .get<PaginatedResponse<ProductResponse>>(`${this.apiUrl}getall-hotsales?page=${page}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Get product details by slug
  getProductBySlug(slug: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${this.apiUrl}view/${slug}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Insert a new product
  insertProduct(
    proName: string,
    slug: string,
    description: string,
    category: string,
    thumbnail: File
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('proName', proName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail); // Align with backend's `@RequestParam`
    formData.append('category', category);

    return this.http
      .post<ApiResponse>(`${this.apiUrl}insert`, formData)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Update an existing product
  updateProduct(
    id: number,
    proName: string,
    slug: string,
    description: string,
    category: string,
    thumbnail?: File
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('proName', proName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('category', category);

    // Add thumbnail if provided
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    return this.http
      .post<ApiResponse>(`${this.apiUrl}update/${slug}`, formData)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Delete product by ID
  deleteProduct(id: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${this.apiUrl}delete/${id}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Fetch products by category
  getProductsByCategory(cateId: number, page: number = 0): Observable<PaginatedResponse<ProductResponse>> {
    return this.http
      .get<PaginatedResponse<ProductResponse>>(`${this.apiUrl}list-product/${cateId}?page=${page}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Search products by keyword
  searchProducts(key: string, page: number = 0): Observable<PaginatedResponse<ProductResponse>> {
    return this.http
      .get<PaginatedResponse<ProductResponse>>(`${this.apiUrl}search?key=${key}&page=${page}`)
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    // Handle error response based on status code or other criteria
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage); // Return an observable with a user-facing error message
  }

}
