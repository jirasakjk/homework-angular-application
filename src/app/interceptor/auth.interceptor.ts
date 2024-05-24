import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service/auth-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: AuthServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.loginService.getAuthToken();

    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}`
      });
      const clonedRequest = req.clone({ headers });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}