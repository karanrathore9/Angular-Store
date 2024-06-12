import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../services/localStorage.service';
import { AuthService } from '../services/auth.service';

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
  providers: [HttpClientModule, AuthService, LocalstorageService],
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
    console.log('Clicked !!');
    return;
    // this.isSubmitted = true;

    // if (this.loginFormGroup.invalid) return;

    // this.auth
    //   .login(this.loginForm['email'].value, this.loginForm['password'].value)
    //   .subscribe(
    //     (user:any) => {
    //       this.authError = false;
    //       this.localstorageService.setToken(user.token);
    //       this.router.navigate(['/']);
    //     },
    //     (error: HttpErrorResponse) => {
    //       this.authError = true;
    //       if (error.status !== 400) {
    //         this.authMessage = 'Error in the Server, please try again later!';
    //       }
    //     }
    //   );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}