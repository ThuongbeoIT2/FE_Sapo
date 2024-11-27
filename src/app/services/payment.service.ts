import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `http://localhost:8080/`;

  constructor(private http: HttpClient) {}

  getOrderDetailsInCart(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}cart/order`).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrder(orderDetailID: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderId', orderDetailID.toString());
    return this.http.post<ApiResponse>(`${this.baseUrl}/delete-order`,formData).pipe(
      catchError(this.handleError)
    );

  }
  getOrderById(orderDetailID: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderId', orderDetailID.toString());
    return this.http.post<ApiResponse>(`${this.baseUrl}order/getById`,formData).pipe(
      catchError(this.handleError)
    );

  }
  getOderStatus(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}orderstatus/get-all`).pipe(
      catchError(this.handleError)
    );

  }
  // Add item to cart
  addToCart(productOSID: number, quantity: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('productOSID', productOSID.toString());
    formData.append('quantity', quantity.toString());
    return this.http.post<ApiResponse>(`${environment.apiUrl}/add-to-cart`,formData).pipe(
      catchError(this.handleError)
    );
  }

  // Buy Now function
  buyNow(productOSID: number, quantity: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('productOSID', productOSID.toString());
    formData.append('quantity', quantity.toString());
    return this.http.post<ApiResponse>(`${environment.apiUrl}/buy-now`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Payment with VNPay
  paymentWithVNPAY(orderDetailID: number, fullName: string, phoneNumber: string, address: string): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderDetailID', orderDetailID.toString());
    formData.append('fullName', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);

    return this.http.post<ApiResponse>(`${environment.apiUrl}/paymentVNPAY`, formData).pipe(
      catchError(this.handleError)
    );
  }

  PaymentInCart(orderDetailID: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderDetailID', orderDetailID.toString());
    return this.http.post<ApiResponse>(`${environment.apiUrl}/order-in-cart`, formData).pipe(
      catchError(this.handleError)
    );
  }
  // Manual Payment
  paymentManual(orderDetailID: number, fullName: string, phoneNumber: string, address: string): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderDetailID', orderDetailID.toString());
    formData.append('fullName', fullName);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);

    return this.http.post<ApiResponse>(`${environment.apiUrl}/paymentManual`, formData).pipe(
      catchError(this.handleError)
    );
  }

  getPaymentBillDetail(orderId: number): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('orderId', orderId.toString());
    return this.http.post<ApiResponse>(`${this.baseUrl}payment-bill/detail`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
