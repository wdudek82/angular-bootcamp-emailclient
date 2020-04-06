import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password-validator';
import { UsernameValidator } from '../validators/username-validator';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          // Validators.pattern(/^[\w_.]+@\w+\.\w+$/),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.usernameValidator.validate],
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    [this.passwordValidator.passwordsMatch('password', 'passwordConfirmation')],
  );

  constructor(
    private router: Router,
    private passwordValidator: PasswordValidator,
    private usernameValidator: UsernameValidator,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.authForm);

    this.authService.signup(this.authForm.value).subscribe(
      (response) => {
        this.authForm.reset();

        this.router.navigate(['/', 'inbox']);
      },
      (errorObj) => {
        if (!errorObj.status) {
          this.authForm.setErrors({ noConnection: true });
        } else if (errorObj.error.username) {
          this.authForm.setErrors({ notUnique: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    );
  }
}
