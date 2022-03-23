import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { policies } from '../service_group/policy.model';
import { PoliciesService } from '../service_group/policies.service';
import { images } from '../service_group/image.model';
import { ImagesService } from '../service_group/images.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
}) 
export class PoliciesComponent implements OnInit {
    uploadForm: FormGroup; 
    allComplete: boolean = true;
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];
    fileInfos: Observable<any> | null = null;
    name:'';
    showOrgPolicyCard = false;
    
    images:any =[]
    policyform: FormGroup;
    
  constructor(
    public policiesService: PoliciesService,
     private imagesService:ImagesService,
     private fb: FormBuilder,
     private httpClient: HttpClient) {

      this.policyform=fb.group({
        Objectives:new FormControl('',[
          Validators.requiredTrue
        ]),
        Appropriate:new FormControl('',[
          Validators.requiredTrue
        ]),
        CommitmentReq:new FormControl('',[
          Validators.requiredTrue
        ]),
        CommitmentImprov:new FormControl(),
        Available:new FormControl('',[
          Validators.requiredTrue
        ]),
        CommunicatedOrg:new FormControl('',[
          Validators.requiredTrue
        ]),
        AvailableParties:new FormControl(),
        Other:new FormControl(),        
        Othertxt:new FormControl(),
        PolicyUpload:new FormControl()
 
      })
      }
      private policiesSub: Subscription;
  

  policies: policies[] = [];

  ngOnInit(): void {
    
      
    
    
    this.getPolicyList(); 
    this.policiesSub = this.policiesService.getpoliciesUpdateListener()
    .subscribe((policies: policies[])=>{
      this.policies = policies;
    });
  }
  ngOnchange(){
    
  }

  ngOnDestroy(){
    this.policiesSub.unsubscribe();
  }

  
  onAdd():void{
    this.policiesService.addpolicies(
    this.policyform.value.Objectives, 
    this.policyform.value.Appropriate,
    this.policyform.value.CommitmentReq, 
    this.policyform.value.CommitmentImprov,
    this.policyform.value.Available, 
    this.policyform.value.CommunicatedOrg, 
    this.policyform.value.AvailableParties,
    this.policyform.value.Other,
     this.policyform.value.Othertxt,
    this.policyform.value.PolicyUpload); 
    this.getPolicyList();
  }

  onFileSelect(event) {
    if (event.target.files.length >0 ) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>('http://localhost:3000/api/image/upload', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.getPolicyList();
  }

  getAllImages(){
    this.imagesService.getAllImagesApiauth().subscribe((data:any)=>{
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
  
  showOrgPolicyFun(){
    this.showOrgPolicyCard =true
   }
 
   hideOrgPolicyFun(){
     this.showOrgPolicyCard =false
   }
 
  
   getPolicyList(){

    this.policiesService.getAllpolicies().subscribe((data:any)=>{
      if(data){
        this.policies = data.policies
      }
    })
  }

  onDelete(POLId: string){
    this.policiesService.deletePolicy(POLId);
    this.getPolicyList();
  }

}
