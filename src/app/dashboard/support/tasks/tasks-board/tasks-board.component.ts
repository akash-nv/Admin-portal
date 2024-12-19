import { Component, inject, signal, WritableSignal } from '@angular/core';
import { darkenHSL, getRandomLightColor } from '../../../../core/helpers/random-color.helper';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgClass, UpperCasePipe } from '@angular/common';
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
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      collapsed: false,
    },
    {
      title: 'in progress',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'in review',
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      collapsed: false,
    },
    {
      title: 'done',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'todo',
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      collapsed: false,
    },
    {
      title: 'in progress',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
    {
      title: 'in review',
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      collapsed: false,
    },
    {
      title: 'done',
      tasks: [1, 2, 3, 4],
      collapsed: false,
    },
  ]);

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
