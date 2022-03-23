import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { improvements } from '../service_group/improvement.model';
import { ImprovementsService } from '../service_group/improvements.service';
import { images } from '../service_group/image.model';
import { ImagesService } from '../service_group/images.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { pes } from '../service_group/pe.model';

@Component({
  selector: 'app-improvement',
  templateUrl: './improvement.component.html',
  styleUrls: ['./improvement.component.css']
})
export class ImprovementComponent implements OnInit {

  uploadForm: FormGroup; 
  allComplete: boolean = true;
  showOrgImprovCard = false;
  improvform:FormGroup;
  constructor(
    public improvementsService: ImprovementsService, 
    private imagesService:ImagesService,
    private fb: FormBuilder,
    private httpClient: HttpClient) { 


      this.improvform=fb.group({
        Non_Conformity:new FormControl(),
        CorrectiveAction:new FormControl('',[
          Validators.required
        ]),
        Upload:new FormControl(),
        Text:new FormControl('',[
          Validators.required
        ]),

      })
    }
  
  private improvementsSub: Subscription;

  improvements: improvements[] = [];


  onAdd():void{
    this.improvementsService.addimprovements(
      this.improvform.value.Non_Conformity,
      this.improvform.value.CorrectiveAction ,
      this.improvform.value.Upload,
      this.improvform.value.Text)
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
   
  onDelete(improvementId: string){
    this.improvementsService.deleteimprovements(improvementId);
  }

  
  showOrgImprovFun(){
    this.showOrgImprovCard =true
   }
 
   hideOrgImprovFun(){
     this.showOrgImprovCard =false
   }
ngOnInit(): void {
  
  this.improvementsService.getAllimprovements(); 
  this.improvementsSub = this.improvementsService.getimprovementsUpdateListener()
  .subscribe((improvements: improvements[])=>{
    this.improvements = improvements;
  });
}
ngOnchange(){
  
}

ngOnDestroy(){
  this.improvementsSub.unsubscribe();
}

}