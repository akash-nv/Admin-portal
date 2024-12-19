import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Priority, PriorityIconMap, TaskStatus } from '../../../../core/helpers/enums';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    TitleCasePipe,
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {
  displayedColumns: string[] = [
    'task',
    'summary',
    'status',
    'assignee',
    'priority',
    'created on',
    'stars',
  ];
  priority: any = Priority;
  priorityIcon: any = PriorityIconMap;
  taskStatus: any = TaskStatus;
  tasks: WritableSignal<
    Array<{
      title: string;
      status: 'todo' | 'in progress' | 'in review' | 'done';
      assignee: number[];
      createdAt: Date;
      priority: 'high' | 'medium' | 'low';
    }>
  > = signal([
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'todo',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'high',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in progress',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'in review',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'medium',
    },
    {
      title: 'Search inspirations for upcoming project',
      summary: `Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response! Best, Bob`,
      status: 'done',
      assignee: [1, 2, 3],
      createdAt: new Date(),
      priority: 'low',
    },
  ]);
}
