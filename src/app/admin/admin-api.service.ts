import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response.model';
import { environment } from '../../environments/environment.development'; 

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getFormsPaginated(page: number, size: number): Observable<Response[]> {
    console.log('API_BASE_URL:', this.API_BASE_URL);
    return this.http.get<any>(`${this.API_BASE_URL}/api/forms/paginated?page=${page}&size=${size}`);
  }

  getResponsesCount(formId: string): Observable<string> {
    return this.http.get<string>(`${this.API_BASE_URL}/api/responses/count/${formId}`);
  }

  deactivateForm(formId: string): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/api/forms/${formId}/status`, { status: 'inactive' });
  }

  getResponses(formId: string): Observable<Response[]> {
    return this.http.get<Response[]>(`${this.API_BASE_URL}/api/responses/${formId}`);
  }

  updateResponseStatus(responseId: string, newStatus: string): Observable<any> {
    return this.http.patch(`${this.API_BASE_URL}/api/responses/${responseId}`, { status: newStatus });
  }
  getResponseDetails(responseId: string): Observable<Response> {
    return this.http.get<Response>(`${this.API_BASE_URL}/api/responses/details/${responseId}`);
  }
}
