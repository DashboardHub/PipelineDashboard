import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(null, (err) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
          case 403:
          case 404:
            this.router.navigate(['/'])
              .then(() => this.snackBar.open('An ERROR occured please try again', null, { duration: 5000 }));
            break;
          default:
            this.snackBar.open(err.message, null, { duration: 5000 });
            break;
        }
      }
    });
  }

}
