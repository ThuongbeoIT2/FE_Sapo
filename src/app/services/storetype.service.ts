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

  // Hàm cập nhật StoreType với các tham số
  updateStoreType(id: number, typeName: string, slug: string, description: string, thumbnailImg: File): Observable<any> {
    const url = `${this.apiUrl}update/${id}`;
    const formData: FormData = new FormData();
    formData.append('typeName', typeName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('thumbnailimg', thumbnailImg);

    return this.http.post<any>(url, formData);
  }

  // Hàm thêm mới StoreType
  insertStoreType(typeName: string, slug: string, description: string, thumbnailImg: File): Observable<any> {
    const url = `${this.apiUrl}insert`;
    const formData: FormData = new FormData();
    formData.append('typeName', typeName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('thumbnailimg', thumbnailImg);

    return this.http.post<any>(url, formData);
  }
}
