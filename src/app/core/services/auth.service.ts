import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  signin(data: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.api_url}auth/login`, {username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 1440,}).pipe(map((res) => {
      localStorage.setItem('access_token', res.accessToken);
      localStorage.setItem('refresh_token', res.refreshToken)
    }))
  }

  getAuthToken(): string {
    return localStorage.getItem('access_token') as string;
  }
}
