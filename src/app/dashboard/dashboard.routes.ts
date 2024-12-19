import { animate } from '@angular/animations';
import { Routes } from '@angular/router';
export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        data: {
          breadcrumb: 'Home',
          title: 'CSI Admin Portal',
        },
        loadComponent: () =>
          import('../dashboard/welcome/welcome.component').then(
            (c) => c.WelcomeComponent
          ),
      },
      {
        path: 'CRM',
        loadComponent: () =>
          import('../dashboard/crm/crm.component').then((c) => c.CrmComponent),
        children: [
          {
            path: 'report',
            data: {
              title: 'CRM Overview',
            },
            loadComponent: () =>
              import('../dashboard/reports/analytics/analytics.component').then(
                (c) => c.AnalyticsComponent
              ),
          },
          {
            path: 'leads',
            data: {
              title: 'Leads',
              message:
                'Manage your leads here, Manage work assignment of the leads via the Board view personalized for the sales managers & members',
            },
            loadComponent: () =>
              import('../dashboard/coming-soon/coming-soon.component').then(
                (c) => c.ComingSoonComponent
              ),
          },
          {
            path: 'customers',
            loadComponent: () =>
              import('./crm/customers/customers.component').then(
                (c) => c.CustomersComponent
              ),
            data: { breadcrumb: 'Customers' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import(
                    './crm/customers/customer-list/customer-list.component'
                  ).then((c) => c.CustomerListComponent),
                data: { title: 'Customers', animation: 0 },
              },
              {
                path: ':customerId',
                loadComponent: () =>
                  import(
                    './crm/customers/customer-details/customer-details.component'
                  ).then((c) => c.CustomerDetailsComponent),
                data: { title: 'Customer Details', animation: 1 },
              },
            ],
          },
          {
            path: 'clinics',
            loadComponent: () =>
              import('./crm/clinic/clinic.component').then(
                (c) => c.ClinicComponent
              ),
            data: { breadcrumb: 'Clinics' },
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('./crm/clinic/clinics/clinics.component').then(
                    (c) => c.ClinicsComponent
                  ),
                data: { title: 'Clinics', animation: 0 },
              },
              {
                path: ':clinicId',
                loadComponent: () =>
                  import(
                    './crm/clinic/clinic-details/clinic-details.component'
                  ).then((c) => c.ClinicDetailsComponent),
                data: { title: 'Clinic Details', animation: 1 },
              },
            ],
          },
        ],
      },
      {
        path: 'support/report',
        data: {
          title: 'Support Overview',
          animation: 0,
        },
        loadComponent: () =>
          import('../dashboard/reports/analytics/analytics.component').then(
            (c) => c.AnalyticsComponent
          ),
      },
      {
        path: 'support/tickets',
        data: {
          breadcrumb: '',
          title: 'Tickets',
          animation: 1,
        },
        loadComponent: () =>
          import('./support/tasks/tasks.component').then(
            (c) => c.TasksComponent
          ),
      },
      {
        path: 'support/tickets/:ticketId',
        data: {
          breadcrumb: '',
          title: 'Ticket Details',
          animation: 2,
        },
        loadComponent: () =>
          import('./support/task-details/task-details.component').then(
            (c) => c.TaskDetailsComponent
          ),
      },
      {
        path: 'support/library',
        data: {
          title: 'Library',
          message:
            'Search and manage your support library here. Add your own documents to the library for easy access. Get a head start with already saved support knowledge base, FAQs, and more.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'billing/report',
        data: {
          title: 'Billing Overview',
          message:
            'Billing related top level dashboard and key metrics will be available here.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'billing/subscriptions',
        data: {
          title: 'Products Master',
          message:
            'Manage your product plans here. E.g. Free, Core, Premium, etc.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'billing/clinic-subscription',
        data: {
          title: 'Subscriptions',
          message:
            'Subscription details at clinic level will be available here. i.e. which features are enabled for the clinic.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'billing/invoices',
        data: {
          title: 'Invoices',
          message: 'Invoices related to the customers will be available here.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'billing/payments',
        data: {
          title: 'Payments',
          message: 'Payments related to the customers will be available here.',
        },
        loadComponent: () =>
          import('../dashboard/coming-soon/coming-soon.component').then(
            (c) => c.ComingSoonComponent
          ),
      },
      {
        path: 'manage',
        data: { breadcrumb: 'AP Users' },
        loadComponent: () =>
          import('../dashboard/users/users.component').then(
            (c) => c.UsersComponent
          ),
        children: [
          {
            path: 'users',
            loadComponent: () =>
              import('../dashboard/users/user-list/user-list.component').then(
                (c) => c.UserListComponent
              ),
            data: { breadcrumb: '', title: 'AP Users', animation: 0 },
          },
          {
            path: 'profile',
            data: {
              title: 'Profile',
              message:
                'Manage your profile here. Update your personal information, preferences, password, etc.',
              animation: 1,
            },
            loadComponent: () =>
              import('../dashboard/users/my-profile/my-profile.component').then(
                (c) => c.MyProfileComponent
              ),
          },
          {
            path: 'users/:userId',
            loadComponent: () =>
              import(
                '../dashboard/users/user-details/user-details.component'
              ).then((c) => c.UserPermissionComponent),
            data: { title: 'User Details', animation: 2 },
          },
        ],
      },
      {
        path: 'audits',
        data: {
          title: 'Audit Logs',
        },
        loadComponent: () =>
          import('../dashboard/audits/audits.component').then(
            (c) => c.AuditsComponent
          ),
      },
      {
        path: 'about',
        data: {
          title: 'About',
        },
        loadComponent: () =>
          import('../dashboard/about/about.component').then(
            (c) => c.AboutComponent
          ),
      },
      {
        path: 'notifications',
        data: {
          breadcrumb: 'Notifications',
          title: 'Notifications',
        },
        loadComponent: () =>
          import('../dashboard/notifications/notifications.component').then(
            (c) => c.NotificationsComponent
          ),
      },
    ],
  },
];
