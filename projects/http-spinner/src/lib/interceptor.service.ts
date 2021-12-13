import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {HttpProgressState, HttpSpinnerService} from './http-spinner.service';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private exceptions: string[] = [];

  constructor(
    private httpStateService: HttpSpinnerService) {

  }

  /**
   * Intercepts all requests
   * - in case of an error (network errors included) it repeats a request 3 times
   * - all other error can be handled an error specific case
   * and redirects into specific error pages if necessary
   *
   * There is an exception list for specific URL patterns that we don't want the application to act
   * automatically
   *
   * The interceptor also reports back to the httpStateService when a certain requests started and ended
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.exceptions.every((term: string) => request.url.indexOf(term) === -1)) {
      return next.handle(request).pipe(tap((response: any) => {
        },
        (error) => {
        }));
    }

    this.httpStateService.state.next({
      url: request.url,
      state: HttpProgressState.start
    });
    this.httpStateService.states.push({
      url: request.url,
      state: HttpProgressState.start
    });

    return next.handle(request).pipe(finalize(() => {
      this.httpStateService.state.next({
        url: request.url,
        state: HttpProgressState.end
      });
      this.httpStateService.states = this.httpStateService.states.filter(y => y.url !== request.url);

    }));
  }
}
