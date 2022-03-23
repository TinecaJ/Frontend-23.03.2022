import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextsService } from 'src/app/service_group/contexts.service';

@Component({
  selector: 'app-contextview',
  templateUrl: './contextview.component.html',
  styleUrls: ['./contextview.component.css']
})
export class ContextviewComponent implements OnInit {
  contextId:string='';
  userdetails:any;
  constructor(private contextservice: ContextsService,private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(data=>{
      this.contextId=data['id'];
    })
    this.contextservice.viewuser(this.contextId).subscribe(data=>{
        this.userdetails= data;
       console.log(data)
    })


}
}
