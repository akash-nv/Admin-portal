import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss'
})
export class ComingSoonComponent {
  activatedRoute = inject(ActivatedRoute);
  message = "";

  constructor() {
    this.message = this.activatedRoute.snapshot.data['message'];
  }
}
