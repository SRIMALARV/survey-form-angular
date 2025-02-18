import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminApiService } from '../admin-api.service';
import Swal from 'sweetalert2';  
import { Response } from '../../models/Response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-responses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-responses.component.html',
  styleUrl: './view-responses.component.css'
})
export class ViewResponsesComponent {
  formId: string = '';  
  responses: Response[] = [];
  totalResponses = 0;
  approvedResponses = 0;
  rejectedResponses = 0;

  constructor(private route: ActivatedRoute, private apiService: AdminApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formId = params.get('formId') as string; 
      if (this.formId) {
        this.loadResponses();
      } else {
        console.error('Form ID is missing in the route.');
      }
    });
  }

  loadResponses(): void {
    if (!this.formId) {
      console.error('Form ID is missing');
      return;
    }

    this.apiService.getResponses(this.formId).subscribe(
      (data: Response[]) => {
        this.responses = data;
        this.totalResponses = data.length;
        this.approvedResponses = data.filter(r => r.status === 'Approved').length;
        this.rejectedResponses = data.filter(r => r.status === 'Rejected').length;
      },
      (error) => console.error('Error fetching responses:', error)
    );
  }

  updateStatus(responseId: string, newStatus: string): void {
    Swal.fire({
      title: `Are you sure you want to ${newStatus.toLowerCase()} this response?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.updateResponseStatus(responseId, newStatus).subscribe(() => {
          this.responses = this.responses.map(response =>
            response.id === responseId ? { ...response, status: newStatus } : response
          );

          this.approvedResponses = this.responses.filter(r => r.status === 'Approved').length;
          this.rejectedResponses = this.responses.filter(r => r.status === 'Rejected').length;

          Swal.fire('Updated!', `Response has been ${newStatus.toLowerCase()}.`, 'success');
        });
      }
    });
  }
}
