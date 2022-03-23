import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationsService } from 'src/app/service_group/operations.service';

@Component({
  selector: 'app-operationedit',
  templateUrl: './operationedit.component.html',
  styleUrls: ['./operationedit.component.css']
})
export class OperationeditComponent implements OnInit {
  operationId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private operationservice: OperationsService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.operationId=data['id'];
    });

    if(this.operationId!==''){
      //View the user data 
         this.operationservice.viewoperation(this.operationId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              PndI: new FormControl(this.userdetails.PndI),
              PItick: new FormControl(this.userdetails.PItick),
              RAndI: new FormControl(this.userdetails.RAndI),
              AItick: new FormControl(this.userdetails.AItick),
              RTndI: new FormControl(this.userdetails.RTndI),
              RTItick: new FormControl(this.userdetails.RTItick),
              
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.operationservice.updateuser(this.operationId,this.edituserform.value);
     console.log(this.edituserform.value);
     alert('User Updated');
     this.route.navigate(['/operation']);
    }
  }
