import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {
  formBuilderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formBuilderForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      questions: this.fb.array([])
    });
  }

  get questions(): FormArray {
    return this.formBuilderForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ['', Validators.required],
      questionType: ['text', Validators.required],
      validations: this.fb.group({
        required: [false], minLength: [''], maxLength: [''], minValue: [''],
        maxValue: [''], options: [''], allowedFormats: [''], maxSize: ['']
      })
    });
    this.questions.push(questionForm);
  }

  removeQuestion(index: number) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this question?',
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

    const formData = this.formBuilderForm.value;
    console.log('Form Data:', formData);
  }
}
