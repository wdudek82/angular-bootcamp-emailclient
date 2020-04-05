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
  signedin$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(
      `${this.baseUrl}/username`,
      { username },
      { withCredentials: true },
    );
  }

  signup(credentials: SignupCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/signup`, credentials)
      .pipe(tap(() => this.signedin$.next(true)));
  }

  signin(signInData: SigninCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/signin`, signInData)
      .pipe(tap(() => this.signedin$.next(true)));
  }

  checkAuth(): Observable<SignedinResponse> {
    return this.http.get<SignedinResponse>(`${this.baseUrl}/signedin`).pipe(
      tap((res) => {
        if (res.authenticated) {
          this.signedin$.next(true);
        }
      }),
    );
  }

  signout() {
    return this.http
      .post<{}>(`${this.baseUrl}/signout`, {})
      .pipe(tap(() => this.signedin$.next(false)));
  }
}
