import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { contexts } from '../service_group/context.model';
import { ContextsService } from '../service_group/contexts.service';
import { images } from '../service_group/image.model';
import { ImagesService } from '../service_group/images.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConComponent } from '../dialogcomps/con/con.component';
import { Con1Component } from '../dialogcomps/con1/con1.component';
import { Con2Component } from '../dialogcomps/con2/con2.component';
import { ConsoleLogger } from '@angular/compiler-cli/private/localize';
declare const $:any

@Component({
  selector: 'app-contexts',
  templateUrl: './contexts.component.html',
  styleUrls: ['./contexts.component.css']
})
export class ContextsComponent implements OnInit {
  uploadForm: FormGroup; 
  allComplete: boolean = true;
  contextId:string='';
  imagedata: string;
  images:images[]=[];
  showOrgconTextCard = false;
  private imagesub: Subscription;
  encodedFile:any;
  contextform: FormGroup;

  //File upload #2
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = [];
  
  fileInfos: Observable<any> | null = null;
  
 
//the component "contextsService" is calling the service "ContextsService"
  constructor(
    private dialog:MatDialog,
    public contextsService: ContextsService, 
    private imagesService:ImagesService,
    private fb: FormBuilder,
    private httpClient: HttpClient) { 

this.contextform=fb.group({
    Context: new FormControl('',[
      Validators.required
    ]),
    Interested_Parties:new FormControl('',[
      Validators.required
    ]),
    IP_upload:new FormControl(),
    contexttick:new FormControl('',[

      Validators.requiredTrue
    ]),
    IPtick:new FormControl('',[
      Validators.requiredTrue
    ]),
    Scopetick:new FormControl('',[
      Validators.requiredTrue
    ]),
    Scope:new FormControl('',[
      Validators.required
    ]),
    ScopeUpload: new FormControl(),
  })
}
    private contextsSub: Subscription;

  contexts: contexts[] = [];
  
  openDialog() {
    this.dialog.open(ConComponent, {
     width:'30%',
    });
  }
  openDialog1() {
    this.dialog.open(Con1Component, {
     width:'30%',
    });
  }
  openDialog2() {
    this.dialog.open(Con2Component, {
     width:'30%',
    });
  }

  onAdd(){
    this.contextsService.addcontexts(this.contextform.value.Context,this.contextform.value.Interested_Parties, this.contextform.value.IP_upload, this.contextform.value.contexttick, this.contextform.value.IPtick, this.contextform.value.Scopetick, this.contextform.value.Scope, this.contextform.value.ScopeUpload)
  }
/*
  onAdd():void{
    this.contextsService.addcontexts(this.Context, this.Interested_Parties, this.IP_upload, this.contexttick, this.IPtick, this.Scopetick, this.Scope, this.ScopeUpload); 
    
  }
*/

  onFileSelect(event) {
    if (event.target.files.length >0 ) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      const reader= new FileReader();
      reader.onload=()=>{
        this.imagedata= reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  
  onSubmit1() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>('http://localhost:3000/api/image/multiple', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
 
  GetImage(){
    this.imagesService.getAllimages()
  }
  
      
  sendFile(file) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.imagesService.addfile(formData).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          console.log(event.body);
        }
      });
  }

  
  sendFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.sendFile(file);
    });
}  



onFileSelect1(event): void {
  if (event.target.files.length > 0) {
    const files = event.target.files[0];
    this.uploadForm.get('profile').setValue(files);
  }
  
}


onDelete(contextId: string){
  this.contextsService.deletecontext(contextId);
  
}

  ngOnInit(): void {
  
    
   
   this.contextsService.getAllcontexts(); 

   this.imagesService.getAllimages();
   this.imagesub = this.imagesService.getimagestream().subscribe((images:images[])=>{
    this.images = images;
   })

    this.contextsSub = this.contextsService.getcontextsUpdateListener()
    .subscribe((contexts: contexts[])=>{
      this.contexts = contexts;
    });
  }
  ngOnchange(){
    
  }

  ngOnDestroy(){
    this.contextsSub.unsubscribe();
    this.imagesub.unsubscribe();
  }


  showOrgContxFun(){
   this.showOrgconTextCard =true
  }

  hideOrgContextFun(){
    this.showOrgconTextCard =false
  }

  myFiles:any=[];
  b64Array:any =[];
  handleFileInput(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
    }
    console.log( this.myFiles)
    setTimeout(() => {
      this.convertToB64()
    }, 200);

  }

  convertToB64(){
    var filt =this.myFiles.filter((a:any)=>{
        const file = a
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.encodedFile = reader.result;
      this.b64Array.push({name:a.name, file:this.encodedFile} )
    };
      
    })
    console.log(this.b64Array)
    setTimeout(() => {
    //  this.uploadFiles()
    }, 200);
  }



  uploadFiles(){
    this.imagesService.addfile(this.b64Array).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        console.log(event.body);
      }
    });
  }
  




}
  function DialogOverviewExampleDialog(DialogOverviewExampleDialog: any, arg1: { width: string; data: {}; }) {
    throw new Error('Function not implemented.');
  }




