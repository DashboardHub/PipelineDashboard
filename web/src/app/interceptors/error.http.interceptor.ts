import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(undefined, (error: any) => {
      if (error instanceof HttpErrorResponse) {
        switch (error.status) {
          case 401:
          case 403:
          case 404:
            this.router.navigate(['/'])
              .then(() => this.snackBar.open('An ERROR occured please try again', undefined, { duration: 5000 }));
            break;
          default:
            this.snackBar.open(error.message, undefined, { duration: 5000 });
            break;
        }
      }
    });
  }
}
