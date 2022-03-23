import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportsService } from 'src/app/service_group/supports.service';


@Component({
  selector: 'app-supportedit',
  templateUrl: './supportedit.component.html',
  styleUrls: ['./supportedit.component.css']
})
export class SupporteditComponent implements OnInit {

  supportId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private supportservice:SupportsService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.supportId=data['id'];
    });

    if(this.supportId!==''){
      //View the user data 
         this.supportservice.viewuser(this.supportId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Resources: new FormControl(this.userdetails.Resources),
              Resourcestick: new FormControl(this.userdetails.Resourcestick),
              Competence: new FormControl(this.userdetails.Competence),
              Competencetick: new FormControl(this.userdetails.Competencetick),
              Awareness: new FormControl(this.userdetails.Awareness),
              Awarenesstick: new FormControl(this.userdetails.Awarenesstick),
              Communication: new FormControl(this.userdetails.Communication),
              Comtick: new FormControl(this.userdetails.Comtick)
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.supportservice.updateuser(this.supportId,this.edituserform.value);
     console.log(this.edituserform.value);
     alert('User Updated');
     this.route.navigate(['/support']);
    }
  }
