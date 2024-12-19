import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-table-filter',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatButtonModule],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss'
})
export class TableFilterComponent {
  filters = input<any>([])
}