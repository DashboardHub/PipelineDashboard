// Core modules
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

// Rxjs operators
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  /**
   * Life cycle method
   * @param router Router instance
   * @param snackBar Snackbar instance
   */
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Showing error in request
   * @param req HttpRequest instance
   * @param next HttpHandler instance
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(undefined, (error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        let message: string = '';
        switch (error.status) {
          case 401:
          case 403:
            message = 'Permission denied. Please try again.';
            break;
          case 404:
            message = 'Not found. Please try again.';
            break;
          default:
            this.snackBar.open(error.message, undefined, { duration: 5000 });
            break;
        }

        this.router.navigate(['/'])
          .then(() => this.snackBar.open(message, undefined, { duration: 5000 }));
      }
    }));
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true,
    },
  ],
})
export class ErrorHttpInterceptorModule {
}
