import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImprovementsService } from 'src/app/service_group/improvements.service';

@Component({
  selector: 'app-improvementview',
  templateUrl: './improvementview.component.html',
  styleUrls: ['./improvementview.component.css']
})
export class ImprovementviewComponent implements OnInit {
  improvementId:any;
  userdetails:any;
  constructor(
    private activatedRouter: ActivatedRoute,
    private improvementservice: ImprovementsService,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.improvementId=data['id'];
    })
    this.improvementservice.viewoperation(this.improvementId).subscribe(data=>{
      this.userdetails= data;
  })


}
}

