import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { users } from './user.model';
import { roles } from './role.model';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: users[] = [];// variable for storing data
  private usersUpdated = new Subject<users[]>();
  constructor(private http: HttpClient) { }
  
  addnew(Name:string, ){    
    const user: users = {
      _id: null,
      Name: Name,
      role:'',
      Email_Address: '',
      Password: '',
      Signature: '',
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/users/add", user)
    .subscribe(()=>{
      this.users.push(user);
      this.usersUpdated.next([...this.users]);
    });
  }  
}
