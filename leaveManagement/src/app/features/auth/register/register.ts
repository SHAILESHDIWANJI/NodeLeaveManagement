import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/authService';
import { SHARED_IMPORTS } from '../../../../core/shared/sharedModule';
@Component({
  selector: 'app-register',
  imports: [SHARED_IMPORTS],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register implements OnInit {
  registerForm: FormGroup | any;
  duplicateEmailError: boolean = false; 

  constructor(private http: HttpClient, private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
     this.initializeForm();  
  }
  initializeForm() {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      department: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerEmployee() {
    if (this.registerForm.valid) {
      const employeeData = this.registerForm.value;
      this.authService.registerEmployee(employeeData).subscribe(
        {
          next: (response) => {
            console.log('Employee registered successfully', response);
            this.registerForm.reset();
          },
          error: (error) => {
            if (error?.error?.message && error.error.message.includes('duplicate key error') && error.error.message.includes('email')) {
              this.duplicateEmailError = true;
              console.error('Email already registered.');
            } else {
              console.error('Error registering employee:', error);
            }
          }
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
