import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { riskds } from './riskd.model';

@Injectable({
  providedIn: 'root'
})
export class RiskdsService {
  url="http://localhost:3000/api/riskd/" ;

  private riskds: riskds[] = [];// variable for storing data
  private riskdsUpdated = new Subject<riskds[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }

  addriskds( Requirements:string, Risk:string, RiskOwner:string, RiskAccecptance:string, RiskAssessment:string,RiskControl:string,Justification:string){    
    const riskd: riskds = {
      _id: null,
      Requirements: Requirements,
      Risk: Risk, RiskOwner: RiskOwner,
      RiskAccecptance: RiskAccecptance,
      RiskAssessment:RiskAssessment,
      RiskControl:RiskControl,
      Justification:Justification
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/riskd/add", riskd)
    .subscribe(()=>{
      this.riskds.push(riskd);
      this.riskdsUpdated.next([...this.riskds]);
    });
  }

  deleteriskds(riskdId: string){
    this.http
      .delete("http://localhost:3000/api/riskd/" + riskdId)
      .subscribe(()=>{
        const updatedriskds = this.riskds.filter(riskd=>riskd._id != riskdId);
        this.riskds = updatedriskds;
        this.riskdsUpdated.next([... this.riskds]);
      });
  }

  getriskd(){
    this.http.get<any>('http://localhost:3000/api/riskd/list').subscribe(
      response => {
        console.log(response);
        this.riskds = response.riskd;
      }
    );
  }
  
  getAllriskd(){
    this.http
      .get<{message: string, riskd: riskds[]}>("http://localhost:3000/api/riskd/list")
      .subscribe(riskdData=>{
        this.riskds = riskdData.riskd;
        this.riskdsUpdated.next([...this.riskds]);
      });
  }
  getAllriskdadmin(){
    this.http
      .get<{message: string, riskd: riskds[]}>("http://localhost:3000/api/riskd/listadmin")
      .subscribe(riskdData=>{
        this.riskds = riskdData.riskd;
        this.riskdsUpdated.next([...this.riskds]);
      });
  }

  viewuser(riskdId: string){
    return this.http.get(this.url + riskdId);
    
}

updateuser(riskdId:string, updatedData:any){
return this.http.put(this.url + riskdId, updatedData).subscribe(()=>{
  this.riskds.push(updatedData);
  this.riskdsUpdated.next([...this.riskds]);
})
}

  viewriskd(riskdId: string){
    this.http.get<any>('http://localhost:3000/api/riskd/list/'+ riskdId).subscribe(
      response => {
        console.log(response);
        this.riskds = response.riskd;
      }
    )
    }

getriskdsUpdateListener(){
  return this.riskdsUpdated.asObservable();
}
}
