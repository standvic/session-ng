import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import {auth} from "../config";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authInfo = JSON.parse(localStorage.getItem('authInfo'))
    if (authInfo && authInfo.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authInfo.access_token}`
        }
      })
    }

    return next.handle(request);
  }
}
