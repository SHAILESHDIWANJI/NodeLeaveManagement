import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/authService';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../../core/shared/sharedModule';

@Component({
  selector: 'app-login',
  imports: [SHARED_IMPORTS],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
 constructor(private authService: AuthService, private fb: FormBuilder) {}
  loginForm: FormGroup | any;
 ngOnInit(): void {
   this.initializeLoginForm();
 }

 initializeLoginForm() {
   this.loginForm = this.fb.group({
     userName: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(6)]],
   });
 }

 login() {
  
      const { userName, password } = this.loginForm.value;
      this.authService.loginEmployee(userName, password).subscribe({
        next: (response) => {
          const data = response.data
          console.log('Login response:', response);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userRole', data.role);
          localStorage.setItem('userName', data.userName);
          localStorage.setItem(
            'userId',
            data._id
          );
          if (data.role === 'Staff') {
            window.location.href = '/staff/' + data._id;
          } else if (data.role === 'HOD') {
            window.location.href = '/hod/' + data._id;
          }
        }
      });
    
  }
}
