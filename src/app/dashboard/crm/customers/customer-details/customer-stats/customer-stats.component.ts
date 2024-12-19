import { Component, computed, inject, input, Signal, signal, WritableSignal } from '@angular/core';
import { CustomerStatus } from '../../../../../core/helpers/enums';
import { MatIcon } from '@angular/material/icon';
import { MatricsComponent } from '../../../../reports/matrics/matrics.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { map, Observable, startWith } from 'rxjs';
import { ResponsiveDrawerComponent } from "../../../../../ui-components/responsive-drawer/responsive-drawer.component";
import { ThemeService } from '../../../../../core/services/theme.service';

@Component({
  selector: 'app-customer-stats',
  standalone: true,
  imports: [
    MatIcon,
    MatricsComponent,
    MatMenuModule,
    MatSlideToggle,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatButtonModule,
    NgClass,
    ResponsiveDrawerComponent
],
  templateUrl: './customer-stats.component.html',
  styleUrl: './customer-stats.component.scss'
})
export class CustomerStatsComponent {
  themeService = inject(ThemeService)
  customerData = input<any>({});
  CustomerStatus: any = CustomerStatus;
  myControl = new FormControl('');
  options: string[] = ['Clinics', 'Paid clinics usage', 'Paid clinics user activity', 'Subscriptions', 'Support tickets', 'Invoices'];
  filteredOptions!: Observable<string[]>;
  theme: Signal<string> = computed(() => this.themeService.currentTheme());

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  clinicMatrix = [
    {
      title: 'Paid Clinics',
      value: 10
    },
    {
      title: 'Unpaid Clinics',
      value: 5
    },
    {
      title: 'Total Clinics',
      value: 15
    }
  ]

  ticketMatrix = [
    {
      title: 'Open',
      value: 10,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 280q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
    },
    {
      title: 'Pending',
      value: 5,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
    },
    {
      title: 'Closed',
      value: 15,
      icon: `<svg height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>`
    }
  ]

  invoiceMatrix = [
    {
      title: 'Overdue',
      value: 10
    },
    {
      title: 'Due',
      value: 5
    },
    {
      title: 'Paid',
      value: 15
    }
  ]

  paidClinicUserActivity = [
    {
      title: 'This month',
      tags: [
        {
          title: 'Need attention',
          value: 5
        },
        {
          title: 'Normal',
          value: 3
        },
      ]
    },
    {
      title: 'Last month',
      tags: [
        {
          title: 'Need attention',
          value: 6
        },
        {
          title: 'Normal',
          value: 4
        },
      ]
    }
  ]

}
