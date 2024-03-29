import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {tap} from 'rxjs/operators';
import {RequestCache} from './request-cache';
import {Observable, of} from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') {
      console.log('NO ES UN GET');
      return next.handle(req);
    } else {
      const cachedResponse = this.cache.get(req);
      return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
    }
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCache): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          cache.put(req, event);
        }
      })
    );
  }
}
