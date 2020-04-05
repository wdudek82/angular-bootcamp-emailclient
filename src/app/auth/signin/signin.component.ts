import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.signin(this.authForm.value).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (errorObj) => {
        console.log(errorObj);

        const { error } = errorObj;

        this.authForm.setErrors({
          ...error,
          // invalidPassword: !!error.password,
          // emailNotFound: !!error.username,
          // unknownError: !!error,
        });
      },
    );
  }
}
