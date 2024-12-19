import { Directive, HostBinding, Input, OnInit, OnDestroy, ElementRef, inject, signal, WritableSignal } from '@angular/core';

import { AppDropdownDirective } from './dropdown.directive';
import {ActivatedRoute, Router} from "@angular/router";

@Directive({
  selector: '[appDropdownLink]',
  standalone: true
})
export class DropdownLinkDirective implements OnInit, OnDestroy {
  private _elemRef = inject(ElementRef);
  readonly router = inject(Router);

  @Input() public group: any;
  menu: WritableSignal<any> = signal(null);

  protected _open: WritableSignal<boolean | undefined> = signal(false);
  protected nav: AppDropdownDirective;

  @Input() set appDropdownLink(menu: any) {
    this.menu.set(menu);
  }

  // @HostBinding('class.open')
  @Input()
  get open(): boolean {
    return this._open() as boolean;
  }

  set open(value: boolean) {
    this._open.set(value);
    this.menu.update(menu => {
      menu.isOpen = value;
      return menu;
    })
    // if (value) {
    //   this.nav.closeOtherLinks(this);
    // }
  }

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  public constructor() {
    const nav = inject<AppDropdownDirective>(AppDropdownDirective);

    this.nav = nav;
  }

  public ngOnInit(): any {
    this.nav.addLink(this);

    // set true if open class exists
      if(this.menu().sub && this.router.url.split("/").includes(this.menu().path)) {
          this.open = true;
      }
  }

  public ngOnDestroy(): any {
    this.nav.removeGroup(this);
  }

  public toggle(): any {
    this.open = !this.open;
  }
}
