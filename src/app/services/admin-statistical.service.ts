import { Injectable } from '@angular/core';
import { AdminStatistical } from '../model/AdminStatistical.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StoreStatistical } from '../model/StoreStatistical.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticalService {

  private apiUrl = 'http://localhost:8080/admin/';
  private apiUrlStore = 'http://localhost:8080/store/';
  constructor(private http: HttpClient) {}


  getStatisticalData(): Observable<AdminStatistical> {
    return this.http.
    get<AdminStatistical>(`${this.apiUrl}statistical`).pipe(catchError(this.handleError));
  }

 getStoreStatistical(): Observable<StoreStatistical> {
    const storeCode = localStorage.getItem('storeCode');
    if(storeCode === null){
      return throwError(() => new Error('Store code not found'));
    }
    const formData = new FormData();
    formData.append('storeCode', storeCode);

   return this.http
     .post<StoreStatistical>(`${this.apiUrlStore}statistical`, formData)
     .pipe(catchError(this.handleError));
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
