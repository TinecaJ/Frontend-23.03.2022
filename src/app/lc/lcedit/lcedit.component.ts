import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LCsService } from 'src/app/service_group/lcs.service';

@Component({
  selector: 'app-lcedit',
  templateUrl: './lcedit.component.html',
  styleUrls: ['./lcedit.component.css']
})
export class LceditComponent implements OnInit {
  LCId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route :Router,
    private lcservice: LCsService
  ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.LCId=data['id'];
    });

    if(this.LCId!==''){
      //View the user data 
         this.lcservice.viewuser(this.LCId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
            console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Policy: new FormControl(this.userdetails.Policy),
              Integration: new FormControl(this.userdetails.Integration),
              AvailabilityofResources: new FormControl(this.userdetails.AvailabilityofResources),
              Communication: new FormControl(this.userdetails.Communication),
              Improvement: new FormControl(this.userdetails.Improvement),
              Achievements: new FormControl(this.userdetails.Achievements),
              Demo: new FormControl(this.userdetails.Demo),
              Other: new FormControl(this.userdetails.Other),
              Leadership: new FormControl(this.userdetails.Leadership)
              

            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.lcservice.updateuser(this.LCId,this.edituserform.value);
     console.log(this.edituserform.value);
     alert('User Updated');
     this.route.navigate(['/lc']);
    }
  

}
