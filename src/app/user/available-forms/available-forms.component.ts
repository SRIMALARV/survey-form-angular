import { Component } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { Form } from '../../models/Form.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-available-forms',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    this.userApiService.getForms().subscribe({
      next: (forms: Form[]) => {
        this.isLoading = false;
        this.forms = forms.filter(form => form.status === 'active');
      },
      error: (error) => {
        this.errorMessage = 'Failed to load forms.';
      }
  });
  }
}
