import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { improvements } from './improvement.model';

@Injectable({
  providedIn: 'root'
})
export class ImprovementsService {
  url="http://localhost:3000/api/improvements/" ;
  private improvements: improvements[] = [];// variable for storing data
  private improvementsUpdated = new Subject<improvements[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }

  addimprovements(Non_Conformity: boolean, CorrectiveAction: boolean, Upload: string, Text: string){    
    const improvement: improvements = {
      _id: null, Non_Conformity: Non_Conformity, CorrectiveAction: CorrectiveAction, Upload: Upload, Text: Text
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/improvements/add", improvement)
    .subscribe(()=>{
      this.improvements.push(improvement);
      this.improvementsUpdated.next([...this.improvements]);
    });
  }

  getAllimprovements(){
    this.http
      .get<{message: string, improvements: improvements[]}>("http://localhost:3000/api/improvements/list")
      .subscribe(improvementData=>{
        this.improvements = improvementData.improvements;
        this.improvementsUpdated.next([...this.improvements]);
      });
  }
  getAllimprov(){
    this.http
      .get<{message: string, improvements: improvements[]}>("http://localhost:3000/api/improvements/listadmin")
      .subscribe(improvementData=>{
        this.improvements = improvementData.improvements;
        this.improvementsUpdated.next([...this.improvements]);
      });
  }

  deleteimprovements(improvementId: string){
    this.http
      .delete("http://localhost:3000/api/improvements/" + improvementId)
      .subscribe(()=>{
        const updatedoperations = this.improvements.filter(improvement=>improvement._id != improvementId);
        this.improvements = updatedoperations;
        this.improvementsUpdated.next([... this.improvements]);
      });
  }

  updateuser(improvementId:string, updatedData:any){
    return this.http.put(this.url + improvementId, updatedData).subscribe(()=>{
      this.improvements.push(updatedData);
      this.improvementsUpdated.next([...this.improvements]);
    })
    }
    
    viewoperation(improvementId: string){
      return this.http.get(this.url + improvementId);
      
  }
//the line below allows us to listen to this service
  getimprovementsUpdateListener(){
    return this.improvementsUpdated.asObservable();
  }

}


