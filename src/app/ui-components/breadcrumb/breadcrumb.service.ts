import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly router = inject(Router);

  route = inject(ActivatedRoute)
  private readonly breadcrumbs = new BehaviorSubject<any[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();
  list: any[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor() {
    this.handleRoute(this.route.snapshot)

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const root = this.router.routerState.snapshot.root;
        this.handleRoute(root);
      });
  }

  handleRoute(root: ActivatedRouteSnapshot) {
    const breadcrumbs = this.createBreadcrumbs(root);
    this.list = breadcrumbs;
    this.breadcrumbs.next(breadcrumbs);
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: any[] = []): any[] {
    const routeConfig = route.routeConfig;
    
    if (routeConfig?.path) {
      // Add breadcrumb
      const path = routeConfig.path.split('/');
      path.forEach((segment, index) => {
        if (segment.startsWith(':')) {
          const paramName = segment.slice(1); // Get the parameter name
          segment = route.params[paramName];  // Replace with actual param value
        }
        url += `/${segment}`;
      });

      if(routeConfig.data?.['breadcrumb']) {
        const breadcrumb: any = {
          label: routeConfig.data?.['breadcrumb'] || 'Unnamed',
          url: url
        };
        breadcrumbs.push(breadcrumb);
      }
    }

    // Recursively add more breadcrumbs
    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, url, breadcrumbs);
    }
    
    return breadcrumbs;
  }

  addBreadcrumb(data: any) {
    this.list = [...this.list, data];
    this.breadcrumbs.next(this.list);
  }
}
