import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, inject, Injector, input, Input, TemplateRef } from '@angular/core';
import { PopoverComponent } from '../../ui-components/popover/popover.component';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  overlay = inject(Overlay);
  elementRef: any;
  positionBuilder = inject(OverlayPositionBuilder);
  injector = inject(Injector);

  content: any;
  @Input() set appTooltip(menu: any) {
    this.content = menu;
  }
  event = input<'click' | 'hover'>('click');
  templateData = input();
  private overlayRef: OverlayRef | null = null;
  popoverComponentRef: any;

  hidePopover () {
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

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: this.event() === 'click',
      backdropClass: 'bg-transparent',
    });


    // using component with ng content projection
    const injector = this.createInjector(this.content);
    const popoverPortal: any = new ComponentPortal(PopoverComponent, null, injector);
    const popoverComponentRef = this.overlayRef.attach(popoverPortal);
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
      });
    }
    this.overlayRef.backdropClick().subscribe(() => {
      popoverComponentRef.instance.animationState.set('hidden');
    });

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
}
