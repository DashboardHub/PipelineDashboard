import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.substr(0, 5) === '{api}') {
      req = req.clone({
        url: environment.api + req.url.substr(5)
      });
    }

    return next.handle(req);
  }

}
