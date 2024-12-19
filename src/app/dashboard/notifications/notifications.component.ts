import { Component, signal, WritableSignal } from '@angular/core';
import { NotificationComponent } from "../../ui-components/notification/notification.component";
import { InfiniteScrollDirective } from "ngx-infinite-scroll";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationComponent, InfiniteScrollDirective],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications: WritableSignal<any[]> = signal([
    {
      title: 'Invoice generated',
      priority: 'low',
      body: `Invoice generated for customer 1234567890 for the month of October, 2024. <a href="#">View Invoice</a>`,
      targetLink: '/dashboard/billing',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: false,
      category: ['Billing']
    },
    {
      title: 'Payment failed',
      priority: 'high',
      body: `Payment failed for customer 1234567890 for the month of October, 2024. <a href="#">View Payment</a>`,
      targetLink: '/dashboard/billing',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: true,
      category: ['Billing']
    },
    {
      title: 'New user registered',
      priority: 'medium',
      body: `New user registered with email test@test.com. <a href="#">View User</a>`,
      targetLink: '/manage/users',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: false,
      category: ['Security',]
    },
    {
      title: 'User deleted',
      priority: 'low',
      body: `User with email test@test.com has been deleted. <a href="#">View User</a>`,
      targetLink: '/manage/users',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: true,
      category: ['Security']
    },
    {
      title: 'New customer signed up',
      priority: 'urgent',
      body: `New customer signed up on Nov 1, 2024 with email test@test.com. <a href="#">View Customer</a>`,
      targetLink: '/manage/customers',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: false,
      category: ['CRM']
    },
    {
      title: 'New clinic added',
      priority: 'high',
      body: `New clinic added with name "Clinic 1" on Nov 1, 2024 for customer 1234567890. <a href="#">View Clinic</a>`,
      targetLink: '/manage/clinics',
      timeStamp: new Date("2024-11-01T10:00:00"),
      isRead: true,
      category: ['CRM']
    },
    {
      title: 'Unusual login activity',
      priority: 'urgent',
      body: `Unusual login activity detected on customer portal on Nov 7, 2024 for customer 1234567890. Provide more details about the activity such as IP address, device, location, username, possible clinic, customer name, etc.`,
      targetLink: '/manage/login-activity',
      timeStamp: new Date("2024-11-07T10:00:00"),
      isRead: false,
      category: ['Security']
    },
    {
      title: 'Overdue support tickets',
      priority: 'urgent',
      body: `There are 3 overdue support tickets. Please review and provide a status update.`,
      targetLink: '/support/tickets',
      timeStamp: new Date("2024-11-07T10:00:00"),
      isRead: true,
      category: ['Support']
    },
    {
      title: 'Low user activity in Customer Portal',
      priority: 'medium',
      body: `There has been low user activity in the customer portal for the past 2 weeks for customer 1234567890. Please review and take appropriate action.`,
      targetLink: '/CRM/customers',
      timeStamp: new Date("2024-11-07T10:00:00"),
      isRead: false,
      category: ['CRM']
    },
    
  ])
  page = 1;
  onScroll() {
    console.log('scrolling');
  }
}
