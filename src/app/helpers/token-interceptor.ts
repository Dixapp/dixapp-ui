import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      },
      url: environment.apiUrl + request.url
    });


    return next.handle(request).do((event: HttpEvent<any>)=>{}, (err: any) => {
      console.log("error");
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          window.location.href = '/login';
        }
      }
    });
  }

  getToken(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      return currentUser.token
    } else return '';
  }
}

export const interceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
