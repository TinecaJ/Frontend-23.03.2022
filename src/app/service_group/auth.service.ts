import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs/operators';
import { users } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenres: string;
  finaldata: any;
  apiUrl:any = "http://localhost:3000/api" 
  constructor(
    private webService: WebRequestService, 
    private router: Router, 
    private http: HttpClient) { }
   
     login(email: string, password: string) {
      // let API_URL =`${this.apiUrl}/users/users/login`;
      // return this.http.post( API_URL,payload)
      
      return this.webService.login(email, password).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'), res.body);
          console.log("LOGGED IN!");
        })
      )
    }

   

    signup(email: string, password: string) {
      return this.webService.signup(email, password).pipe(
        shareReplay(),
        tap((res: HttpResponse<any>) => {
          // the auth tokens will be in the header of this response
          this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'),res.body);
          console.log("Account Created");
        })
      )
    }

    logout() {
      this.removeSession();
      this.router.navigate(['/login']);
  
      //this.router.navigate(['/login']);
    }

   /* Getrolebytoken(logintoken:any){
      //get access token
    let _token= logintoken.split('.')[1];
    this.tokenres=JSON.parse(atob(_token));
    console.log(this.tokenres);
    }
*/
    private setSession(userId: string, accessToken: string, refreshToken: string, userData:any) {
      localStorage.setItem('user-id', userId);
      localStorage.setItem('x-access-token', accessToken);
      localStorage.setItem('x-refresh-token', refreshToken);
      localStorage.setItem('userData',JSON.stringify(userData) )
      
    }
  
    private removeSession() {
      // localStorage.removeItem('user-id');
      // localStorage.removeItem('x-access-token');
      // localStorage.removeItem('x-refresh-token');
      localStorage.clear()
    }
  

    setRoles(roles: []) {
      localStorage.setItem('roles', JSON.stringify(roles));
    }
  
     getRoles(): [] {
      return JSON.parse(localStorage.getItem('roles'));
    }

   isLoggedIn() {
      return this.getRoles() && this.getAccessToken();
    }
    
    getAccessToken() {
      return localStorage.getItem('x-access-token');
    }
    setAccessToken(accessToken: string) {
      localStorage.setItem('x-access-token', accessToken)
    }
    getRefreshToken() {
      return localStorage.getItem('x-refresh-token');
    }

    getUserId() {
      return localStorage.getItem('user-id');
    }

    getAccessTok() {
        //get access token
     
     
     
    }

    useraccess(){
      //get access token
     const logintoken= localStorage.getItem('x-access-token')|| ``;


      //extracted the payload by obtaining the second part of the access token
      const extractedtoken= logintoken.split('.')[1];
      const extract= atob(extractedtoken);
      const finaldata= JSON.parse(extract);
     
     if(finaldata._id==Object('622801013b5edef036ca5efc')){
        return true;
      
      } 
      else
      alert('Access to this page is prohibited');
      this.router.navigate(['/contexts']);
      return false;
      
      
    }




    /// This Function is used to obtain a refreshed access token
    getNewAccessToken() {
      return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          'x-refresh-token': this.getRefreshToken(),
          '_id': this.getUserId()
        },
        //this is to obeserve whether the access token has expired 
        observe: 'response'
      }).pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get('x-access-token'));
        })
      )
    }
  

}
