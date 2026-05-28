
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerEmployee(employeeData: any): Observable<any> {
    return this.http.post('http://localhost:5500/employee/register', employeeData);
  }

  loginEmployee(userName: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5500/employee/login', { userName, password });
  }
}

