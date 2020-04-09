import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface AuthResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials extends SigninCredentials {
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://api.angular-email.com/auth';
  signedin$ = new BehaviorSubject<boolean>(null);
  username: string;

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(
      `${this.baseUrl}/username`,
      { username },
    );
  }

  signup(credentials: SignupCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/signup`, credentials)
      .pipe(
        tap((res) => {
          this.signedin$.next(true);
          this.username = res.username;
        }),
      );
  }

  signin(signInData: SigninCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/signin`, signInData)
      .pipe(
        tap((res) => {
          this.signedin$.next(true);
          this.username = res.username;
        }),
      );
  }

  checkAuth(): Observable<SignedinResponse> {
    return this.http.get<SignedinResponse>(`${this.baseUrl}/signedin`).pipe(
      tap((res) => {
        this.signedin$.next(res.authenticated);
        this.username = res.username;
      }),
    );
  }

  signout(): Observable<{}> {
    return this.http
      .post<{}>(`${this.baseUrl}/signout`, {})
      .pipe(tap(() => this.signedin$.next(false)));
  }
}
