import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { roles } from './role.model';
import { users } from './user.model'


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  getroles() {
    throw new Error('Method not implemented.');
  }

  url="http://localhost:3000/api/roles/" ;
  
  private roles: roles[] = [];// variable for storing data
  private rolesUpdated = new Subject<roles[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  rolesUrl: string;
  constructor(private http: HttpClient) { }

  addroles(Job_title: string, Responsibility: string, Position: number, Name:string){    
    const role: roles = { _id: null, Job_title: Job_title, Responsibility: Responsibility, Position:Position, Name:Name};
    this.http
    .post<{message: string}>("http://localhost:3000/api/roles/add", role)
    .subscribe(()=>{
      this.roles.push(role);
      this.rolesUpdated.next([...this.roles]);
    });
  }

  getrole(): Observable<users> {
    return this.http.get<users>(this.rolesUrl + '/api/roles');
   }
  
   getAllroles(){
    this.http
      .get<{message: string, roles: roles[]}>("http://localhost:3000/api/roles/list")
      .subscribe(roleData=>{
        this.roles = roleData.roles;
        this.rolesUpdated.next([...this.roles]);
      });
  }
  getAllroleadmin(){
    this.http
      .get<{message: string, roles: roles[]}>("http://localhost:3000/api/roles/listadmin")
      .subscribe(roleData=>{
        this.roles = roleData.roles;
        this.rolesUpdated.next([...this.roles]);
      });
  }

  deleterole(roleId: string){
    this.http
      .delete("http://localhost:3000/api/roles/"+roleId)
      .subscribe(()=>{
        const updatedroles = this.roles.filter(role=>role._id != roleId);
        this.roles = updatedroles;
        this.rolesUpdated.next([... this.roles]);
      });
  }

  viewuser(roleId: string){
    return this.http.get(this.url + roleId);
    
}

updateuser(roleId:string, updatedData:any){
return this.http.put(this.url + roleId, updatedData).subscribe(()=>{
  this.roles.push(updatedData);
  this.rolesUpdated.next([...this.roles]);
})
}

//the line below allows us to listen to this service
getrolesUpdateListener(){
  return this.rolesUpdated.asObservable();
}
}

