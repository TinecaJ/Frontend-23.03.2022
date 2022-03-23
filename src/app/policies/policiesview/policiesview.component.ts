import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoliciesService } from 'src/app/service_group/policies.service';

@Component({
  selector: 'app-policiesview',
  templateUrl: './policiesview.component.html',
  styleUrls: ['./policiesview.component.css']
})
export class PoliciesviewComponent implements OnInit {
  POLId:string='';
  userdetails:any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private policyservice: PoliciesService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.POLId=data['id'];
    })
    
    this.policyservice.viewuser(this.POLId).subscribe(data=>{
        this.userdetails= data;
    })
  }

}
