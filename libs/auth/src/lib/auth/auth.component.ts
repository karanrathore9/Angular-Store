import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../services/localStorage.service';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';

@Component({
  selector: 'lib-auth',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule, AuthService, LocalstorageService, AuthGuard],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup({});
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
        (user: any) => {
          if (user.success === true) {
            this.authError = false;
            this.localstorageService.setToken(user.data.token);
            this.router.navigate(['/']);
          } else if (user.success === false) {
            this.authError = true;
            this.authMessage = user.error;
          }
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the Server, please try again later!';
          }
        }
      );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
