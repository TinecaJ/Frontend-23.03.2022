import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service_group/auth.service';
import { users } from '../service_group/user.model';
import { UsersService } from '../service_group/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: users[] = [];
  constructor(
    private authService:AuthService,
    private router: Router,
    private usersservice: UsersService
    ) { }

  
  
  
  ngOnInit(): void {

  }

onSignupButtonClicked(email: string, password: string) {
  this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
    if (res.status === 200) {
      // we have logged in successfully
      alert('Account Created Successfully');
      this.router.navigate(['/login']);
     
    }
    console.log(res);
    
  });
}}
