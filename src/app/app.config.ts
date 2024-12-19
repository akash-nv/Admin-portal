import { ApplicationConfig, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { defer } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { DayjsDateAdapter, DEFAULT_DATE_FORMATS } from './core/helpers/dayjs-adaptor.helper';

const QuillBetterTable$ = defer(() => import('quill-better-table').then(m => m.default))

const customModules = [
  { path: 'modules/better-table', implementation: QuillBetterTable$ }
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideNativeDateAdapter(), 
    { provide: DateAdapter, useClass: DayjsDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DEFAULT_DATE_FORMATS },
  ],
};
