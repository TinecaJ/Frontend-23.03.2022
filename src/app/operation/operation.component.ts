import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { operations } from '../service_group/operation.model';
import { OperationsService } from '../service_group/operations.service';
import { images } from '../service_group/image.model';
import { ImagesService } from '../service_group/images.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { OpComponent } from '../dialogcomps/op/op.component';
import { Op1Component } from '../dialogcomps/op1/op1.component';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  uploadForm: FormGroup; 
  allComplete: boolean = true;
  countryData: Object;
  operation: operations[];
  showOrgOpCard = false;
  operationform:FormGroup;


  constructor(
      private dialog:MatDialog,
      public operationsService: OperationsService,
      private imagesService:ImagesService,
      private fb: FormBuilder,
      private httpClient: HttpClient
      ) {
        this.operationform=fb.group({

          PndI:new FormControl('',[
            Validators.required
          ]),
          RAndI:new FormControl('',[
            Validators.required
          ]),
          RTndI:new FormControl('',[
            Validators.required
          ]),
          PItick:new FormControl('',[
            Validators.required
          ]),
          AItick:new FormControl('',[
            Validators.required
          ]),
          RTItick:new FormControl('',[
            Validators.required
          ]),
          UploadSection: new FormControl(),
        })

       }

   

    private operationsSub: Subscription;

    operations: operations[] = [];


    ngOnInit(): void {
      //this.operationsService.getAlloperations();
     /*
      this.operationsService.getCountries().subscribe((data:[])=>{
        this.operations=data;
        
       // this.operation = Array.of(this.operation);
        console.log(data)
      })
      */
 
    
     
     this.getOPList();
     
     this.operationsSub = this.operationsService.getoperationsUpdateListener()
     .subscribe((operations: operations[])=>{
       this.operations = operations;
     
     });
   }
   ngOnchange(){
     
   }
 
   ngOnDestroy(){
     this.operationsSub.unsubscribe();
   }

   
    openDialog() {
      this.dialog.open(OpComponent, {
       width:'40%',
      });
    }
    openDialog1() {
      this.dialog.open(Op1Component, {
       width:'40%',
      });
    }
    
  
    onAdd():void{
      this.operationsService.addoperations(
        this.operationform.value.PndI,
        this.operationform.value.RAndI ,
        this.operationform.value.RTndI,
        this.operationform.value.PItick, 
        this.operationform.value.AItick, 
        this.operationform.value.RTItick, 
        this.operationform.value.UploadSection)
      this.getOPList();

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
    }
  
  

    onDelete(operationId: string){
      this.operationsService.deleteoperations(operationId);
      this.getOPList();

    }
    
    showOrgOpFun(){
      this.showOrgOpCard =true
     }
   
     hideOrgOpFun(){
       this.showOrgOpCard =false
     }

     getOPList(){

      this.operationsService.getAlloperations().subscribe((data:any)=>{
        if(data){
          this.operations = data.operations
        }
      })
    }
    
  
}
