import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Route,Router } from '@angular/router';
import { ContextsService } from 'src/app/service_group/contexts.service';


@Component({
  selector: 'app-contextedit',
  templateUrl: './contextedit.component.html',
  styleUrls: ['./contextedit.component.css']
})
export class ContexteditComponent implements OnInit {
  contextId:any;
  userdetails:any;
  edituserform: FormGroup = new FormGroup({});
  dataloaded: boolean;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private formbuilder: FormBuilder, 
    private contextservice:ContextsService,
    private route:Router,
    ) { }

  ngOnInit(): void {
    this.dataloaded=false;
    this.activatedRoute.params.subscribe(data=>{
      this.contextId=data['id'];
    });

    if(this.contextId!==''){
      //View the user data 
         this.contextservice.viewuser(this.contextId)
         .toPromise()
         .then(data=>{
            this.userdetails= data;
           Object.assign(this.userdetails, data);
           // console.log(this.userdetails);
      
            //Editable form here
            this.edituserform= this.formbuilder.group({
              Context: new FormControl(this.userdetails.Context),
              Interested_Parties: new FormControl(this.userdetails.Interested_Parties),
              Scope: new FormControl(this.userdetails.Scope),
              
            
            })
            this.dataloaded=true;
          
         })
         .catch(err=>{
           console.log(err);
         })
    }
  }
    updateuser(){
      this.contextservice.updateuser(this.contextId,this.edituserform.value);
     console.log(this.edituserform.value)
     alert('User Updated');
     this.route.navigate(['/contexts']);
    }
  }

