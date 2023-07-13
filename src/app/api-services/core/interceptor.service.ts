import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotifyService } from '../common/notify.service';
import { ERRORS } from '../../helpers/errors';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private router: Router,
    private notify: NotifyService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', 'text/plain'),
    })

    return next.handle(request).pipe(tap(() => {
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 503) {
          this.router.navigate(['undermaintenance']);
          this.notify.error(ERRORS.COMMON)
        } else {
          if (err?.error?.msg) {
            this.notify.error(err?.error?.msg)
          } else {
            this.notify.error(err?.message)
          }
        }
      }
    }
    ));
  }
}
