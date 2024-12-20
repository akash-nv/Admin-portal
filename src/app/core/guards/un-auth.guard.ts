import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { getCurrentUser } from 'aws-amplify/auth';
import { Observable } from 'rxjs';

export const unAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return new Observable((observer) => {
    getCurrentUser()
      .then(({ username, userId, signInDetails }) => {
        console.log(userId);
        if (userId) {
          router.navigate(['']);
          observer.next(false); // Emit the response from signIn
          observer.complete();
        } else {
          observer.next(true); // Emit the response from signIn
          observer.complete();
        }
      })
      .catch(() => {
        observer.next(true); // Emit the response from signIn
        observer.complete();
      });
  });
};
