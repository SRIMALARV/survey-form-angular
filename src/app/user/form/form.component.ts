import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../user-api.service'; 
import { Form } from '../../models/Form.model';
import { CommonModule, Location } from '@angular/common';

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
  isLoading = true;  // Loading state

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userApiService: UserApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    if (formId) {
      this.userApiService.getFormDetails(formId).subscribe(
        (data) => {
          console.log("Fetched Form Details:", data);  // Debug API response
          this.formDetails = data;
          this.isLoading = false;
          this.initializeForm();
        },
        (error) => {
          console.error("Error fetching form details:", error);
          this.isLoading = false;
        }
      );
    }
  }

  initializeForm() {
    this.dynamicForm = this.fb.group({
      responses: this.fb.array(this.formDetails.questions.map(q => this.createFormControl(q)))
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

  submitForm() {
    console.log("Form Submitted:", this.dynamicForm.value);
  }

  isInvalid(index: number, errorType: string): boolean {
    const control = this.dynamicForm.get(`responses.${index}`);
    return !!(control && control.hasError(errorType) && control.touched);
  }
  

  goBack() {
    this.location.back();
  }
}
