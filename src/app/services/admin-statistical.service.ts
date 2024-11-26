import { Injectable } from '@angular/core';
import { AdminStatistical } from '../model/AdminStatistical.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticalService {

  private apiUrl = 'http://localhost:8080/admin/';

  constructor(private http: HttpClient) {}

  getStatisticalData(): Observable<AdminStatistical> {
    return this.http.get<AdminStatistical>(`${this.apiUrl}statistical`);
  }
}
