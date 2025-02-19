import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/Response.model';
import { environment } from '../../environments/environment.development'; 

@Injectable({
  providedIn: 'root'
})
export class ResponseApiService {
  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getResponsesCount(formId: string): Observable<string> {
    return this.http.get<string>(`${this.API_BASE_URL}/api/responses/count/${formId}`);
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
