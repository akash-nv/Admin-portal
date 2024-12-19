import { DOCUMENT, isPlatformBrowser, NgClass, NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, inject, Input, output, PLATFORM_ID, QueryList, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Nullable, VoidListener } from '../../core/helpers/ts-helper';
import { MatIcon } from '@angular/material/icon';

function getWidth(el: HTMLElement): number {
  let width = el.offsetWidth;
  let style = getComputedStyle(el);

  width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

  return width;
}

function getOuterWidth(el: HTMLElement, margin?: boolean) {
  let width = el.offsetWidth;

  if (margin) {
      let style = getComputedStyle(el);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
  }

  return width;
}

@Component({
  selector: 'splitter',
  standalone: true,
  imports: [NgClass, NgStyle, NgTemplateOutlet],
  templateUrl: './splitter.component.html',
  styleUrl: './splitter.component.scss'
})
export class SplitterComponent {
  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  renderer = inject(Renderer2);
  cd = inject(ChangeDetectorRef);
  el = inject(ElementRef);

  gutterSize: number = 4;
  step: number = 5;
  layout = 'horizontal';
  @Input() styleClass: string = '';
  @Input() minSizes: Array<number> = [];
  @Input() get panelSizes(): number[] {
    return this._panelSizes;
  }
  set panelSizes(val: number[]) {
    this._panelSizes = val;

    if (this.el && this.el.nativeElement && this.panels.length > 0) {
      let children = [...this.el.nativeElement.children[0].children].filter((child) => child.classList.contains('splitter-panel'));
      let _panelSizes = [];

      this.panels.map((panel, i) => {
        let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
        let panelSize = panelInitialSize ?? 100 / this.panels.length;
        _panelSizes[i] = panelSize;
        console.log(children)
        children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
      });
    }
  }

  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;

  @ViewChild('container', { static: false }) containerViewChild: Nullable<ElementRef>;
  onResizeEnd = output<any>();

  nested: boolean = false;

  panels: any[] = [];

  dragging: boolean = false;

  mouseMoveListener: VoidListener;

  mouseUpListener: VoidListener;

  touchMoveListener: VoidListener;

  touchEndListener: VoidListener;

  size: number = 0;

  gutterElement: any;

  startPos: number = 0;

  prevPanelElement: Nullable<ElementRef | HTMLElement>;

  nextPanelElement: Nullable<ElementRef | HTMLElement>;

  nextPanelSize: number = 0;

  prevPanelSize: number = 0;

  _panelSizes: number[] = [];

  prevPanelIndex: Nullable<number>;

  timer: any;

  prevSize: any;

  private window: Window;

  constructor() {
    this.window = this.document.defaultView as Window;
  }

  ngOnInit() {
    this.nested = this.isNested();
  }

  ngAfterContentInit() {
    this.templates.forEach((item: any) => {
      console.log(item)
      this.panels.push(item.template);
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.panels && this.panels.length) {
        let initialized = false;
        // if (this.isStateful()) {
        //   initialized = this.restoreState();
        // }

        if (!initialized) {
          let children = [...this.el.nativeElement.children[0].children].filter((child) => child.classList.contains('splitter-panel'));
          let _panelSizes: any = [];

          // setTimeout(() => {
            this.panels.map((panel, i) => {
              let panelInitialSize = this.panelSizes.length - 1 >= i ? this.panelSizes[i] : null;
              let panelSize = panelInitialSize || 100 / this.panels.length;
              _panelSizes[i] = panelSize;
              console.log("childred", children)
              children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * (this.gutterSize as number) + 'px)';
            });
  
            this._panelSizes = _panelSizes;
  
            this.prevSize = parseFloat(_panelSizes[0]).toFixed(4);
          // }, 0)
          
        }
      }
    }
  }

