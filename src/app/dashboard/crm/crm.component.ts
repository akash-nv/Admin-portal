import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../../core/animations/slide';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  animations: [slider],
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.scss'
})
export class CrmComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
 }
}
