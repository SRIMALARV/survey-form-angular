import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '../models/Form.model'; 
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
   private API_BASE_URL = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  getForms(): Observable<Form[]>{
    return this.http.get<Form[]>(`${this.API_BASE_URL}/api/forms`);
}
}