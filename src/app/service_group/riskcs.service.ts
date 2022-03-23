import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { riskas } from './riska.model';
import { controls } from './control.model';
import { riskcs } from './riskc.model';

@Injectable({
  providedIn: 'root'
})
export class RiskcsService {

  private riskcs: riskcs[] = [];// variable for storing data
  private riskcsUpdated = new Subject<riskcs[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  riskcsUrl: string;
  constructor(private http: HttpClient) { }

  addriskcs(Justification: string, RiskCupload: string,RiskCSignature:string){    
    const riskc: riskcs = {
      _id: null, Justification: Justification, RiskCupload: RiskCupload,
      RiskCSignature: RiskCSignature,
      
      RiskControl: []
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/riskC/add", riskc)
    .subscribe(()=>{
      this.riskcs.push(riskc);
      this.riskcsUpdated.next([...this.riskcs]);
    });
  }


//the line below allows us to listen to this service
getriskcsUpdateListener(){
  return this.riskcsUpdated.asObservable();
}

}
