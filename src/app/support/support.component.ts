import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { supports } from '../service_group/support.model';
import { SupportsService } from '../service_group/supports.service';
import { images } from '../service_group/image.model';
import { ImagesService } from '../service_group/images.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Sup1Component } from '../sup1/sup1.component';
import { Sup2Component } from '../sup2/sup2.component';
import { Sup3Component } from '../sup3/sup3.component';
import { Sup4Component } from '../sup4/sup4.component';
import { response } from 'express';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  uploadForm: FormGroup; 
  allComplete: boolean = true;
  closeResult: string;
  showOrgSupportCard = false;
  supportform:FormGroup;
  selfileName:any
  private imageSub: Subscription;
  images:any =[]

   //File upload #2
   @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
   files  = [];
   fileInfos: Observable<any> | null = null;

  constructor(
    private modalService: NgbModal,
    private dialog:MatDialog,
    public supportsService: SupportsService,
     private imagesService:ImagesService,
     private fb: FormBuilder,
     private httpClient: HttpClient,
     private activatedRouter:ActivatedRoute) { 

      this.supportform=fb.group({
      Resources:  new FormControl('',[
        Validators.required
      ]),
      ResourcesUpload:  new FormControl(),
      Resourcestick:  new FormControl('',[
        Validators.required
      ]),
      Competence: new FormControl('',[
        Validators.required
      ]),
      CompetenceUpload:  new FormControl(),
      Competencetick: new FormControl('',[
        Validators.required
      ]),
      Awareness: new FormControl('',[
        Validators.required
      ]),
      AwarenessUpload: new FormControl(),
      Awarenesstick:  new FormControl('',[
        Validators.required
      ]),
      Communication: new FormControl('',[
        Validators.required
      ]),
      Comtick: new FormControl('',[
        Validators.required
      ]),
      })
     }

    private supportsSub: Subscription;

  supports: supports[] = [];


  openDialog() {
    this.dialog.open(Sup1Component, {
     width:'40%',
    });
  }
  openDialog1() {
    this.dialog.open(Sup2Component, {
     width:'40%',
    });
  }
  openDialog2() {
    this.dialog.open(Sup3Component, {
     width:'40%',
    });
  }
  openDialog3() {
    this.dialog.open(Sup4Component, {
     width:'40%',
    });
  }
  onAdd():void{
    this.sendFiles()
    this.supportsService.addsupports(
      this.supportform.value.Resources,
      this.supportform.value.ResourcesUpload,
      this.supportform.value.Resourcestick,
      this.supportform.value.Competence,
      this.supportform.value.CompetenceUpload, 
      this.supportform.value.Competencetick, 
      this.supportform.value.Awareness, 
      this.supportform.value.AwarenessUpload, 
      this.supportform.value.Awarenesstick, 
      this.supportform.value.Communication,
      this.supportform.value.Comtick); 
    this.getsupport()
  }

  uploadedFile:any;
  onFileSelect(event) {
    if (event.target.files.length >0 ) {
      const file = event.target.files[0];
    //  this.uploadForm.get('profile').setValue(file);
      this.uploadedFile = file
    }
  }
  onSubmit() {
    // const formData = new FormData();
    // formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>('http://localhost:3000/api/image/new', this.uploadedFile).subscribe(
      (res) =>{
        this.getsupport()
      },
      (err) => console.log(err)
    );
  }
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.imagesService.addfile(formData).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
          this.getAllImages();
        }
      });
  }
  
  sendFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.sendFile(file);
      this.getAllImages();
    });
}  

onClick() {
 
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
  for (let index = 0; index < fileUpload.files.length; index++)
  {
   const file = fileUpload.files[index];
   console.log(file)
   this.selfileName = file
   this.files.push({ data: file, inProgress: false, progress: 0});
  }
  //  this.sendFiles();
    
  };
  fileUpload.click();
}
  getsupport(){
    this.httpClient.get<any>('http://localhost:3000/api/support/list').subscribe(
      response => {
        console.log(response);
        this.supports = response.support;

      }
    );
  }
   
  

  onDelete(supportId: string){
    this.supportsService.deletesupports(supportId).subscribe((data:any)=>{
      
      if( data){
        this.getsupport()
      }
    })

  }
  onDeleteimages(UserId: string){
    this.imagesService.Deleteimages(UserId).subscribe((data:any)=>{
      
      if( data){
        this.getsupport();
        this.getAllImages();
      }
    })

  }

  showOrgSupportFun(){
    this.showOrgSupportCard =true
   }
 
   hideOrgContextFun(){
     this.showOrgSupportCard =false
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
  ngOnInit(): void {
    
    this.getAllImages();
   
    //this.supportsService.getsupport1();
    this.getsupport();
    this.supportsSub = this.supportsService.getsupportsUpdateListener()
    .subscribe((supports: supports[])=>{
      this.supports = supports;
    });
  }
  ngOnchange(){
    
  }

  ngOnDestroy(){
    this.supportsSub.unsubscribe();
  }

}
  

function supportId(supportId: any) {
  throw new Error('Function not implemented.');
}

