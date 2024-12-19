import { Component, inject, signal, viewChild, WritableSignal } from '@angular/core';
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {MatIcon} from "@angular/material/icon";
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass, NgTemplateOutlet} from "@angular/common";
import {AppDropdownDirective} from "../core/directive/dropdown.directive";
import {DropdownLinkDirective} from "../core/directive/dropdown-link.directive";
import {DropdownAnchorDirective} from "../core/directive/dropdown-anchor.directive";
import {MatRipple} from "@angular/material/core";
import {DropDownAnimation, rotateAnimation} from "./animation";
import { HeaderComponent } from "../ui-components/header/header.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIcon,
    RouterLink,
    NgTemplateOutlet,
    AppDropdownDirective,
    DropdownLinkDirective,
    DropdownAnchorDirective,
    MatRipple,
    RouterLinkActive,
    RouterOutlet,
    NgClass,
    HeaderComponent,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [DropDownAnimation, rotateAnimation]
})
export class DashboardComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  drawer = viewChild.required(MatDrawer);
  isHover: WritableSignal<boolean> = signal(false);
  isOpen: WritableSignal<boolean> = signal(true);
  mode: WritableSignal<"over" | "push" | "side"> = signal('side');
  menuItems: WritableSignal<Array<{
    title: string;
    icon: string;
    type: "link" | "dropdown";
    isOpen: false,
    sub?: Array<any>,
    path?: string
  }>> = signal([
    {
      title: "Home",
      icon: "home",
      type: "link",
      isOpen: false,
      path: "welcome"
    },
    {
      title: "CRM",
      icon: "perm_contact_calendar",
      type: "dropdown",
      isOpen: false,
      path: "CRM",
      sub: [
        {
          title: "Overview",
          icon: "monitoring",
          type: "link",
          isOpen: false,
          path: "CRM/report",
        },
        {
          title: "Leads",
          icon: "contact_emergency",
          type: "link",
          isOpen: false,
          path: "CRM/leads",
        },
        {
          title: "Clinics",
          icon: "add_location_alt",
          type: "link",
          isOpen: false,
          path: "CRM/clinics",
        },
        {
          title: "Customers",
          icon: "group",
          type: "link",
          isOpen: false,
          path: "CRM/customers",
        },
      ]
    },
    {
      title: "Support",
      icon: "support",
      type: "dropdown",
      isOpen: false,
      path: "support",
      sub: [
        {
          title: "Overview",
          icon: "monitoring",
          type: "link",
          isOpen: false,
          path: "support/report",
        },
        {
          title: "Tickets",
          icon: "call_quality",
          type: "link",
          isOpen: false,
          path: "support/tickets",
        },
        {
          title: "Library",
          icon: "collections_bookmark",
          type: "link",
          isOpen: false,
          path: "support/library",
        },
      ]
    },
    {
      title: "Billing",
      icon: "payments",
      type: "dropdown",
      isOpen: false,
      path: "billing",
      sub: [
        {
          title: "Overview",
          icon: "monitoring",
          type: "link",
          isOpen: false,
          path: "billing/report",
        },
        {
          title: "Products Master",
          icon: "category",
          type: "link",
          isOpen: false,
          path: "billing/subscriptions",
        },
        {
          title: "Subscriptions",
          icon: "credit_score",
          type: "link",
          isOpen: false,
          path: "billing/clinic-subscription",
        },
        {
          title: "Invoices",
          icon: "receipt_long",
          type: "link",
          isOpen: false,
          path: "billing/invoices",
        },
        {
          title: "Payments",
          icon: "paid",
          type: "link",
          isOpen: false,
          path: "billing/payments",
        },
      ]
    },
    {
      title: "AP Users",
      icon: "admin_panel_settings",
      type: "dropdown",
      path: "manage",
      isOpen: false,
      sub: [
        {
          title: "AP Users",
          icon: "shield_person",
          type: "link",
          isOpen: false,
          path: "manage/users",
        },
        {
          title: "My Profile",
          icon: "encrypted",
          type: "link",
          isOpen: false,
          path: "manage/profile",
        },
      ]
    },
    {
      title: "Audit Logs",
      icon: "overview",
      type: "link",
      isOpen: false,
      path: "audits"
    },
    {
      title: "About",
      icon: "lightbulb",
      type: "link",
      isOpen: false,
      path: "about",
    },
  ])

  constructor() {
    this.breakPointsObserver();
  }

  breakPointsObserver() {
    this.breakpointObserver
        .observe(['(min-width: 960px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            console.log('Viewport width >= 960px');
            this.mode.set('side');
            this.isOpen.set(true);
          } else {
            console.log('Viewport width < 960px');
            this.isOpen.set(false);
            this.mode.set('over');
          }
        });
  }

  closeSideBar() {
    if(this.mode() === 'over') {
      this.drawer().toggle();
    }
  }
}
