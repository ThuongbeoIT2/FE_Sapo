import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `http://localhost:8080/user`;

  constructor(private http: HttpClient) { }

  // Get current logged-in user information
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`);
  }

  // Get user by email
  getUserByEmail(email: string): Observable<User> {
    const formData = new FormData();
    formData.append('email', email);
    return this.http.post<User>(`${this.baseUrl}/email`, formData);
  }
}
