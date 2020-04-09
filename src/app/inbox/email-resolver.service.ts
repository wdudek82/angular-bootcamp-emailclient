import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Email } from './email';
import { EMPTY, Observable, of } from 'rxjs';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmailResolverService implements Resolve<Email> {
  constructor(private router: Router, private emailService: EmailService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Email> | Promise<Email> | Email {
    const { id } = route.params;
    return this.emailService.getEmailById(id).pipe(
      catchError(() => {
        this.router.navigate(['not-found']);
        return EMPTY;
      }),
    );
  }
}
