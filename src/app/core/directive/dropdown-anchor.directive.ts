import { Directive, HostListener, inject } from '@angular/core';
import { DropdownLinkDirective } from './dropdown-link.directive';

@Directive({
  selector: '[appDropdownToggle]',
  standalone: true
})
export class DropdownAnchorDirective {
  protected navlink: DropdownLinkDirective;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const navlink = inject<DropdownLinkDirective>(DropdownLinkDirective);

    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navlink.toggle();
  }
}
