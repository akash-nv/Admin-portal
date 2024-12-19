import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, MatButton, MatIcon],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: 'home'};
  breadcrumbs: any[] = [];
  isSM = false;

  constructor() {
    this.breakpointObserver
    .observe(['(min-width: 640px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.isSM = false;
      } else {
        this.isSM = true;
      }
    });
  }

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  goBack() {
    window.history.back();
  }
}
