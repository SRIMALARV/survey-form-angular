import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Form } from '../../models/Form.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available-forms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-forms.component.html',
  styleUrl: './available-forms.component.css'
})
export class AvailableFormsComponent {
 
  forms: Form[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.fetchForms();
  }

  fetchForms(): void {
    this.userApiService.getForms().subscribe(
      (forms: Form[]) => {
        this.isLoading = false;
        // Filter active forms
        this.forms = forms.filter(form => form.status === 'active');
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load forms.';
      }
    );
  }
}
