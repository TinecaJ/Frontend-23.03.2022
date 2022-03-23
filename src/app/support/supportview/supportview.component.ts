import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportsService } from 'src/app/service_group/supports.service';


@Component({
  selector: 'app-supportview',
  templateUrl: './supportview.component.html',
  styleUrls: ['./supportview.component.css']
})
export class SupportviewComponent implements OnInit {
  riskdId:string='';
  userdetails:any;
  supportId: any;

  constructor(private activatedRouter: ActivatedRoute, private supportservice:SupportsService) { }

  ngOnInit(): void {
   this.activatedRouter.params.subscribe(data=>{
      this.supportId=data['id'];
    })
    this.supportservice.viewuser(this.supportId).subscribe(data=>{
        this.userdetails= data;
    })


}
}
