import { TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './no-data-found.component.html',
  styleUrl: './no-data-found.component.scss'
})
export class NoDataFoundComponent {
  title = input('');
}
