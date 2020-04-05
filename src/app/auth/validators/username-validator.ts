import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = this.isUnique.bind(this);

  private isUnique(
    control: FormControl,
  ):
    | Promise<ValidationErrors | null>
    | Observable<ValidationErrors | null>
    | null {
    const username = control.value;

    return this.authService.usernameAvailable(username).pipe(
      map((value) => null),
      catchError((errObj) => {
        if (errObj.error.username) {
          return of({ notUnique: true });
        }
        return of({ noConnection: true });
      }),
    );
  }
}
