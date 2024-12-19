import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
import { CustomerService } from '../../../../core/services/customer.service';
import { BreadcrumbService } from '../../../../ui-components/breadcrumb/breadcrumb.service';
import { MatTabsModule } from '@angular/material/tabs';
import { NoDataFoundComponent } from '../../../../ui-components/no-data-found/no-data-found.component';
import { CustomerStatus } from '../../../../core/helpers/enums';
import { PopoverDirective } from '../../../../core/directive/popover.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { exportToCSV } from '../../../../core/helpers/export.helper';
import { OtpInputComponent } from '../../../../ui-components/otp-input/otp-input.component';
import { TableFilterComponent } from "../../../../ui-components/table-filter/table-filter.component";
import { ResponsiveDrawerComponent } from "../../../../ui-components/responsive-drawer/responsive-drawer.component";

@Component({
  selector: 'app-clinics',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatDialogModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatPrefix,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinner,
    DatePipe,
    MatTooltip,
    MatCheckbox,
    MatTabsModule,
    NoDataFoundComponent,
    TitleCasePipe,
    PopoverDirective,
    MatSelectModule,
    MatChipsModule,
    OtpInputComponent,
    TableFilterComponent,
    ResponsiveDrawerComponent
],
  templateUrl: './clinics.component.html',
  styleUrl: './clinics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private readonly customerService = inject(CustomerService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  table = viewChild.required(MatTable);
  paginator = viewChild.required(MatPaginator);
  isSavingRecord: WritableSignal<boolean> = signal(false);
  searchText = new FormControl('');

  displayedColumns: string[] = [
    'clinic',
    'owner',
    'status',
    'customer',
    'subscription',
    'billing',
    'contact info',
    'created on',
    'star',
  ];
  data: WritableSignal<any[]> = signal([]);

  resultsLength: WritableSignal<number> = signal(0);
  isLoadingResults: WritableSignal<boolean> = signal(false);
  isRateLimitReached: WritableSignal<boolean> = signal(false);

  dialogRef: any;
  CustomerStatus: any = CustomerStatus;
  filters = [
    {
      type: 'checkbox',
      title: 'Customer status',
      options: [
        {title: 'Any', value:''},
        {title: 'Pending', value:''},
        {title: 'Active', value:''},
        {title: 'Inactive', value:''},
        {title: 'Deleted', value:''}
      ]
    },
    {
      type: 'checkbox',
      title: 'CSI Sense',
      options: [
        {title: 'Any', value:''},
        {title: 'Needs attention', value:''},
        {title: 'Normal', value:''},
      ]
    },
    {
      type: 'dropdown',
      title: 'Created on',
      options: [
      { title: 'Any', value: ''},
      { title: 'today', value: ''},
      { title: 'last 7 days', value: ''},
      { title: 'last 30 days', value: ''},
      { title: 'last 3 months', value: ''},
      { title: 'last 6 months', value: ''},
      { title: 'last year', value: ''},
      { title: 'older than a year', value: ''},
      ]
    },
    {
      type: 'chips',
      title: 'Billing',
      options: [
        {title: 'Any', value:''},
        {title: 'Free', value:''},
        {title: 'Paid', value:''},
      ]
    }
  ]

  ngAfterViewInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId'])
        this.breadcrumbService.addBreadcrumb({ label: 'James' });
    });

    if (this.paginator() && this.table()) {
      this.searchText.valueChanges.pipe(debounceTime(400)).subscribe((val) => {
        this.paginator().pageIndex = 0;
        this.getcustomers(val as string);
      });
      this.getcustomers();
    }
  }

  getcustomers(search = '') {
    this.data.set(this.customerService.clinicData);
    this.resultsLength.set(this.customerService.clinicData.length)
  }

  onPageChange(event: any) {
    this.getcustomers();
  }

  // onPageChange(page: number) {
  //   this.page = page;
  // }

  openDialog(templateRef: TemplateRef<any>, data: any = '') {
    this.dialogRef = this.dialog.open(templateRef, { data: data });

    this.dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  deleteRecord(data: any) {
    this.isSavingRecord.set(true);
    this.customerService.deleteCustomer(data).subscribe({
      next: () => {
        this.isSavingRecord.set(false);
        this.paginator().pageIndex = 0;
        this.getcustomers();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isSavingRecord.set(false);
        console.log(err);
      },
    });
  }

  goToClinicDetails(id: number) {
    this.router.navigate([`/CRM/clinics/${id}`]);
  }

  download() {
    exportToCSV(this.data());
  }

  changeStatu(id: number) {
    this.data.update((users: any[]) => {
      const index = users.findIndex((user: any) => user.id === id);
      if (index > -1) users[index].activate = !users[index].activate;
      return users;
    });
    this.dialogRef.close();
    this.table().renderRows();
  }

  openWebsite(url: string): void {
    window.open(url, '_blank');
  }
}
