import {
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PasswordValidator {
  passwordsMatch(
    passwordA: string,
    passwordB: string,
  ): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const controlA = control.get(passwordA).value;
      const controlB = control.get(passwordB).value;

      if (controlA !== controlB) {
        return { passwordMatch: true };
      }
      return null;
    };
  }
}
