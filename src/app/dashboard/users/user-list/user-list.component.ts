import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NoDataFoundComponent } from '../../../ui-components/no-data-found/no-data-found.component';
import { UsersService } from '../../../core/services/users.service';
import { InitialsPipe } from '../../../core/pipes/initials.pipe';
import { CustomerStatus } from '../../../core/helpers/enums';
import { PopoverDirective } from '../../../core/directive/popover.directive';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { exportToCSV } from '../../../core/helpers/export.helper';
import { TableFilterComponent } from "../../../ui-components/table-filter/table-filter.component";
import { ResponsiveDrawerComponent } from "../../../ui-components/responsive-drawer/responsive-drawer.component";

@Component({
  selector: 'app-user-list',
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
    MatPrefix,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinner,
    DatePipe,
    NoDataFoundComponent,
    InitialsPipe,
    TitleCasePipe,
    PopoverDirective,
    MatChipsModule,
    MatSelectModule,
    MatCheckbox,
    TableFilterComponent,
    ResponsiveDrawerComponent
],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements AfterViewInit {
  private readonly _httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly userService = inject(UsersService);

  search = new FormControl('');
  displayedColumns: string[] = [
    'User',
    'Role',
    'Status',
    'Assignment',
    'Contact',
    'Last login',
    'Created on',
    'star',
  ];
  data: WritableSignal<any[]> = signal([]);

  resultsLength: WritableSignal<number> = signal(0);
  isLoadingResults: WritableSignal<boolean> = signal(false);
  isRateLimitReached: WritableSignal<boolean> = signal(false);

  filters = [
    {
      type: 'checkbox',
      title: 'Status',
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
      type: 'dropdown',
      title: 'Last login',
      options: [
      { title: 'Any', value: ''},
      { title: 'never', value: ''},
      { title: 'not in last 7 days', value: ''},
      { title: 'not in last 30 days', value: ''},
      { title: 'not in last 3 months', value: ''},
      { title: 'today', value: ''},
      { title: 'last 7 days', value: ''},
      { title: 'last 30 days', value: ''},
      { title: 'last 3 months', value: ''},
      { title: 'last 6 months', value: ''},
      { title: 'last year', value: ''},
      { title: 'not in last 1 year', value: ''},
      ]
    },
  ]

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  customerStatus: any = CustomerStatus;

  ngAfterViewInit() {
    this.data.set(this.userService.data);
  }

  onPageChange(page: number) {
    // this.page.set(page);
  }

  goToUserDetails(id: number) {
    this.router.navigate([`manage/users/${id}`]);
  }

  download() {
    exportToCSV(this.data());
  }
}
