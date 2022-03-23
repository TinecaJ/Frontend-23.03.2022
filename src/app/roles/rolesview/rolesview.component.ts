import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'src/app/service_group/roles.service';

@Component({
  selector: 'app-rolesview',
  templateUrl: './rolesview.component.html',
  styleUrls: ['./rolesview.component.css']
})
export class RolesviewComponent implements OnInit {
  roleId:string='';
  userdetails:any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private rolesservice: RolesService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.roleId=data['id'];
    })
    
    this.rolesservice.viewuser(this.roleId).subscribe(data=>{
        this.userdetails= data;
    })


}

}
