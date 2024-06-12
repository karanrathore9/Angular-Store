import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localStorage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localstorageToken: LocalstorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIUrl = request.url.startsWith(environment.apiUrl);

    if (token && isAPIUrl) {
      console.log('Token found, setting headers'); // Debug statement
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      console.log('No token found or not an API URL'); // Debug statement
    }

    return next.handle(request);
  }
}
