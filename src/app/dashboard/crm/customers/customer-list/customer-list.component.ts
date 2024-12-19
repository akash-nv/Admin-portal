import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
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
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { CustomerService } from '../../../../core/services/customer.service';
import { OtpInputComponent } from '../../../../ui-components/otp-input/otp-input.component';
import { NoDataFoundComponent } from '../../../../ui-components/no-data-found/no-data-found.component';
import { exportToCSV } from '../../../../core/helpers/export.helper';
import { CustomerStatus } from '../../../../core/helpers/enums';
import { PopoverDirective } from '../../../../core/directive/popover.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { fadeInOut } from '../../../../core/animations/fadeinout';
import { TableFilterComponent } from "../../../../ui-components/table-filter/table-filter.component";
import { ResponsiveDrawerComponent } from "../../../../ui-components/responsive-drawer/responsive-drawer.component";

@Component({
  selector: 'app-customer-list',
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
    OtpInputComponent,
    NoDataFoundComponent,
    TitleCasePipe,
    PopoverDirective,
    MatSelectModule,
    MatChipsModule,
    TableFilterComponent,
    ResponsiveDrawerComponent
],
  animations: [fadeInOut],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly customerService = inject(CustomerService);

  table = viewChild.required(MatTable);
  isSavingRecord: WritableSignal<boolean> = signal(false);
  recordForm: FormGroup = new FormGroup<any>({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    company: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  searchText = new FormControl('');

  displayedColumns: string[] = [
    'Main doctor',
    'status',
    'contact info',
    'paid clinics',
    'unpaid clinics',
    'created on',
    'star',
  ];
  data: WritableSignal<any[]> = signal([]);

  resultsLength: WritableSignal<number> = signal(0);
  isLoadingResults: WritableSignal<boolean> = signal(false);
  isRateLimitReached: WritableSignal<boolean> = signal(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
      title: 'Unpaid clinics',
      options: [
        { title: 'Any', value: ''},
        { title: 'At least 1', value: ''},
        { title: '1 - 5', value: ''},
        { title: '6 - 10', value: ''},
        { title: '11 - 15', value: ''},
        { title: '16 - 20', value: ''},
        { title: 'more than 20', value: ''},
      ]
    },
    {
      type: 'chips',
      title: 'Paid clinics',
      options: [
        { title: 'Any', value: ''},
        { title: 'At least 1', value: ''},
        { title: '1 - 5', value: ''},
        { title: '6 - 10', value: ''},
        { title: '11 - 15', value: ''},
        { title: '16 - 20', value: ''},
        { title: 'more than 20', value: ''},
      ]
    }
  ]

  ngAfterViewInit() {
    this.searchText.valueChanges.pipe(debounceTime(400)).subscribe((val) => {
      this.paginator.pageIndex = 0;
      this.getcustomers(val as string);
    });
    this.getcustomers();
  }

  getcustomers(search = '') {
    this.data.set(this.customerService.data);
  }

  onPageChange(event: any) {
    this.getcustomers();
  }

  // onPageChange(page: number) {
  //   this.page = page;
  // }

  goToClinics(id: string) {
    this.router.navigate([`/CRM/customers/${id}`]);
  }

  openDialog(templateRef: TemplateRef<any>, data: any = '') {
    this.dialogRef = this.dialog.open(templateRef, { data: data });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.recordForm.reset();
    });
  }

  editRecord(data: any, templateRef: TemplateRef<any>) {
    this.recordForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      company: data.company.name,
      email: data.email,
    });
    this.openDialog(templateRef, data);
  }

  onSubmit(id: string) {
    if (this.recordForm.valid) {
      if (!id) {
        this.createRecord();
      } else {
        this.updateRecord(id);
      }
    }
  }

  createRecord() {
    const data = {
      firstName: this.recordForm.value.firstName,
      lastName: this.recordForm.value.lastName,
      age: this.recordForm.value.age,
      company: { name: this.recordForm.value.company },
      email: this.recordForm.value.email,
    };
    this.isSavingRecord.set(true);
    this.customerService.addCustomer(data).subscribe({
      next: () => {
        this.isSavingRecord.set(false);
        this.paginator.pageIndex = 0;
        this.getcustomers();
        this.recordForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isSavingRecord.set(false);
        console.log(err);
      },
    });
  }

  updateRecord(id: string) {
    const data = {
      firstName: this.recordForm.value.firstName,
      lastName: this.recordForm.value.lastName,
      age: this.recordForm.value.age,
      company: { name: this.recordForm.value.company },
      email: this.recordForm.value.email,
    };
    this.isSavingRecord.set(true);
    this.customerService.updateCustomer(data, id).subscribe({
      next: (res) => {
        this.isSavingRecord.set(false);
        this.data.update((customers) => {
          const index = customers.findIndex((customer) => customer.id === id);
          customers[index] = res;
          return customers;
        });
        this.table().renderRows();
        this.recordForm.reset();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isSavingRecord.set(false);
        console.log(err);
      },
    });
  }

  deleteRecord(data: any) {
    this.isSavingRecord.set(true);
    this.customerService.deleteCustomer(data).subscribe({
      next: () => {
        this.isSavingRecord.set(false);
        this.paginator.pageIndex = 0;
        this.getcustomers();
        this.dialogRef.close();
      },
      error: (err) => {
        this.isSavingRecord.set(false);
        console.log(err);
      },
    });
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

  download() {
    exportToCSV(this.data());
  }

  openWebsite(url: string): void {
    window.open(url, '_blank');
  }
}
