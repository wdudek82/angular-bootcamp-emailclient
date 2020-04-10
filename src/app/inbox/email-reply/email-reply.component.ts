import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnInit {
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      text: this.transformText(this.email.text),
    };
  }

  transformText(text: string): string {
    const parsedText: string[] = text.split('\n');
    parsedText.forEach((line, ind) => {
      parsedText[ind] = `> ${line}`;
    });

    return parsedText.join('\n');
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
