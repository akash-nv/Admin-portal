import { Component, inject, signal, WritableSignal } from '@angular/core';
import { darkenHSL, getRandomLightColor } from '../../../../core/helpers/random-color.helper';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MAT_DATE_FORMATS, MatRipple } from '@angular/material/core';
import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { TaskStatus } from '../../../../core/helpers/enums';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { InitialsPipe } from '../../../../core/pipes/initials.pipe';

const MY_DAYJS_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD', // Format for parsing input dates
  },
  display: {
    dateInput: 'MMM DD', // Format displayed in the input field
    monthYearLabel: 'MMM YYYY', // Format for month/year in the calendar
    dateA11yLabel: 'DD MMM YYYY', // Accessibility label for dates
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility label for month/year
  },
};

@Component({
  selector: 'app-tasks-board',
  standalone: true,
  imports: [
    MatIcon,
    MatRipple,
    NgClass,
    UpperCasePipe,
    MatTooltip,
    MatMenuModule,
    MatButton,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    InitialsPipe,
    MatDatepickerModule,
    NgStyle,
    MatFormFieldModule,
    MatInput
  ],
  providers: [
      { provide: MAT_DATE_FORMATS, useValue: MY_DAYJS_FORMATS },
      DatePipe,
    ],
  templateUrl: './tasks-board.component.html',
  styleUrl: './tasks-board.component.scss'
})
export class TasksBoardComponent {
  router = inject(Router);
  taskStatus: any = TaskStatus;
  groups: WritableSignal<any> = signal([
    {
      title: 'todo',
      tasks: [
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
      ],
      collapsed: false,
    },
    {
      title: 'in progress',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'in review',
      tasks: [
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
      ],
      collapsed: false,
    },
    {
      title: 'done',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'todo',
      tasks: [
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
      ],
      collapsed: false,
    },
    {
      title: 'in progress',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'in review',
      tasks: [
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
        Math.floor(Math.random() * (4 - 1 + 1) + 1),
      ],
      collapsed: false,
    },
    {
      title: 'done',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
  ]);

  collaborators: Array<any> = [
    {
      value: 'John Doe',
      email: 'john.doe@example.com',
      selected: false,
    },
    {
      value: 'Jane Smith',
      email: 'jane.smith@example.com',
      selected: true,
    },
    {
      value: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      selected: false,
    },
    {
      value: 'Bob Brown',
      email: 'bob.brown@example.com',
      selected: true,
    },
    {
      value: 'Charlie Williams',
      email: 'charlie.williams@example.com',
      selected: false,
    },
    {
      value: 'Emma Davis',
      email: 'emma.davis@example.com',
      selected: true,
    },
    {
      value: 'Liam Miller',
      email: 'liam.miller@example.com',
      selected: false,
    },
    {
      value: 'Sophia Wilson',
      email: 'sophia.wilson@example.com',
      selected: true,
    },
    {
      value: 'Ethan Moore',
      email: 'ethan.moore@example.com',
      selected: false,
    },
    {
      value: 'Olivia Taylor',
      email: 'olivia.taylor@example.com',
      selected: true,
    },
    {
      value: 'Noah Anderson',
      email: 'noah.anderson@example.com',
      selected: false,
    },
    {
      value: 'Isabella Thomas',
      email: 'isabella.thomas@example.com',
      selected: true,
    },
    {
      value: 'Mason Jackson',
      email: 'mason.jackson@example.com',
      selected: false,
    },
    {
      value: 'Mia White',
      email: 'mia.white@example.com',
      selected: true,
    },
    {
      value: 'Lucas Harris',
      email: 'lucas.harris@example.com',
      selected: false,
    },
  ];
  priorities = [
    { label: 'Urgent', color: 'red', selected: true },
    { label: 'High', color: 'orange', selected: false },
    { label: 'Normal', color: 'blue', selected: false },
    { label: 'Low', color: 'gray', selected: false },
  ];

  constructor() {
    this.groups.update((groups) => {
      groups.forEach((grp: any) => {
        const bgColor = getRandomLightColor(); // Random light background
        const borderColor = darkenHSL(bgColor, 15);
        const color = darkenHSL(bgColor, 50);
        grp.color = color;
        grp.bgColor = bgColor;
        grp.borderColor = borderColor
      })
      return groups;
    })
  }

  goToTaskDetails() {
    this.router.navigate(['/support/tickets/123']);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
