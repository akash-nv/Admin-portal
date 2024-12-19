import { Directive, ElementRef, EventEmitter, HostListener, inject, output, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  elementRef = inject(ElementRef);
  clickOutside = output<Event>()

  constructor() {}

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }
}
