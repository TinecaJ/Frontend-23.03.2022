import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/service_group/roles.service';

@Component({
  selector: 'app-rolesedit',
  templateUrl: './rolesedit.component.html',
  styleUrls: ['./rolesedit.component.css']
})
export class RoleseditComponent implements OnInit {
  roleId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private rolesservice:RolesService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.roleId=data['id'];
    });

    if(this.roleId!==''){
      //View the user data 
         this.rolesservice.viewuser(this.roleId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Job_title: new FormControl(this.userdetails.Job_title),
              Responsibility: new FormControl(this.userdetails.Responsibility),
              Position: new FormControl(this.userdetails.Position),
             
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.rolesservice.updateuser(this.roleId,this.edituserform.value);
     console.log(this.edituserform.value)
     alert('User Updated');
     this.route.navigate(['/roles']);
    }
  }

