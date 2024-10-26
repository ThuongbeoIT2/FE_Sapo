import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../model/paginated-response.model'; // Ensure path is correct

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  constructor(private http: HttpClient) {}

  // Generic method to fetch paginated data
  getPaginatedData(apiUrl: string, page: number = 0): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(`${apiUrl}?page=${page}`);
  }
}
