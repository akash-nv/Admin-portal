import { DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { NotificationPriority } from '../../core/helpers/enums';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [DatePipe, MatChipsModule, TitleCasePipe, SafeHtmlPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  data = input.required<{
    title: string,
    priority: 'urgent' | 'high' | 'medium' | 'low',
    body: string,
    timeStamp: Date,
    isRead: boolean,
    category: Array<string>
  }>({alias: 'notificationData'});
  today = new Date();
  readonly vegetables = signal<string[]>([
    'Billing', 'Security', 'Scheduling'
  ]);
  NotificationPriority = NotificationPriority;
}
