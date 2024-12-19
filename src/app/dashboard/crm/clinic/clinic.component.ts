import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slider } from '../../../core/animations/slide';

@Component({
  selector: 'app-clinic',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  animations: [slider],
  templateUrl: './clinic.component.html',
  styleUrl: './clinic.component.scss'
})
export class ClinicComponent {
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
 }
}
