import { Component, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { PcPart } from '../pc-part.model';
import { PcPartsService } from '../pc-parts.service';
import { contexts } from '../service_group/context.model';
import { ContextsService } from '../service_group/contexts.service';
import { roles } from '../service_group/role.model';
import { RolesService } from '../service_group/roles.service';
import { riskds } from '../service_group/riskd.model';
import { RiskdsService } from '../service_group/riskds.service';
import { supports } from '../service_group/support.model';
import { SupportsService } from '../service_group/supports.service';
import { operations } from '../service_group/operation.model';
import { OperationsService } from '../service_group/operations.service';
import { improvements } from '../service_group/improvement.model';
import { ImprovementsService } from '../service_group/improvements.service';
import { ImagesService } from '../service_group/images.service';
import { images } from '../service_group/image.model';
import { PoliciesService } from '../service_group/policies.service';
import { policies } from '../service_group/policy.model';
import { lcs } from '../service_group/lc.model';
import { LCsService } from '../service_group/lcs.service';
import { pes } from '../service_group/pe.model';
import { PEsService } from '../service_group/pes.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  searchText:any
  showImgViewr= false;
  selectedImg:any;
  private pcPartsSub: Subscription;
  pcParts: PcPart[] = [];
  
  private contextsSub: Subscription;
  contexts: contexts[] = [];
  
  optionselected:string;


  private rolesSub: Subscription;
  roles: roles[] = [];
  

  private riskdSub: Subscription;
  riskds: riskds[] = [];

  private supportSub: Subscription;
  supports: supports[] = [];
 
  private operationSub: Subscription;
  operations:operations[] = [];

  private improvementSub: Subscription;
  improvements:improvements[] = [];

  private LCSub: Subscription;
  lcs:lcs[]=[];

  private policySub: Subscription;
  policies:policies[] = [];

  private peSub: Subscription;
  pes:pes[] = [];

  private imageSub: Subscription;
  images:any =[]
 
 
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%',
    });
  }
  constructor(
    private dialog:MatDialog,
    private httpClient: HttpClient,
     private pcPartsService:PcPartsService, 
     private contextsService:ContextsService,
     private roleservice: RolesService,
     private riskdservice: RiskdsService,
     private supportservice: SupportsService,
     private operationservice: OperationsService,
     private improvementservice: ImprovementsService,
     private policyservice: PoliciesService,
     private lcservice: LCsService,
     private imagesService: ImagesService,
     private peservice: PEsService,
     ) { }

  onDelete1(pcPartId: string){
    this.pcPartsService.deletePcPart(pcPartId);
  }

  getsupport(){
    this.httpClient.get<any>('http://localhost:3000/api/support/listadmin').subscribe(
      response => {
        console.log(response);
        this.supports = response.support;

      }
    );
    }

    getop(){
      this.httpClient.get<{message: string, operations: operations[]}>('http://localhost:3000/api/operations/listadmin').subscribe(
        response => {
          console.log(response);
          this.operations = response.operations;
  
        }
      );
    }
  

  ngOnInit(): void {
    this.getAllImages()
    this.getLcsList()
    this.getPeLIst()
    this. getPolicyList()

    // this.imagesService.getAllimages();
   
    // this.imageSub = this.imagesService.getimagestream()
    // .subscribe((images: images[])=>{
    //   this.images = images;
    //     });

    this.pcPartsService.getAllPcParts(); 
    this.pcPartsSub = this.pcPartsService.getPcPartsUpdateListener()
    .subscribe((pcParts: PcPart[])=>{
      this.pcParts = pcParts;
    });
  
 //Roles OF ORGANIZATIONS------------------------------------------------------------------------------------------------------


  this.roleservice.getAllroleadmin(); 
  this.rolesSub = this.roleservice.getrolesUpdateListener()
  .subscribe((roles: roles[])=>{
    this.roles = roles;
      });


    //CONTEXT OF ORGANIZATIONS------------------------------------------------------------------------------------------------------

  this.contextsService.getAllcont(); 
  this.contextsSub = this.contextsService.getcontextsUpdateListener()
  .subscribe((contexts: contexts[])=>{
    
    this.contexts = contexts;
    console.log(this.contexts)

  });


  //Riskds OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
   
  this.riskdservice.getAllriskdadmin(); 
  this.riskdSub = this.riskdservice.getriskdsUpdateListener()
  .subscribe((riskds: riskds[])=>{
    this.riskds = riskds;
  });


//Support OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
this.getsupport();
this.supportSub = this.supportservice.getsupportsUpdateListener()
.subscribe((supports: supports[])=>{
  this.supports = supports;
});

//Operations OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
this.getop();
    
    this.operationSub = this.operationservice.getoperationsUpdateListener()
    .subscribe((operations: operations[])=>{
      this.operations = operations;
    
    });

//Improvement OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
this.improvementservice.getAllimprov(); 
  this.improvementSub = this.improvementservice.getimprovementsUpdateListener()
  .subscribe((improvements: improvements[])=>{
    this.improvements = improvements;
  });
  }
  

  //Policies OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
  getPolicyList(){

    this.policyservice.getAllpoliciesadmin().subscribe((data:any)=>{
      if(data){
        this.policies = data.policies
      }
    })
  }
  

//Leadership and Commitment OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
getLcsList(){

  this.lcservice.getAllcsadmin().subscribe((data:any)=>{
    if(data){
      this.lcs = data.LCs
    }
  })
}

//Performance Evalutions OF ORGANIZATIONS------------------------------------------------------------------------------------------------------
getPeLIst(){
  this.peservice.getpeadmin().subscribe((data:any)=>{
    console.log(data)
    if(data){
      this.pes = data.PEs;
    }

  })
}


getAllImages(){
  this.imagesService.getAllImagesApi().subscribe((data:any)=>{
    if(data){
      // this.images = data.files
      this.filterImgData(data.files)
    }
  })
}

filterImgData(data){
  var filt = data.filter((a)=>{
    if(a.filename){
      let img = 'http://localhost:3000/api/image/image/' + a.filename;
      a.pic =img;
    }
  })
  console.log(data)
  this.images =data
}


openImageViewr(data){
  this.selectedImg = data;
  this.showImgViewr = true;
}

closeImgViewer(){
  this.showImgViewr = false;
}


}



