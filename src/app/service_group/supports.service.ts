import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { supports } from './support.model';

@Injectable({
  providedIn: 'root'
})
export class SupportsService {
  url="http://localhost:3000/api/support/" ;
  private supports: supports[] = [];// variable for storing data
  private supportsUpdated = new Subject<supports[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }
  
  
    addsupports(Resources: string, ResourcesUpload: string, Resourcestick: boolean, Competence: string, CompetenceUpload: string,Competencetick: boolean,Awareness:string,AwarenessUpload:string,Awarenesstick:boolean, Communication:string,Comtick:boolean){    
    const support: supports = {
      _id: null, Resources: Resources, ResourcesUpload: ResourcesUpload, Resourcestick: Resourcestick, Competence: Competence, CompetenceUpload: CompetenceUpload, Competencetick: Competencetick, Awareness: Awareness, AwarenessUpload: AwarenessUpload, Awarenesstick,
     Communication:Communication,
      Comtick:Comtick
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/support/add", support)
    .subscribe(()=>{
      this.supports.push(support);
      
    });
  }

  getAllsupport(){
     return this.http
      .get<{message: string, supports: supports[]}>("http://localhost:3000/api/support/list")
      .subscribe(supportData=>{
        this.supports = supportData.supports;
        this.supportsUpdated.next([...this.supports]);
        
        
      });
  }

  getsupport1(){
    this.http.get<any>('http://localhost:3000/api/support/list').subscribe(
      response => {
        console.log(response);
        this.supports = response.support;

      }
    );
  }

  updateuser(supportId:string, updatedData:any){
    return this.http.put(this.url + supportId, updatedData).subscribe(()=>{
      this.supports.push(updatedData);
      this.supportsUpdated.next([...this.supports]);
    })
    }
  deletesupports(supportId: string){
  return  this.http.delete(`${this.url}` + supportId)
      // .subscribe(()=>{
      //   const updatedsupports = this.supports.filter(support=>support._id != supportId);
      //   this.supports = updatedsupports;
      //   this.supportsUpdated.next([... this.supports]);
      // });
  }

  viewuser(supportId: string){
    return this.http.get(this.url + supportId);
    
}
  
//the line below allows us to listen to this service
  getsupportsUpdateListener(){
    return this.supportsUpdated.asObservable();
  }

}
