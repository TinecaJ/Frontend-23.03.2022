import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {  ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../service_group/users.service';
import { RolesService } from '../service_group/roles.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { roles } from '../service_group/role.model';



export interface user{
  Job_title: string;
  Responsibility: string;
  Position:number;
  
}


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  name: string="";
  showOrgRoleCard = false;
  
  roleform: FormGroup;
  

 
  constructor(
    private usersService: UsersService, 
    private rolesService:RolesService,
    private fb: FormBuilder,
    private httpClient: HttpClient) { 
      
      this.roleform=fb.group({
        Job_title: new FormControl('',[
          Validators.required
        ]),
        Responsibility: new FormControl('',[
          Validators.required
        ]),
         Position:new FormControl('',[
          Validators.required
        ]),
         Name:new FormControl('',[
          Validators.required
        ])
         
      })
    }
 
  
  
  private rolesSub: Subscription;
    roles: roles[] = [];


    
  ngOnInit(): void {
    this.rolesService.getAllroles(); 
    this.rolesSub = this.rolesService.getrolesUpdateListener()
    .subscribe((roles: roles[])=>{
      this.roles = roles;
    });
  }

  onAdd():void{
    this.rolesService.addroles(
      this.roleform.value.Job_title, 
      this.roleform.value.Responsibility, 
      this.roleform.value.Position, 
      this.roleform.value.Name); 
    
  }

  
  onDelete(roleId: string){
    this.rolesService.deleterole(roleId);
  }

  showOrgRoleFun(){
    this.showOrgRoleCard =true
   }
 
   hideOrgRoleFun(){
     this.showOrgRoleCard =false
   }


}

