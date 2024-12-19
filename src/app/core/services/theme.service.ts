import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private colorScheme: string = 'light';
  private colorSchemePrefix = 'color-scheme-';
  systemPreferance = true;
  currentTheme = signal('light');
  currentThemeObserver = new Subject<string>();
  constructor() {}

  _detectPrefersColorScheme() {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      this._setColorScheme(window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light')
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      this._setColorScheme('light');
    }
  }

  _setColorScheme(scheme: string) {
    this.colorScheme = scheme;
    this.currentTheme.set(scheme);
    this.currentThemeObserver.next(scheme);
    // Save prefers-color-scheme to localStorage
    localStorage.setItem('prefers-color', scheme);
  }

  _getColorScheme() {
    const localStorageColorScheme = localStorage.getItem('prefers-color');

    if(localStorageColorScheme) {
      this._setColorScheme(localStorageColorScheme);
    } else if(this.systemPreferance ) {
      this._detectPrefersColorScheme();
    } else {
      this._setColorScheme('light');
    }
  }

  load() {
    this._getColorScheme();
    if(this.colorScheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  update(scheme: string) {
    this._setColorScheme(scheme);
    document.body.classList.toggle('dark');
  }

  currentActive() {
    return this.colorScheme;
  }
}
