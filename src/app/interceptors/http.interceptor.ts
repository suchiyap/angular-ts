import { Injectable, Injector, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/auth/login/login.service';
import Swal from 'sweetalert2';


// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {

//   constructor(private loginService: LoginService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Intercepting request'); // Debug log
//     const authToken = this.loginService.getAuthToken();
//     console.log('Auth token:', authToken); // Debug log
//     const headers = req.headers
//       .set('Content-Type', 'application/json')
//       .set('Authorization', `${authToken}`);

//     const clonedRequest = req.clone({ headers });
//     return next.handle(clonedRequest);
//   }
// }

export const HeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);
  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${loginService.getAuthToken()}`
    }
  });
  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
          // message session expired and logout
          loginService.logout();
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      Swal.fire({
        text: err?.error.message,
        icon: 'error',
      });
      // Re-throw the error to propagate it further
      return throwError(() => err); 
    }),
    
  );
};
