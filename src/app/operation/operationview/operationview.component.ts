import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationsService } from 'src/app/service_group/operations.service';

@Component({
  selector: 'app-operationview',
  templateUrl: './operationview.component.html',
  styleUrls: ['./operationview.component.css']
})
export class OperationviewComponent implements OnInit {

operationId:any;
userdetails:any;
  constructor(
    private activatedRouter: ActivatedRoute,
     private operationservice:OperationsService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.operationId=data['id'];
    })
    this.operationservice.viewoperation(this.operationId).subscribe(data=>{
      this.userdetails= data;
  })


}
}
