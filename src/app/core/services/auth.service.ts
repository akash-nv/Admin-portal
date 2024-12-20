import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { signIn, signOut } from 'aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  login(data: {email: string, password: string}): Observable<any> {
    console.log("asdsadasdassa")
    return new Observable((observer) => {
    console.log("seesdfsdf")
      signIn({
        username: "akashdesai@medianv.com",
        password: "Admin@123",
      })
        .then((response) => {
          console.log(response);
          observer.next(response); // Emit the response from signIn
          observer.complete();     // Complete the Observable
        })
        .catch((error) => {
          observer.error(error);   // Emit the error
          observer.complete();     // Complete the Observable
        });
    });
  }

  getAuthToken(): string {
    return localStorage.getItem('access_token') as string;
  }
}