  resizeStart(event: TouchEvent | MouseEvent, index: number, isKeyDown?: boolean) {
    this.gutterElement = (event.currentTarget as HTMLElement) || (event.target as HTMLElement).parentElement;
    this.size = getWidth((this.containerViewChild as ElementRef).nativeElement);

    if (!isKeyDown) {
      this.dragging = true;
      this.startPos = (event instanceof MouseEvent ? event.pageX : event.changedTouches[0].pageX);
    }

    this.prevPanelElement = this.gutterElement.previousElementSibling as HTMLElement;
    this.nextPanelElement = this.gutterElement.nextElementSibling as HTMLElement;

    if (isKeyDown) {
      this.prevPanelSize = getOuterWidth(this.prevPanelElement, true);
      this.nextPanelSize = getOuterWidth(this.nextPanelElement, true);
    } else {
      this.prevPanelSize = (100 * getOuterWidth(this.prevPanelElement, true)) / this.size;
      this.nextPanelSize = (100 * getOuterWidth(this.nextPanelElement, true)) / this.size;
    }

    this.prevPanelIndex = index;
    this.gutterElement.classList.add('splitter-gutter-resizing');
    this.gutterElement.setAttribute('data-p-gutter-resizing', 'true');
    this.containerViewChild?.nativeElement.classList.add('splitter-resizing')
    this.containerViewChild?.nativeElement.setAttribute('data-p-resizing', 'true');
  }

