import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(null, (err) => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
          case 403:
            this.router.navigate(['/login']);
            break;
          case 404:
            this.router.navigate(['/']);
            break;
          default:
            this.snackBar.open(err.message, err.status.toString(), { duration: 5000 });
            break;
        }
      }
    });
  }

}
