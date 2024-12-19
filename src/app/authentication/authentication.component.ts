import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [
   RouterOutlet
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  router = inject(Router);
  path = this.router.url.split('/')[this.router.url.split('/').length - 1];

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
      this.path = this.router.url.split('/')[this.router.url.split('/').length - 1];
    })
  }
}
