import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';  
import { Response } from '../../models/Response.model';
import { CommonModule, Location } from '@angular/common';
import { ResponseApiService } from '../response-api.service';
import { AdminApiService } from '../admin-api.service';
import { Form } from '../../models/Form.model';

@Component({
  selector: 'app-view-responses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-responses.component.html',
  styleUrl: './view-responses.component.css'
})
export class ViewResponsesComponent {
  formId: string = '';  
  responses: Response[] = [];
  totalResponses = 0;
  approvedResponses = 0;
  rejectedResponses = 0;
  formName: string ='';

  constructor(private route: ActivatedRoute, private apiService: ResponseApiService, 
    private location:Location,private formApiService: AdminApiService  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
      this.formId = params.get('formId') as string; 
      this.loadResponses();
    }
  });
  this.formApiService.getForms(this.formId).subscribe({
    next: (data: Form) => {
      this.formName = data.name;
    }
  });
  }
  
  loadResponses(): void {
    if (!this.formId) {
      console.error('Form ID is missing');
      return;
    }

    this.apiService.getResponses(this.formId).subscribe({
      next: (data: Response[]) => {
        this.responses = data;
        this.totalResponses = data.length;
        this.approvedResponses = data.filter(resp => resp.status === 'Approved').length;
        this.rejectedResponses = data.filter(resp => resp.status === 'Rejected').length;
      },
      error: () => console.error('Error fetching responses')
  });
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
