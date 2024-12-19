import { AfterViewInit, Component, Input, input, InputSignal, output, signal, TemplateRef, ViewContainerRef, WritableSignal } from '@angular/core';
import { fadeInOut } from '../../core/animations/fadeinout';
import { NgTemplateOutlet } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [NgTemplateOutlet],
  animations: [
   fadeInOut
  ],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverComponent implements AfterViewInit {
  overlayRef = signal<OverlayRef | null>(null);
  template = signal<TemplateRef<any> | null>(null);
  animationState: WritableSignal<'visible' | 'hidden'> = signal('hidden');
  animationComplete = output();
  data = signal({});
  isHovering = signal(false);

  constructor() {
  }

  ngAfterViewInit(): void {
      this.animationState.set('visible');
  }

  onAnimationDone(event: any) {
    // Close the overlay after the exit animation completes
    if (event.toState === 'hidden' && this.overlayRef()?.hasAttached()) {
        this.animationComplete.emit();
    }
  }

  onMouseEnter() {
    this.isHovering.set(true);
  }

  onMouseLeave() {
    this.isHovering.set(false);
  }
}
