import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from './email';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

export interface EmailStatus {
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  baseUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  getEmails(): Observable<EmailSummary[]> {
    return this.http.get<EmailSummary[]>(`${this.baseUrl}/emails`);
  }

  getEmailById(id: string): Observable<Email> {
    return this.http.get<Email>(`${this.baseUrl}/emails/${id}`);
  }

  sentEmail(email: Email): Observable<EmailStatus> {
    return this.http.post<EmailStatus>(`${this.baseUrl}/emails`, email);
  }
}
