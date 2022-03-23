import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ImprovementsService } from 'src/app/service_group/improvements.service';

@Component({
  selector: 'app-improvementedit',
  templateUrl: './improvementedit.component.html',
  styleUrls: ['./improvementedit.component.css']
})
export class ImprovementeditComponent implements OnInit {
  improvementId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private improvementservice: ImprovementsService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.improvementId=data['id'];
    });

    if(this.improvementId!==''){
      //View the user data 
         this.improvementservice.viewoperation(this.improvementId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Text: new FormControl(this.userdetails.Text),
              CorrectiveAction: new FormControl(this.userdetails.CorrectiveAction),
              
              
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.improvementservice.updateuser(this.improvementId,this.edituserform.value);
     console.log(this.edituserform.value);
     alert('User Updated');
     this.route.navigate(['/improvement']);
    }
  }

