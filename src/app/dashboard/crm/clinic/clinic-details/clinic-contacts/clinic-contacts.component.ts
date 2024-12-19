import { AfterViewInit, Component, inject, signal, TemplateRef, viewChild, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NoDataFoundComponent } from '../../../../../ui-components/no-data-found/no-data-found.component';
import { DatePipe } from '@angular/common';
import { debounceTime, map } from 'rxjs';
import { CustomerService } from '../../../../../core/services/customer.service';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-clinic-contacts',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatMenuModule,
    MatIcon,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    NoDataFoundComponent,
    DatePipe,
    MatTableModule,
    MatPrefix,
    MatInput,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './clinic-contacts.component.html',
  styleUrl: './clinic-contacts.component.scss',
})
export class ClinicContactsComponent implements AfterViewInit {
  private readonly customerService = inject(CustomerService);
  private readonly dialog = inject(MatDialog);
  table = viewChild.required(MatTable);
  searchText = new FormControl('');
  dialogRef: any;

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'created on', 'star'];
  data: WritableSignal<any[]> = signal([]);
  recordForm: FormGroup = new FormGroup<any>({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    age: new FormControl('', [Validators.required, Validators.min(18)]),
    company: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  resultsLength: WritableSignal<number> = signal(0);
  isLoadingResults: WritableSignal<boolean> = signal(true);
  isRateLimitReached: WritableSignal<boolean> = signal(false);
  isSavingRecord: WritableSignal<boolean> = signal(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.searchText.valueChanges.pipe(debounceTime(400)).subscribe((val) => {
      this.paginator.pageIndex = 0;
      this.getcustomers(val as string);
    });
    this.getcustomers();
  }

  getcustomers(search = '') {
    this.isLoadingResults.set(true);
    this.customerService
      .getCustomers(30, 30 * this.paginator.pageIndex, search)
      .pipe(
        map((data) => {
          this.isLoadingResults.set(false);
          this.isRateLimitReached.set(data === null);

          if (data === null) {
            return [];
          }
          this.resultsLength = data.total;
          return data.users;
        })
      )
      .subscribe((data) => {
        this.data.set(data);
      });
  }

  onPageChange(event: any) {
    this.getcustomers();
  }

  openDialog(templateRef: TemplateRef<any>, data: any = '') {
    this.dialogRef = this.dialog.open(templateRef, {data: data});

    this.dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
