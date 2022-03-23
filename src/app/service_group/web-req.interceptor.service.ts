import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, empty, Observable, Subject, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor{
  refreshingAccessToken: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  
  constructor(private authService: AuthService) { }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken();

    if (token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    request = this.addAuthHeader(request);

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

     if(error.status===401 && !this.refreshingAccessToken){
      // refresh the access token
      return this.refreshAccessToken()
      .pipe(
        switchMap(() => {
          request = this.addAuthHeader(request);
          return next.handle(request);
        }),
        catchError((err: any) => {
          console.log(err);
          this.authService.logout();
          return empty();
        })
      )
  }

        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
   /* if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else { */

      this.refreshingAccessToken = true;
      
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          console.log("Access Token Refreshed!");
         
         // this.accessTokenRefreshed.next(); 
        })
      )
    
    

  }


  intercept1(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            this.authService.logout();
            //location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }))
}
}