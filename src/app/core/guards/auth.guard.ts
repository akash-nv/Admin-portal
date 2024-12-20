import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { getCurrentUser } from 'aws-amplify/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return new Observable((observer) => {
    getCurrentUser()
      .then(({ username, userId, signInDetails }) => {
        console.log(userId)
        if (userId) {
          observer.next(true); // Emit the response from signIn
          observer.complete();
        } else {
          router.navigate(['auth']);
          observer.next(false); // Emit the response from signIn
          observer.complete();
        }
      })
      .catch(() => {
        router.navigate(['auth']);
        observer.next(false); // Emit the response from signIn
        observer.complete();
      });
  });
};
