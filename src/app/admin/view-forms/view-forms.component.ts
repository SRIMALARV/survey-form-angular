import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';  
import { AdminApiService } from '../admin-api.service';
import { Router, RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-view-forms',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css']
})
export class ViewFormsComponent {
  forms: any[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  errorMessage: string = '';

  constructor(private apiService: AdminApiService, private router: Router) {}

  ngOnInit() {
    this.fetchForms();
  }

  fetchForms() {
    this.apiService.getFormsPaginated(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.forms = data.content;
        this.totalPages = data.totalPages;

        this.forms.forEach((form) => {
          this.apiService.getResponsesCount(form.id).subscribe(
            (count) => {
              form.responseCount = count; 
            },
            (error) => {
              form.responseCount = 0; 
            }
          );
        });
      },
      (error) => {
        this.errorMessage = 'Failed to load forms.';
      }
    );
  }

  fetchResponsesCount(formId: string) {
    return this.apiService.getResponsesCount(formId);
  }

  onViewResponses(formId: string): void {
    this.router.navigate(['view-responses', formId]);
    console.log("id passed", formId);
  }

  onDelete(formId: string, formName: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to deactivate form: ${formName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, deactivate it!'
    }).then((result: SweetAlertResult) => { 
      if (result.isConfirmed) {
        this.apiService.deactivateForm(formId).subscribe(
          () => {
            this.fetchForms();  
            Swal.fire('Deactivated!', 'The form has been deactivated.', 'success');
          },
          (error) => {
            console.error('Error deactivating form:', error);
            Swal.fire('Error', 'Failed to deactivate the form.', 'error');
          }
        );
      }
    });
  }

  onPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchForms();
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchForms();
    }
  }
}
