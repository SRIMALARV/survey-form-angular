import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development'; 
import { Form } from '../models/Form.model';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getFormsPaginated(page: number, size: number): Observable<any> {
    console.log('API_BASE_URL:', this.API_BASE_URL);
    return this.http.get<any>(`${this.API_BASE_URL}/api/forms/paginated?page=${page}&size=${size}`);
  }

  deactivateForm(formId: string): Observable<any> {
    return this.http.put(`${this.API_BASE_URL}/api/forms/${formId}/status`, { status: 'inactive' });
  }

  getForms(formId: string): Observable<Form> {
    return this.http.get<Form>(`${this.API_BASE_URL}/api/forms/${formId}`);
  }

  submitForm(formData:Form): Observable<Form> {
    return this.http.post<Form>(`${this.API_BASE_URL}/api/forms`, formData);
  }

}
