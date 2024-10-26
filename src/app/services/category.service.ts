import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../model/category.model'; // Ensure this path is correct
import { ApiResponse } from '../model/ApiResponse.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/category/';

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(this.apiUrl.concat("getAll"));
  }

  searchCategories(key : string): Observable<CategoryResponse[]> {
    const formData: FormData = new FormData();
    formData.append('key', key);
    return this.http.post<CategoryResponse[]>(this.apiUrl.concat("search"),formData);
  }
  // Delete a category by ID
  deleteCategory(id: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}delete/${id}`;
    return this.http.get<ApiResponse>(url);
  }

  // Update a category with parameters
  updateCategory(id: number, cateName: string, slug: string, description: string, thumbnailImg?: File): Observable<ApiResponse> {
    const url = `${this.apiUrl}update/${id}`;
    const formData: FormData = new FormData();
    formData.append('cateName', cateName);
    formData.append('slug', slug);
    formData.append('description', description);

    // Only add thumbnailImg if it is provided
    if (thumbnailImg) {
      formData.append('thumbnailimg', thumbnailImg);
    }

    return this.http.post<ApiResponse>(url, formData);
  }

  // Insert a new category
  insertCategory(cateName: string, slug: string, description: string, thumbnail: File): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('cateName', cateName);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('thumbnailimg', thumbnail); // Ensure the key name matches your backend

    return this.http.post<ApiResponse>(this.apiUrl.concat('insert'), formData);
  }

  // Get a category by ID
  getCategoryById(id: number): Observable<CategoryResponse> {
    const url = `${this.apiUrl}getDetail/${id}`;
    return this.http.get<CategoryResponse>(url);
  }
}
