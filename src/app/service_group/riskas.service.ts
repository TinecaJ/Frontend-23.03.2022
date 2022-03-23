import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { riskas } from './riska.model';
import { riskds } from './riskd.model'

@Injectable({
  providedIn: 'root'
})
export class RiskasService {

  private riskas: riskas[] = [];// variable for storing data
  private riskasUpdated = new Subject<riskas[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  riskdsUrl: string;
  constructor(private http: HttpClient) { }

  addriskas(RiskLevel: string, RiskAupload: string){    
    const riska: riskas = {
      _id: null, RiskLevel: RiskLevel, RiskAupload:RiskAupload};
    this.http
    .post<{message: string}>("http://localhost:3000/api/riska/add", riska)
    .subscribe(()=>{
      this.riskas.push(riska);
      this.riskasUpdated.next([...this.riskas]);
      
    });
  }
  getsupport(){
    this.http.get<any>('http://localhost:3000/api/riska/list').subscribe(
      response => {
        console.log(response);
        this.riskas = response.riska;
      }
    );
  }

  getriskaa(){
    return this.http
      .get<{message: string, riska: riskas[]}>("http://localhost:3000/api/riska/list")
      .subscribe(riskaData=>{
        this.riskas = riskaData.riska;
        console.log(riskaData)
        return [...this.riskas];
        
        //this.riskasUpdated.next([...this.riskas]);
        
      
      });
  }
  getriska(){
    this.http.get<any>('http://localhost:3000/api/riska/list').subscribe(
      response => {
       console.log(response);
        this.riskas = response.riska;
        
        
      }
    );
  }
 
  
   
//the line below allows us to listen to this service
getriskasUpdateListener(){
  return this.riskasUpdated.asObservable();
}
}
