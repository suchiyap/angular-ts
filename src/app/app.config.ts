import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideClientHydration(),
    // provideHttpClient(),
    //   {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HeaderInterceptor,
    //     multi: true,
    //   },
      provideHttpClient(withInterceptors([HeaderInterceptor])), provideAnimationsAsync(),
  ],
};
