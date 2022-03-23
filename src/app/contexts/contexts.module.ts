import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextsComponent } from '../contexts/contexts.component';
import { ImagesService } from '../service_group/images.service';
import { ContexteditComponent } from './contextedit/contextedit.component';




@NgModule({
  declarations: [
    
  
  ],
  imports: [
    CommonModule
  ],
  providers:[ImagesService]
})
export class ContextsModule { }
