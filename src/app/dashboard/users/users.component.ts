import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { slider } from '../../core/animations/slide';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  animations: [slider],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
 }
}
