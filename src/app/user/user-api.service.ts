import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/Form.model';
import { environment } from '../../environments/environment.development';
import { Response } from '../models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.API_BASE_URL}/api/forms`);
  }

  getFormDetails(formId: string | null): Observable<Form> {
    return this.http.get<Form>(`${this.API_BASE_URL}/api/forms/${formId}`);
  }

  submitResponses(response: any): Observable<Response> {
    return this.http.post<Response>(`${this.API_BASE_URL}/api/responses`, response);
  }
}