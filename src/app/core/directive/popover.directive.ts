import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, inject, Injector, Input, input, TemplateRef } from '@angular/core';
import { PopoverComponent } from '../../ui-components/popover/popover.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appPopover]',
  standalone: true,
})
export class PopoverDirective {
  overlay = inject(Overlay);
  elementRef = inject(ElementRef);
  positionBuilder = inject(OverlayPositionBuilder);
  injector = inject(Injector);
  private document = inject(DOCUMENT);

  content: any;
  @Input() set appPopover(menu: any) {
    this.content = menu;
  }
  event = input<'click' | 'hover'>('click');
  backdrop = input(true);
  templateData = input();
  private overlayRef: OverlayRef | null = null;
  popoverComponentRef: any;

  @HostListener('click')
  togglePopover() {
    if (this.overlayRef?.hasAttached()) {
      this.hidePopover();
    } else if(this.event() === 'click') {
      this.openPopover();
    }
  }

  @HostListener('mouseover')
  onMouseOver() {
    if(this.event() === 'hover') {
      this.openPopover();
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (this.event() === 'hover' && this.overlayRef?.hasAttached()) {
      setTimeout(() => {
        if (this.overlayRef && !this.overlayRef.overlayElement.matches(':hover')) {
          this.popoverComponentRef?.instance.animationState.set('hidden');
        }
      }, 100);
    }
  }

  hidePopover() {
    if (this.overlayRef) {
      this.popoverComponentRef?.instance.animationState.set('hidden');
    }
  }

  openPopover(contentTemplateRef?: TemplateRef<any>, elementRef? :any) {
    this.content = contentTemplateRef ? contentTemplateRef : this.content;
    this.elementRef = elementRef ? elementRef : this.elementRef;
    if(this.overlayRef)
        return;
    const positionStrategy = this.createPositionStrategy();
    const backdrop = this.event() === 'hover' ? false : !this.backdrop() ? false : true;

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: backdrop,
      backdropClass: 'bg-transparent',
    });


    // using component with ng content projection
    const injector = this.createInjector(this.content);
    const popoverPortal: any = new ComponentPortal(PopoverComponent, null, injector);
    const popoverComponentRef = this.overlayRef?.attach(popoverPortal);
    this.popoverComponentRef = popoverComponentRef;
    if (popoverComponentRef.instance) {
      popoverComponentRef.instance.overlayRef.set(this.overlayRef);
      popoverComponentRef.instance.template.set(this.content);
      popoverComponentRef.instance.data.set(this.templateData());
      popoverComponentRef.instance.animationComplete.subscribe(() => {
        this.overlayRef?.detachBackdrop();
        this.overlayRef?.dispose();
        this.overlayRef?.detach();
        this.overlayRef = null;
        this.removeOutsideClickListener();
      });

      if(this.event() === 'hover') {
        popoverComponentRef.hostView.detectChanges();
        const tooltipElement = this.overlayRef?.overlayElement;

        tooltipElement?.addEventListener('mouseenter', () => this.openPopover());
        tooltipElement?.addEventListener('mouseleave', () =>  this.hidePopover());
      }
    }
    this.overlayRef?.backdropClick().subscribe(() => {
      this.hidePopover();
    });
    if(!backdrop)
      this.listenForOutsideClicks();

    // using ng template
    // const popoverPortal = new TemplatePortal(this.content, this.viewContainerRef);
    // this.overlayRef.attach(popoverPortal);
  }

  createInjector(template: TemplateRef<any>): Injector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(TemplateRef, template);
    return new PortalInjector(this.injector, injectionTokens);
  }

   private createPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this.positionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(true)
      .withViewportMargin(8)
      .withPush()
      .withPositions([
        // Preferred position: below and centered
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
        // Fallback position: above and centered
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
        // Fallback position: to the left of the target
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        // Fallback position: to the right of the target
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);
  }


  private listenForOutsideClicks() {
    const clickOutsideHandler = (event: MouseEvent) => {
      const clickedInsideOverlay =
        this.overlayRef?.overlayElement?.contains(event.target as Node);
      const clickedInsideTrigger = this.elementRef.nativeElement?.contains(
        event.target as Node
      );

      if (!clickedInsideOverlay && !clickedInsideTrigger) {
        this.hidePopover();
      }
    };

    // Add a global click listener
    this.document.addEventListener('click', clickOutsideHandler);

    // Store the handler for removal later
    this.outsideClickHandler = clickOutsideHandler;
  }

  private removeOutsideClickListener() {
    if (this.outsideClickHandler) {
      this.document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }
  }

  private outsideClickHandler: ((event: MouseEvent) => void) | null = null;

}
