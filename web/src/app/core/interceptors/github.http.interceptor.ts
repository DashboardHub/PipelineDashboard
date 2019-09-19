// Core modules
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

// Dashboard hub services
import { AuthenticationService } from '@core/services/index.service';

@Injectable()
export class GitHubHttpInterceptor implements HttpInterceptor {

  /**
   * Life cycle method
   * @param authService AuthenticationService instance
   */
  constructor(private authService: AuthenticationService) {
  }

  /**
   * Method for sending github token in all github requests
   * @param req HttpRequest instance
   * @param next HttpHandler instance
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('github.com')) {
      req = req.clone({
        setHeaders: {
          Authorization: `token ${this.authService.profile.oauth.githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
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
      multi: true,
    },
  ],
})
export class GitHubHttpInterceptorModule {
}
