import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Editor } from "../quill-editor/quill-editor.component";
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgStyle, UpperCasePipe } from '@angular/common';
import { InitialsPipe } from '../../core/pipes/initials.pipe';
import { MatInput } from '@angular/material/input';
import { DropDownAnimation, rotateAnimation } from '../../dashboard/animation';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    Editor,
    MatSelectModule,
    MatIcon,
    ReactiveFormsModule,
    UpperCasePipe,
    NgStyle,
    InitialsPipe,
    MatInput,
    MatDatepickerModule,
  ],
  animations: [DropDownAnimation, rotateAnimation],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  private breakpointObserver = inject(BreakpointObserver);

  status = new FormControl<any>(0);
  assignee = new FormControl<any>({});
  collaborator = new FormControl<any>([]);
  priority = new FormControl<any>(-1);
  selectedBadges = new FormControl<any>([]);
  environment = new FormControl<string>('Developemnt');
  areaOfIssue = new FormControl<string>('Assessment');
  clinic = new FormControl<string>('clinic 1');
  PreferredContact = new FormControl<string>('Email');
  isSource: WritableSignal<boolean> = signal(false);
  priorities = [
    { label: 'Urgent', color: 'red', selected: true },
    { label: 'High', color: 'orange', selected: false },
    { label: 'Normal', color: 'blue', selected: false },
    { label: 'Low', color: 'gray', selected: false },
  ];

  buckets = [
    { label: 'todo', color: '#6b7280', selected: true },
    { label: 'in progress', color: '#3b82f6', selected: false },
    { label: 'in review', color: '#6366f1', selected: false },
    { label: 'done', color: '#22c55e', selected: false },
  ];

  badges: Array<any> = [
    { label: 'Sell', selected: true },
    { label: 'Bug', selected: false },
    { label: 'Inquiry', selected: false },
    { label: 'Payment', selected: false },
    { label: 'Subscription', selected: false },
  ];

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
  theme: WritableSignal<'snow' | 'bubble'> = signal('snow');

  constructor() {
    this.breakPointsObserver();
  }

  breakPointsObserver() {
    this.breakpointObserver
        .observe(['(min-width: 960px)'])
        .subscribe((state: BreakpointState) => {
            if (state.matches) {
              this.theme.set('snow');
            } else {
              this.theme.set('bubble');
            }
        });
  }
}
