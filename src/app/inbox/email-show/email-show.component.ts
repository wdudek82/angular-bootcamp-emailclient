import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email: Email;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getEmail();
  }

  getEmail() {
    this.route.data.subscribe(({ email }: { email: Email }) => {
      this.email = email;
    });
  }
}
