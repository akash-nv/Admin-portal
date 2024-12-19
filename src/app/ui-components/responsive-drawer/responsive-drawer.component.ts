import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, inject, Input, signal, TemplateRef, viewChild, WritableSignal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-responsive-drawer',
  standalone: true,
  imports: [MatDrawer, NgTemplateOutlet],
  templateUrl: './responsive-drawer.component.html',
  styleUrl: './responsive-drawer.component.scss'
})
export class ResponsiveDrawerComponent {
  private _bottomSheet = inject(MatBottomSheet);
  _drawer = viewChild.required(MatDrawer)
  private breakpointObserver = inject(BreakpointObserver);
  templateRef = viewChild.required<TemplateRef<any>>('drawerTempalte');
    isMatDrawerOpen: WritableSignal<boolean> = signal(false);
  isMAtBottomSheetOpen: WritableSignal<boolean> = signal(false);
  private _bottomSheetRef!: MatBottomSheetRef;
  isBottomSheet: WritableSignal<boolean> = signal(false);
  isDrawerOpend: WritableSignal<boolean> = signal(false);

  @Input()
  get open(): boolean {
    return this.isDrawerOpend() as boolean;
  }

  set open(value: boolean) {
    this.isDrawerOpend.set(value);
    if(value) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }

  constructor() {
    this.breakPointsObserver();
  }

  breakPointsObserver() {
    this.breakpointObserver
        .observe(['(min-width: 960px)'])
        .subscribe((state: BreakpointState) => {
            if (state.matches) {
              this.isBottomSheet.set(false);
              if(this.isDrawerOpend()) {
                this.openDrawer();
              }
            } else {
              this.isBottomSheet.set(true);
              if(this.isDrawerOpend()) {
                this.openDrawer();
              }
            }
        });
  }
  
  private openBottomSheet(): void {
    this._bottomSheetRef = this._bottomSheet.open(this.templateRef());
    this.isMAtBottomSheetOpen.set(true);
    this._bottomSheetRef.backdropClick().subscribe(() => {
      this.toggleDrawer()
    })
  }

  private closeBottomSheet() {
    this._bottomSheetRef?.dismiss();
    this.isMAtBottomSheetOpen.set(false);
  }

  toggleDrawer() {
    if(!this.isDrawerOpend()) {
      this.openDrawer();
      this.isDrawerOpend.set(true);
    } else {
      this.closeDrawer();
      this.isDrawerOpend.set(false);
    }
  }
  private openDrawer() {
    if(this.isBottomSheet()) {
      this.isMatDrawerOpen.set(false);
      this.openBottomSheet();
    } else {
      this.closeBottomSheet();
      this.isMatDrawerOpen.set(true);
    }
  }

  private closeDrawer() {
    this.isMatDrawerOpen.set(false);
    this.closeBottomSheet();
  }
}
