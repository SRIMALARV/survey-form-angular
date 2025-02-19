import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form } from '../../models/Form.model'; 
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formId: string | null = null;
  formData: Form | null = null;

  constructor(private route: ActivatedRoute, private apiService: UserApiService) { }

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    this.getFormData(this.formId);
    this.formId = this.formId || null;
  }

  getFormData(formId: string | null) {
    this.apiService.getFormDetails(formId).subscribe({
      next: (data: Form) => {
        this.formData = data;
      },
      error: ()=> { console.log("Error occured while loading form"); }
    });
  }
}
