import { Directive, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[appDropdown]'
})
export class AppDropdownDirective implements OnInit {
  private readonly router = inject(Router);

  protected navlinks: WritableSignal<Array<DropdownLinkDirective>> = signal([]);
  menuItems: WritableSignal<any[]> = signal([]);
  @Input() set appDropdown(menuItems: any) {
    this.menuItems.set(menuItems);
  }


  private _router: Subscription | undefined;
  
    public closeOtherLinks(openLink: DropdownLinkDirective): void {
      this.navlinks.update((links: Array<DropdownLinkDirective>) => {
        for(let i=0; i<links.length; i++) {
          if (links[i] !== openLink) {
            links[i].open = false;
          }
        }
         return links;
      })
    }
  
    public addLink(link: DropdownLinkDirective): void {
      this.navlinks.update((links: Array<DropdownLinkDirective>) => {
        links.push(link);
        return links;
      })
    }
  
    public removeGroup(link: DropdownLinkDirective): void {
      this.navlinks.update((links: Array<DropdownLinkDirective>) => {
        const index = links.indexOf(link);
        if (index !== -1) {
          links.splice(index, 1);
        }
        return links;
      })
    }
  
    public getUrl() {
      return this.router.url;
    }

    public ngOnInit(): any {
      this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {

        this.navlinks.update((links: Array<DropdownLinkDirective>) => {

          for(let i=0; i<links.length; i++) {
            const routeUrl = this.getUrl();
            const currentUrl = routeUrl.split('/');
            links[i].open = links[i].menu().sub && currentUrl.includes(links[i].menu().path);
            // console.log(links[i], 'links[i]')
          }
          return links;
        })
      });
    }

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);
  
    constructor() {}

}
