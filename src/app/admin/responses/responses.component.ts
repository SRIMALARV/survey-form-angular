import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../../models/Response.model';  // Import the model
import Swal from 'sweetalert2';
import { AdminApiService } from '../admin-api.service';
import { CommonModule, Location, NgIf } from '@angular/common';
import { ResponseApiService } from '../response-api.service';

@Component({
  selector: 'app-responses',
  standalone: true,
  imports:[ CommonModule],
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {
  responseId: string | null = null;
  responseData: Response | null = null; 

  constructor(
    private route: ActivatedRoute, private apiService: ResponseApiService,
    private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.responseId = this.route.snapshot.paramMap.get('id');

    if (this.responseId) {
      this.loadResponseDetails(this.responseId);
    } else {
      this.showError();
    }
  }

  loadResponseDetails(responseId: string) {
    this.apiService.getResponseDetails(responseId).subscribe({
      next: (data: Response) => {
        this.responseData = data;
      },
      error: () => this.showError()
    });
  }

  getFormattedAnswer(answer: string | number | string[] | null): string {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer !== null ? answer.toString() : 'N/A';
  }  

  isArray(value: any): value is string[] {
    return Array.isArray(value);
  }
  

  showError() {
    Swal.fire({
      title: 'Failed!',
      text: 'Error fetching response details!',
      icon: 'error',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/form']);
    });
  }

  goBack() {
    this.location.back();
  }
}
