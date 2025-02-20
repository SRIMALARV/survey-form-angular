import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../user-api.service';
import { Form } from '../../models/Form.model';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';  
import { error } from 'console';


@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  dynamicForm!: FormGroup;
  formDetails!: Form;
  formId: string | null= '';

  constructor(
    private fb: FormBuilder, private route: ActivatedRoute,
    private userApiService: UserApiService, private location: Location) { }

  ngOnInit(): void {
    this.formId = this.route.snapshot.paramMap.get('id');
    if (this.formId) {
      this.userApiService.getFormDetails(this.formId).subscribe({
        next: (data) => {
          this.formDetails = data;
          this.initializeForm();
        },
        error: (error) => { console.error("Error fetching form details:", error); }
      });
    }
  }

  initializeForm() {
    this.dynamicForm = this.fb.group({
      formStruct: this.fb.array(this.formDetails.questions.map(q => this.createFormControl(q)))
    });
  }

  createFormControl(question: any) {
    let validators = [];
    if (question.validations?.required) validators.push(Validators.required);
    if (question.validations?.minLength) validators.push(Validators.minLength(question.validations.minLength));
    if (question.validations?.maxLength) validators.push(Validators.maxLength(question.validations.maxLength));
    if (question.validations?.minValue) validators.push(Validators.min(question.validations.minValue));
    if (question.validations?.maxValue) validators.push(Validators.max(question.validations.maxValue));

    return this.fb.control('', validators);
  }

  isInvalid(index: number, errorType: string): boolean {
    const control = this.dynamicForm.get(`formStruct.${index}`);
    return !!(control && control.hasError(errorType) && control.touched);
  }

  submitForm() {
    const formResponse = {
      formId: this.formId,
      responses: this.formDetails.questions.map((q: any, index: number) => ({
        questionId: q.questionText, 
        answer: this.dynamicForm.value.formStruct[index]
      }))
    };
  
    this.userApiService.submitResponses(formResponse).subscribe({
      next: (response) => {
        Swal.fire("Success!", "Your form has been submitted.", "success");
      },
      error: (error) => {
        Swal.fire("Error!", "Form submission failed.", "error");
      }
    });
  
    console.log("Form Submitted:", formResponse);
  }
  
  goBack() {
    this.location.back();
  }
}
