import { Component, input } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SafeHtmlPipe } from '../../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-matrics',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatTooltip, SafeHtmlPipe],
  templateUrl: './matrics.component.html',
  styleUrl: './matrics.component.scss'
})
export class MatricsComponent {
  data = input<any>()
}
