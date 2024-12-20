import { Component, computed, inject, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { Editor } from '../../ui-components/quill-editor/quill-editor.component';
import { ThemeService } from '../../core/services/theme.service';
import { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
const client = generateClient<Schema>();

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [MatIcon, RouterLink, UpperCasePipe, Editor],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  themeService = inject(ThemeService);
  theme: Signal<string> = computed(() => this.themeService.currentTheme());

  shortcuts = [
    {
      title: 'Leads',
      icon: 'contact_emergency',
      path: '/CRM/leads',
      tag: 'CRM',
    },
    {
      title: 'Clinics',
      icon: 'add_location_alt',
      path: '/CRM/clinics',
      tag: 'CRM',
    },
    {
      title: 'Customers',
      path: '/CRM/customers',
      icon: 'group',
      tag: 'CRM',
    },
    {
      title: 'Tickets',
      icon: 'call_quality',
      path: '/support/tickets',
      tag: 'Support',
    },
    {
      title: 'Library',
      icon: 'collections_bookmark',
      path: '/support/library',
      tag: 'Support',
    },
    {
      title: 'Prod Master',
      icon: 'category',
      path: '/billing/subscriptions',
      tag: 'Billing',
    },
    {
      title: 'Subscriptions',
      icon: 'credit_score',
      path: '/billing/clinic-subscription',
      tag: 'Billing',
    },
    {
      title: 'Invoices',
      icon: 'receipt_long',
      path: '/billing/invoices',
      tag: 'Billing',
    },
    {
      title: 'Payments',
      icon: 'paid',
      path: '/billing/payments',
      tag: 'Billing',
    },
    {
      title: 'AP Users',
      icon: 'shield_person',
      path: '/manage/users',
      tag: 'AP Users',
    },
    {
      title: 'My Profile',
      icon: 'encrypted',
      path: '/manage/profile',
      tag: 'AP Users',
    },
    {
      title: 'Audit Logs',
      path: '/audits',
      icon: 'overview',
      tag: 'Audit',
    },
    {
      title: 'About',
      icon: 'lightbulb',
      path: '/about',
      tag: 'About',
    },
  ];

  constructor() {
    // client.models.Clinic.list()
    this.getAll()
  }

  async getAll() {
    const { data, errors } = await client.queries.getClinics();
    console.log(data, errors)
  }
}
