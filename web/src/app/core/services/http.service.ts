// Core modules
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs operators
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  /**
   * Constructor
   *
   * @param 'httpClient'
   */
  constructor(
    protected httpClient: HttpClient
  ) { }

  /**
   * Standardized RMS GET request
   *
   * @param 'uri'
   * @param 'options'
   */
  get(uri: string): any {
    return this.httpClient
      .get(uri, { responseType: 'text' }).pipe(catchError(
        this.handleError
      ));
  }

  /**
   * Handle general errors from the API
   *
   * @param 'err'
   * @returns returns
   */
  private handleError(err: any): Observable<Error> {

    return throwError(err);
  }
}
