import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated(): String | null{
    const accessToken = localStorage.getItem('accessToken');

    return accessToken;
  }

  login(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

}
