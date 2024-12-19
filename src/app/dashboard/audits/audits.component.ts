import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule, MatTable } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { NoDataFoundComponent } from '../../ui-components/no-data-found/no-data-found.component';
import { AuditService } from '../../core/services/audit.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { exportToCSV } from '../../core/helpers/export.helper';
import { TableFilterComponent } from "../../ui-components/table-filter/table-filter.component";
import { ResponsiveDrawerComponent } from "../../ui-components/responsive-drawer/responsive-drawer.component";

@Component({
  selector: 'app-audits',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatPrefix,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinner,
    DatePipe,
    NoDataFoundComponent,
    MatChipsModule,
    MatSelectModule,
    TitleCasePipe,
    TableFilterComponent,
    ResponsiveDrawerComponent
],
  templateUrl: './audits.component.html',
  styleUrl: './audits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditsComponent {
  private readonly auditService = inject(AuditService);

  table = viewChild.required(MatTable);
  searchText = new FormControl('');

  displayedColumns: string[] = [
    'User',
    'Contact',
    'Audit date',
    'Action on entity',
    'Details',
  ];
  data: WritableSignal<any[]> = signal([]);

  resultsLength: WritableSignal<number> = signal(0);
  isLoadingResults: WritableSignal<boolean> = signal(false);
  isRateLimitReached: WritableSignal<boolean> = signal(false);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  filters = [
    {
      type: 'checkbox',
      title: 'Role',
      options: [
        {title: 'Any', value:''},
        {title: 'Admin', value:''},
        {title: 'Manager', value:''},
        {title: 'Member', value:''},
      ]
    },
    {
      type: 'checkbox',
      title: 'Department',
      options: [
        { title: 'Any', value: ''},
        { title: 'Development', value: ''},
        { title: 'Sales', value: ''},
        { title: 'Support', value: ''},
        { title: 'Implementation', value: ''},
        { title: 'Management', value: ''},
      ]
    },
    {
      type: 'checkbox',
      title: 'Entity',
      options: [
        { title: 'Any', value: ''},
        { title: 'User', value: ''},
        { title: 'Customer', value: ''},
        { title: 'Clinic', value: ''},
        { title: 'Subscription', value: ''},
        { title: 'Payment', value: ''},
        { title: 'Invoice', value: ''},
        { title: 'Ticket', value: ''},
        { title: 'Lead', value: ''},
      ]
    },
    {
      type: 'dropdown',
      title: 'Created On',
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
  ]

  ngAfterViewInit() {
    this.searchText.valueChanges.pipe(debounceTime(400)).subscribe((val) => {
      this.paginator.pageIndex = 0;
      this.getAudits(val as string);
    });
    this.getAudits();
  }

  getAudits(search = '') {
    this.data.set(this.auditService.data);
  }

  onPageChange(event: any) {
    this.getAudits();
  }

  download() {
    exportToCSV(this.data());
  }
}
