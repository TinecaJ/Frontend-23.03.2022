import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { lcs } from '../service_group/lc.model';
import { LCsService } from '../service_group/lcs.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.css']
})
export class LCComponent implements OnInit {
  
  allComplete: boolean = true;
  lcs=[];
  lcsUpdated: any;
  showOrgLCCard = false;
  lcform: FormGroup;
  constructor(
    public lcsService: LCsService,
    private fb: FormBuilder,

    private httpClient: HttpClient) {
  this.lcform=fb.group({
  
  Policy: new FormControl('',[
    Validators.required
  ]), 
  Integration:new FormControl('',[
    Validators.required
  ]), 
  AvailabilityofResources:new FormControl('',[
    Validators.required
  ]), 
  Communication:new FormControl('',[
    Validators.required
  ]), 
  Improvement:new FormControl('',[
    Validators.requiredTrue
  ]), 
  Achievements: new FormControl('',[
    Validators.required
  ]), 
  Demo:new FormControl('',[
    Validators.required
  ]), 
  Leadership: new FormControl('',[
    Validators.required
  ]), 
  Other:new FormControl(), 
  })
}
  private lcsSub: Subscription;

 // lcs: lcs[] = [];
 ngOnInit(): void {
  this.getLcsList()
 
  // this.lcsService.getAlllcs()
  
 
  this.lcsSub = this.lcsService.getlcsUpdateListener()
  .subscribe((lcs: lcs[])=>{
   this.lcs = lcs;
   });
}


ngOnchange(){
  
}

ngOnDestroy(){
this.lcsSub.unsubscribe();
}

  onAdd():void{
    this.lcsService.addlcs(
    this.lcform.value.Policy, 
    this.lcform.value.Integration,
    this.lcform.value.AvailabilityofResources, 
    this.lcform.value.Communication, 
    this.lcform.value.Improvement, 
    this.lcform.value.Achievements,
    this.lcform.value.Demo, 
    this.lcform.value.Leadership,
    this.lcform.value.Other); 
    this.getLcsList();
  }



  getsupport(){
    this.httpClient.get<any>('http://localhost:3000/api/LCs/list').subscribe(
      response => {
        console.log(this.lcs);
        this.lcs.push(response);
        this.lcsUpdated.next([...this.lcs]);
        

      }
    );
  }

  showOrgLCFun(){
    this.showOrgLCCard =true
   }
 
   hideOrgLCFun(){
     this.showOrgLCCard =false
   }
 
  

getLcsList(){

  this.lcsService.getAlllcs().subscribe((data:any)=>{
    if(data){
      this.lcs = data.LCs
    }
  })
}

onDelete(LCId: string){
  this.lcsService.deleteLCs(LCId);
  this.getLcsList();
}

}

