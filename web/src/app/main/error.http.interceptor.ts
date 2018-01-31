import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import { Router } from "@angular/router";

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do(null, (err) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 401:
          case 403:
            this.router.navigate(['/login']);
            break;
          case 404:
            this.router.navigate(['/']);
            break;
        }
      }
    });
  }

}
