import { Injectable, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class GitHubHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('github.com')) {
            req = req.clone({
                setHeaders: {
                    // Authorization: `token ${this.authService.profile.githubToken}`,
                    // Accept: 'application / vnd.github.v3 + json'
                }
            });
        }

        return next.handle(req);
    }

}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GitHubHttpInterceptor,
            multi: true
        }
    ]
})
export class GitHubHttpInterceptorModule {
}
