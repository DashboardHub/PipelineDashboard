import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.substr(0, 5) === '{api}') {
            req = req.clone({
                url: environment.api + req.url.substr(5)
            });
        }

        return next.handle(req);
    }

}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiHttpInterceptor,
            multi: true
        }
    ]
})
export class ApiHttpInterceptorModule {
}
