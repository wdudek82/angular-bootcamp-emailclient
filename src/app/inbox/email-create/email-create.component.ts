import { Component, OnInit } from '@angular/core';
import { Email } from '../email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;

  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  ngOnInit(): void {
    const { username } = this.authService;
    this.email = {
      id: '',
      from: `${username}@angular-email.com`,
      to: '',
      subject: '',
      text: '',
      html: '',
    };
  }

  sendEmail({ to, subject, text }: Email) {
    this.emailService
      .sentEmail({
        to,
        subject,
        text,
      })
      .subscribe((res) => {
        this.showModal = false;
      });
  }
}
