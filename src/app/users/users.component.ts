import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject, Subscription} from 'rxjs';
import {  ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../service_group/users.service';
import { RolesService } from '../service_group/roles.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

export interface roles {
  Job_title: String,
  Responsibility: String,
  Position:Number,
  Name:String,
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  role: roles[] = [];
  
  constructor(private usersService: UsersService,private rolesService: RolesService) { }

  ngOnInit(): void {
    this.rolesService
           .getrole()
           .subscribe((response) => {
             this.rolesService = response?.role?.map(res => {
               return {
                 _id: res.id,
                 Job_title:res.Job_title,
                 Responsibility: res.Responsibility,
                 Position: res.Position,
                 Name:res.Name,

                 
               }
             }); 
       });
  }

}
