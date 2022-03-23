import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { lcs } from './lc.model';

@Injectable({
  providedIn: 'root'
})
export class LCsService {
  apiUrl:any = 'http://localhost:3000/api/LCs/'
  private lead: lcs[] = [];// variable for storing data
  private lcsUpdated = new Subject<lcs[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }


  addlcs(Policy:boolean, Integration:boolean, AvailabilityofResources:boolean, Communication:boolean, Improvement:boolean, Achievements: boolean,Demo:boolean,Leadership: boolean,Other: string){    
    const lc: lcs = { _id: null,Policy: Policy, Integration: Integration, AvailabilityofResources: AvailabilityofResources, Communication: Communication, Improvement: Improvement,Achievements: Achievements,Demo:Demo,Leadership:Leadership,Other:Other};
    this.http
    .post<{message: string}>("http://localhost:3000/api/LCs/add", lc)
    .subscribe(()=>{
      this.lead.push(lc);
      this.lcsUpdated.next([...this.lead]);
    });
  }

 
  getLC():Observable<any>{
    return this.http.get('http://localhost:3000/api/LCs/list');
    
  }

  getAlllcs(){
    // this.http
    //   .get<{message: string, lead: lcs[]}>("http://localhost:3000/api/LCs/list")
    //   .subscribe(lcData=>{
    //     this.lead = lcData.lead;
    //     this.lcsUpdated.next([...this.lead]);
    //   });

    let API_URL =`${this.apiUrl}/list`;
    return this.http.get(API_URL)

  }

  getAllcsadmin(){
   
    let API_URL =`${this.apiUrl}/listadmin`;
    return this.http.get(API_URL)

  }

viewuser(LCId: string){
    return this.http.get(this.apiUrl + LCId);
    
}

updateuser(LCId:string, updatedData:any){
return this.http.put(this.apiUrl + LCId, updatedData).subscribe(()=>{
  this.lead.push(updatedData);
  this.lcsUpdated.next([...this.lead]);
})
}

deleteLCs(LCId: string){
  this.http
    .delete("http://localhost:3000/api/LCs/" + LCId)
    .subscribe(()=>{
      const updatedlcs = this.lead.filter(lead=>lead._id != LCId);
      this.lead = updatedlcs;
      this.lcsUpdated.next([... this.lead]);
    });
}
//the line below allows us to listen to this service
getlcsUpdateListener(){
  return this.lcsUpdated.asObservable();
}
}


