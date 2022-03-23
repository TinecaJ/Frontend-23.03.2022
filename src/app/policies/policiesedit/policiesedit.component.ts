import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoliciesService } from 'src/app/service_group/policies.service';

@Component({
  selector: 'app-policiesedit',
  templateUrl: './policiesedit.component.html',
  styleUrls: ['./policiesedit.component.css']
})
export class PolicieseditComponent implements OnInit {
  POLId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route :Router,
    private policyservice: PoliciesService
  ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.POLId=data['id'];
    });

    if(this.POLId!==''){
      //View the user data 
         this.policyservice.viewuser(this.POLId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Objectives: new FormControl(this.userdetails.Objectives),
              Appropriate: new FormControl(this.userdetails.Appropriate),
              CommitmentReq: new FormControl(this.userdetails.CommitmentReq),
              CommitmentImprov: new FormControl(this.userdetails.CommitmentImprov),
              Available: new FormControl(this.userdetails.Available),
              CommunicatedOrg: new FormControl(this.userdetails.CommunicatedOrg),
              Othertxt: new FormControl(this.userdetails.Othertxt)
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.policyservice.updateuser(this.POLId,this.edituserform.value);
     console.log(this.edituserform.value);
     alert('User Updated');
     this.route.navigate(['/policies']);
    
  }

}
