import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // isSignedin = false;
  signedin$: BehaviorSubject<boolean>;

  constructor(private router: Router, private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit(): void {
    // this.authService.signedin$.subscribe(
    //   (isSignedIn) => (this.isSignedin = isSignedIn),
    // );
  }

  onSignOut() {
    this.authService.signout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
