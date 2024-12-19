import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../../../core/animations/slide';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  animations: [slider],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
 }
}