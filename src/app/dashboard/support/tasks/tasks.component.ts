import {
  NgTemplateOutlet,
  UpperCasePipe,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {
  Priority,
  PriorityIconMap,
  TaskStatus,
} from '../../../core/helpers/enums';
import { slider } from '../../../core/animations/slide';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { darkenHSL, getRandomLightColor } from '../../../core/helpers/random-color.helper';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { InitialsPipe } from "../../../core/pipes/initials.pipe";
import { ResponsiveDrawerComponent } from "../../../ui-components/responsive-drawer/responsive-drawer.component";
import { TasksBoardComponent } from "./tasks-board/tasks-board.component";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { Editor } from "../../../ui-components/quill-editor/quill-editor.component";
import { CreateTaskComponent } from "../../../ui-components/create-task/create-task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatChipsModule,
    FormsModule,
    UpperCasePipe,
    MatTooltip,
    TaskDetailsComponent,
    MatMenuModule,
    MatSelectModule,
    ReactiveFormsModule,
    InitialsPipe,
    NgTemplateOutlet,
    ResponsiveDrawerComponent,
    TasksBoardComponent,
    TasksListComponent,
    CreateTaskComponent,
    MatDialogActions,
    MatDialogContent
],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  private readonly dialog = inject(MatDialog);
  dialogRef: any;
  selectedView: WritableSignal<number> = signal(1);
  buckets = new FormControl<any[]>([]);
  assignees = new FormControl<any[]>([]);
  views = [
    {
      title: 'Board',
      icon: 'width_normal',
    },
    {
      title: 'List',
      icon: 'list',
    },
  ];
  bucketList: any = [
    { title: 'todo',},
    { title: 'in progress',},
    { title: 'in review',},
    { title: 'done'},
  ]
  taskStatus: any = TaskStatus;
  priority: any = Priority;
  priorityIcon: any = PriorityIconMap;
  
  collaborators: Array<any> = [
    {
      value: "John Doe",
      email: "john.doe@example.com",
      selected: false
    },
    {
      value: "Jane Smith",
      email: "jane.smith@example.com",
      selected: true
    },
    {
      value: "Alice Johnson",
      email: "alice.johnson@example.com",
      selected: false
    },
    {
      value: "Bob Brown",
      email: "bob.brown@example.com",
      selected: true
    },
    {
      value: "Charlie Williams",
      email: "charlie.williams@example.com",
      selected: false
    },
    {
      value: "Emma Davis",
      email: "emma.davis@example.com",
      selected: true
    },
    {
      value: "Liam Miller",
      email: "liam.miller@example.com",
      selected: false
    },
    {
      value: "Sophia Wilson",
      email: "sophia.wilson@example.com",
      selected: true
    },
    {
      value: "Ethan Moore",
      email: "ethan.moore@example.com",
      selected: false
    },
    {
      value: "Olivia Taylor",
      email: "olivia.taylor@example.com",
      selected: true
    },
    {
      value: "Noah Anderson",
      email: "noah.anderson@example.com",
      selected: false
    },
    {
      value: "Isabella Thomas",
      email: "isabella.thomas@example.com",
      selected: true
    },
    {
      value: "Mason Jackson",
      email: "mason.jackson@example.com",
      selected: false
    },
    {
      value: "Mia White",
      email: "mia.white@example.com",
      selected: true
    },
    {
      value: "Lucas Harris",
      email: "lucas.harris@example.com",
      selected: false
    }
  ]

  constructor() {
    const view = this.activatedRoute.snapshot.queryParamMap.get('view');
    this.selectedView.set(view ? +view : 1)

      this.bucketList.forEach((grp: any) => {
        const bgColor = getRandomLightColor(); // Random light background
        const borderColor = darkenHSL(bgColor, 15);
        const color = darkenHSL(bgColor, 50);
        grp.color = color;
        grp.bgColor = bgColor;
        grp.borderColor = borderColor
      })
  }

  viewChange(event: any, index: number) {
    event.source.selectViaInteraction();

    if (event.selected) {
      this.selectedView.set(index);
      this.router.navigate(['/support/tickets'], {
        queryParams: {
          view: this.selectedView(),
        },
      });
    } else {
      event.source.selectViaInteraction();
    }
  }

  openDialog(templateRef: TemplateRef<any>, data: any = '') {
    this.dialogRef = this.dialog.open(templateRef, {
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
