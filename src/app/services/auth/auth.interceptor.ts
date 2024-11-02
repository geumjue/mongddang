import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');  // localStorage에서 토큰을 가져옴
    if (token) {
      // 토큰이 있으면 Authorization 헤더를 추가한 새로운 요청을 만듦
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);  // 수정된 요청을 처리
    }
    return next.handle(req);  // 토큰이 없으면 원본 요청을 그대로 처리
  }
}
