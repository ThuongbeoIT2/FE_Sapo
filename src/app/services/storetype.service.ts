import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreType } from '../model/store-type.model';
import { ApiResponse } from '../model/ApiResponse.model'; // Import model ApiResponse

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
  deleteStoreType(id: number): Observable<ApiResponse> { // Sửa đổi kiểu trả về
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.get<ApiResponse>(url);
  }

 // Hàm cập nhật StoreType với các tham số
updateStoreType(id: number, typeName: string, slug: string, description: string, thumbnailimg?: File): Observable<ApiResponse> { // Sửa đổi kiểu trả về
  const url = `${this.apiUrl}update/${id}`;
  const formData: FormData = new FormData();
  formData.append('typeName', typeName);
  formData.append('slug', slug);
  formData.append('description', description);

  // Chỉ thêm thumbnailimg nếu nó không null
  if (thumbnailimg) {
    formData.append('thumbnailimg', thumbnailimg);
  }

  return this.http.post<ApiResponse>(url, formData);
}


  // Hàm thêm mới StoreType
  insertStoreType(typeName: string, slug: string, description: string, thumbnail: File): Observable<ApiResponse> { // Sửa đổi kiểu trả về
    const formData = new FormData();
    formData.append('typeName', typeName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('thumbnailimg', thumbnail);  // Ensure the key name matches your backend

    return this.http.post<ApiResponse>(this.apiUrl.concat('insert'), formData); // Đảm bảo rằng URL chính xác
  }

  // Hàm tìm kiếm StoreType theo ID
  getStoreTypeById(id: number): Observable<StoreType> {
    const url = `${this.apiUrl}getDetail/${id}`;
    return this.http.get<StoreType>(url);
  }
}
