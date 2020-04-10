import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Output() sendEmail = new EventEmitter<Email>();
  @Input() email: Email;
  emailForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const { to, from, subject, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.emailForm.invalid) {
      return;
    }

    this.sendEmail.next(this.emailForm.value);
  }
}
