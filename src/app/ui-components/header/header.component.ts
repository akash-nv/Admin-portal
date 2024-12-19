import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NotificationComponent } from '../notification/notification.component';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    NotificationComponent,
    MatButtonModule,
    MatMenuItem,
    RouterLink,
    MatBadgeModule,
    FormsModule,
    MatSlideToggle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly themeService = inject(ThemeService);

  @Input() draver: any;
  isToggle: WritableSignal<boolean> = signal(false);
  title: WritableSignal<string> = signal('');

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
  ])
  isDark = false;
  constructor() {
    this.isDark = this.themeService.currentActive() === 'dark';
    let currentRoute = this.activatedRoute;
    this.getTitleOfRoute(currentRoute);
    this.breakPointsObserver();
  }

  getTitleOfRoute(route: ActivatedRoute) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.activatedRoute;

        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        currentRoute.data.subscribe(data => {
          this.title.set(data['title']);
        });
      })
  }

  breakPointsObserver() {
    this.breakpointObserver
        .observe(['(min-width: 1024px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            console.log('Viewport width >= 1024px');
            this.isToggle.set(false);
        
          } else {
            console.log('Viewport width < 1024px');
            this.isToggle.set(true);
          }
        });
  }

  toggleDrawer() {
    if(this.draver)
      this.draver.toggle();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/signin'])
  }

  onChanges(event: any) {
    this.themeService.update(this.isDark ? 'dark': 'light')
  }
}
