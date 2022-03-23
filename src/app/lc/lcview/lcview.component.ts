import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LCsService } from 'src/app/service_group/lcs.service';

@Component({
  selector: 'app-lcview',
  templateUrl: './lcview.component.html',
  styleUrls: ['./lcview.component.css']
})
export class LcviewComponent implements OnInit {
  LCId:string='';
  userdetails:any;
  constructor(
    private lcservice: LCsService,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.LCId=data['id'];
    })
    
    this.lcservice.viewuser(this.LCId).subscribe(data=>{
        this.userdetails= data;
    })
  }

}
