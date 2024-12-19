import { Component, inject, Renderer2, signal, WritableSignal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  title = 'Admin-portal';
  loadingComponent: WritableSignal<boolean> = signal(false);

  constructor() {
    this.themeService.load();
    this.router.events.subscribe((e: any) => {
        if(e instanceof NavigationStart) {
          this.loadingComponent.set(true);
        } else if ( e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError){ 
          this.loadingComponent.set(false);
        }
      })
  }
}
