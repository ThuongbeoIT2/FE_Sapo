import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreType } from '../model/store-type.model';

@Injectable({
  providedIn: 'root'
})
export class StoretypeService {

  private apiUrl = 'http://localhost:8080/storetype/';

  constructor(private http: HttpClient) {}

  getStoreTypes(): Observable<StoreType[]> {
    return this.http.get<StoreType[]>(this.apiUrl.concat("getAll"));
  }
   // Hàm xóa StoreType theo ID
   deleteStoreType(id: number): Observable<any> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.get<any>(url);
  }
}



