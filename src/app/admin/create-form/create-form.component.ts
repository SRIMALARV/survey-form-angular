import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminApiService } from '../admin-api.service';
import { Form } from '../../models/Form.model';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
  formBuilderForm: FormGroup;
  selectedIndex: number = 0;
  showProperties: boolean = false;

  constructor(private fb: FormBuilder, private apiservice: AdminApiService) {
    this.formBuilderForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      questions: this.fb.array([]),
    });
  }

  get questions(): FormArray {
    return this.formBuilderForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ['', Validators.required],
      questionType: ['', Validators.required],
      validations: this.fb.group({
        required: [false], minLength: [''], maxLength: [''], minValue: [''],
        maxValue: [''], options: this.fb.array([]), allowedFormats: [''], maxSize: ['']
      })
    });
    this.questions.push(questionForm);
  }

  addValidation(index: number) {
   this.selectedIndex = index;
   this.showProperties = true;
  }
  
  getValidationControl(questionIndex: number, controlName: string): FormControl {
    return this.questions.at(questionIndex)?.get(`validations.${controlName}`) as FormControl;
  }  

  getOptionsArray(questionIndex: number): FormArray {
    return this.questions.at(questionIndex)?.get('validations.options') as FormArray;
  }

  addOption(questionIndex: number) {
    const optionsArray = this.getOptionsArray(questionIndex);
    optionsArray.push(this.fb.control(''));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const optionsArray = this.getOptionsArray(questionIndex);
    optionsArray.removeAt(optionIndex);
  }
  
  removeQuestion(index: number) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to deleete this question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questions.removeAt(index);
      }
    });
  }

  submitForm() {
    if (this.formBuilderForm.invalid) {
      Swal.fire('Error!', 'Please fill in all required fields!', 'error');
      return;
    }
  
    const formData: Form = {
      name: this.formBuilderForm.value.formName,
      status: 'active', 
      questions: this.formBuilderForm.value.questions.map((q: any) => ({
        questionText: q.questionText,
        type: q.questionType,
        validations: {
          required: q.validations?.required || false,
          minLength: q.validations?.minLength ? Number(q.validations.minLength) : undefined,
          maxLength: q.validations?.maxLength ? Number(q.validations.maxLength) : undefined,
          minValue: q.validations?.minValue ? Number(q.validations.minValue) : undefined,
          maxValue: q.validations?.maxValue ? Number(q.validations.maxValue) : undefined,
          options: q.validations?.options ? q.validations.options.filter((opt: string) => opt.trim() !== '') : [],
          allowedFormats: q.validations?.allowedFormats ? q.validations.allowedFormats : [],
        }
      })),
    };
  
    this.apiservice.submitForm(formData).subscribe({
      next: (response) => {
        Swal.fire('Success!', 'Form submitted successfully!', 'success');
        this.formBuilderForm.reset();
      },
      error: (error) => {
        Swal.fire('Error!', 'Failed to submit form.', 'error');
        console.error('Error submitting form:', error);
      },
    });
  }
  
}