  onResize(event: MouseEvent, step: number = 0, isKeyDown?: boolean) {
    let newPos, newPrevPanelSize, newNextPanelSize;

    if (isKeyDown) {
      if (this.horizontal()) {
        newPrevPanelSize = (100 * (this.prevPanelSize + step)) / this.size;
        newNextPanelSize = (100 * (this.nextPanelSize - step)) / this.size;
      } else {
        newPrevPanelSize = (100 * (this.prevPanelSize - step)) / this.size;
        newNextPanelSize = (100 * (this.nextPanelSize + step)) / this.size;
      }
    } else {
      if (this.horizontal()) newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
      else newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;

      newPrevPanelSize = (this.prevPanelSize as number) + newPos;
      newNextPanelSize = (this.nextPanelSize as number) - newPos;
    }

    this.prevSize = parseFloat(`${newPrevPanelSize}`).toFixed(4);

    if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
      (this.prevPanelElement as HTMLElement).style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
      (this.nextPanelElement as HTMLElement).style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
      this._panelSizes[this.prevPanelIndex as number] = newPrevPanelSize;
      this._panelSizes[(this.prevPanelIndex as number) + 1] = newNextPanelSize;
    }
    this.onResizeEnd.emit({ originalEvent: event, sizes: this._panelSizes });
  }

  resizeEnd() {
    // if (this.isStateful()) {
    //   this.saveState();
    // }
    this.gutterElement.classList.remove('splitter-gutter-resizing');
    this.containerViewChild?.nativeElement.classList.remove('splitter-resizing')
    this.clear();
  }

  onGutterMouseDown(event: MouseEvent, index: number) {
    this.resizeStart(event, index);
    this.bindMouseListeners();
  }

  onGutterTouchStart(event: TouchEvent, index: number) {
    if (event.cancelable) {
      this.resizeStart(event, index);
      this.bindTouchListeners();

      event.preventDefault();
    }
  }

  onGutterTouchMove(event: any) {
    this.onResize(event);
    event.preventDefault();
  }

  onGutterTouchEnd(event: TouchEvent) {
    this.resizeEnd();
    this.unbindTouchListeners();

    if (event.cancelable) event.preventDefault();
  }

  repeat(event: any, index: number, step: any) {
    this.resizeStart(event, index, true);
    this.onResize(event, step, true);
  }

  setTimer(event: any, index: number, step: any) {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.repeat(event, index, step);
    }, 40);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onGutterKeyUp(event: any) {
    this.clearTimer();
    this.resizeEnd();
  }

  onGutterKeyDown(event: any, index: number) {
    switch (event.code) {
      case 'ArrowLeft': {
        if (this.layout === 'horizontal') {
          this.setTimer(event, index, this.step * -1);
        }

        event.preventDefault();
        break;
      }

      case 'ArrowRight': {
        if (this.layout === 'horizontal') {
          this.setTimer(event, index, this.step);
        }

        event.preventDefault();
        break;
      }

      default:
        //no op
        break;
    }
  }

  validateResize(newPrevPanelSize: number, newNextPanelSize: number) {
    const prevPanelIndex = this.prevPanelIndex as number;
    if (prevPanelIndex > -1 && this.minSizes.length > prevPanelIndex && this.minSizes[prevPanelIndex] && this.minSizes[prevPanelIndex] > newPrevPanelSize) {
      return false;
    }

    const nextPanelIndex = (this.prevPanelIndex as number) + 1;
    if (this.minSizes.length > nextPanelIndex && this.minSizes[nextPanelIndex] && this.minSizes[nextPanelIndex] > newNextPanelSize) {
      return false;
    }

    return true;
  }

  bindMouseListeners() {
    if (!this.mouseMoveListener) {
      this.mouseMoveListener = this.renderer.listen(this.document, 'mousemove', (event) => {
        this.onResize(event);
      });
    }

    if (!this.mouseUpListener) {
      this.mouseUpListener = this.renderer.listen(this.document, 'mouseup', () => {
        this.resizeEnd();
        this.unbindMouseListeners();
      });
    }
  }

  bindTouchListeners() {
    if (!this.touchMoveListener) {
      this.touchMoveListener = this.renderer.listen(this.document, 'touchmove', (event) => {
        this.onResize(event.changedTouches[0]);
      });
    }

    if (!this.touchEndListener) {
      this.touchEndListener = this.renderer.listen(this.document, 'touchend', (event) => {
        this.resizeEnd();
        this.unbindTouchListeners();
      });
    }
  }

  unbindMouseListeners() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
      this.mouseMoveListener = null;
    }

    if (this.mouseUpListener) {
      this.mouseUpListener();
      this.mouseUpListener = null;
    }
  }

  unbindTouchListeners() {
    if (this.touchMoveListener) {
      this.touchMoveListener();
      this.touchMoveListener = null;
    }

    if (this.touchEndListener) {
      this.touchEndListener();
      this.touchEndListener = null;
    }
  }

  clear() {
    this.dragging = false;
    this.size = 0;
    this.startPos = 0;
    this.prevPanelElement = null;
    this.nextPanelElement = null;
    this.prevPanelSize = 0;
    this.nextPanelSize = 0;
    this.gutterElement = null;
    this.prevPanelIndex = null;
  }

  isNested() {
    if (this.el.nativeElement) {
      let parent = this.el.nativeElement.parentElement;
      while (parent && !parent.classList.contains('splitter')) {
        parent = parent.parentElement;
      }

      return parent !== null;
    } else {
      return false;
    }
  }

  // isStateful() {
  //   return this.stateKey != null;
  // }

  // getStorage() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     switch (this.stateStorage) {
  //       case 'local':
  //         return this.window.localStorage;

  //       case 'session':
  //         return this.window.sessionStorage;

  //       default:
  //         throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
  //     }
  //   } else {
  //     throw new Error('Storage is not a available by default on the server.');
  //   }
  // }

  // saveState() {
  //   this.getStorage().setItem(this.stateKey as string, JSON.stringify(this._panelSizes));
  // }

  // restoreState() {
  //   const storage = this.getStorage();
  //   const stateString = storage.getItem(this.stateKey as string);

  //   if (stateString) {
  //     this._panelSizes = JSON.parse(stateString);
  //     let children = [...(this.containerViewChild as ElementRef).nativeElement.children].filter((child) => child.classList.contains('splitter-panel'));
  //     children.forEach((child, i) => {
  //       child.style.flexBasis = 'calc(' + this._panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
  //     });

  //     return true;
  //   }

  //   return false;
  // }

  containerClass() {
    return {
      'splitter p-component': true,
      'splitter-horizontal': this.layout === 'horizontal',
    };
  }

  panelContainerClass() {
    return {
      'splitter-panel': true,
      'splitter-panel-nested': true
    };
  }

  gutterStyle() {
    return { width: this.gutterSize + 'px' };
  }

  horizontal() {
    return this.layout === 'horizontal';
  }
}