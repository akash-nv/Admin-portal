import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from "@angular/core";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"],
    imports: [
    ],
    standalone: true
})
export class PaginationComponent implements OnChanges {
  readonly breakpointObserver = inject(BreakpointObserver);

  @Input() current: number = 0;
  @Input() total: number = 0;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  desktopView = true;
  public pages: number[] = [];

  constructor() {
    this.breakpointObserver
        .observe(['(min-width: 640px)'])
        .subscribe((state: BreakpointState) => {
          if (state.matches) {
            this.desktopView = true;

          } else {
            this.desktopView = false;
          }
        });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (
        (changes["current"]?.currentValue) ||
        (changes["total"]?.currentValue)
    ) {
      this.pages = this.getPages(this.current, this.total);
    }
  }

  public onGoTo(page: number): void {
    this.changePage.emit(page);
  }

  public onNext(): void {
    if(this.current < this.total) {
      this.current += 1;
      this.changePage.emit(this.current);
    }
  }

  public onPrevious(): void {
    if(this.current > 1) {
      this.current -= 1;
      this.changePage.emit(this.current);
    }
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 5) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 3) {
      if (current >= total - 2) {
        return [1, -1, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, -1, total];
  }
}
