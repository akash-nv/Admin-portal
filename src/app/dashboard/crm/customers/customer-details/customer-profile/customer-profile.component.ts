import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { CustomerStatus } from '../../../../../core/helpers/enums';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { slider } from '../../../../../core/animations/slide';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    MatIcon,
    TitleCasePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatIcon,
    MatPrefix,
    MatInput,
    MatTooltip
  ],
  animations: [slider],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
  customerData = input<any>({});
  CustomerStatus: any = CustomerStatus;
  isEdit = signal(false);
}
