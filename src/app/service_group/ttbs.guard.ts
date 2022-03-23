import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TTBSGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private route: Router,
    ){}
 
  
  canActivate() {
    var userData:any = JSON.parse(localStorage.getItem('userData'))
    if(userData.role == "admin"){
      return true
    } else {
      this.route.navigate(['/contexts'])
      return false
    }
    // this.authservice.useraccess();
    // return true;
   /* if(this.authservice.useraccess())
    return true;
    else
    this.route.navigate[('/contexts')]
    return false;
  } */
/*
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authservice.currentUserValue;
    if (userId) {
        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
        }

        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
*/
  }
}

