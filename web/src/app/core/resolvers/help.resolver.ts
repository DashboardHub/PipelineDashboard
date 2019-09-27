// Angular modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

// 3rd party
import { of, Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

/**
 * Help resolver
 */
@Injectable({
  providedIn: 'root',
})
export class HelpResolver implements Resolve<String> {

  /**
   * Life cycle method
   * @param router Router
   * @param http HttpClient
   */
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  /**
   * Finds the help content in resolver
   * @param route ActivatedRouteSnapshot
   */
  resolve(route: ActivatedRouteSnapshot): Observable<String> {
    const path: string = route.params.path;

    return this.http.get(`/assets/help/${path}.md`, { responseType: 'text' }).pipe(
      take(1),
      catchError(() => {
        this.router.navigate(['/help']);

        return of('');
      })
    );
  }
}
