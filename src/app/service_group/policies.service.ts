import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { policies } from './policy.model';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  private policies: policies[] = [];// variable for storing data
  private policiesUpdated = new Subject<policies[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  apiUrl:any = 'http://localhost:3000/api/policies/'
  
  constructor(private http: HttpClient) { }

  addpolicies( Objectives:boolean, Appropriate:boolean, CommitmentReq:boolean, CommitmentImprov:boolean,Available:boolean,CommunicatedOrg:boolean,AvailableParties:boolean,Other:boolean,Othertxt:string, PolicyUpload:string){    
    const policy: policies = { _id: null,Objectives: Objectives, Appropriate: Appropriate, CommitmentReq: CommitmentReq, CommitmentImprov: CommitmentImprov, Available: Available,CommunicatedOrg: CommunicatedOrg,AvailableParties:AvailableParties,Other:Other,Othertxt:Othertxt,PolicyUpload:PolicyUpload};
    this.http
    .post<{message: string}>("http://localhost:3000/api/policies/add", policy)
    .subscribe(()=>{
      this.policies.push(policy);
      this.policiesUpdated.next([...this.policies]);
    });
  }

  getAllpolicies(){
    let API_URL =`${this.apiUrl}/list`;
    return this.http.get(API_URL)
      
  }

  getAllpoliciesadmin(){
    let API_URL =`${this.apiUrl}/listadmin`;
    return this.http.get(API_URL)
      
  }

  deletePolicy(PolId: string){
    this.http
      .delete("http://localhost:3000/api/policies/" + PolId)
      .subscribe(()=>{
        const updatedPOL = this.policies.filter(policies=>policies._id != PolId);
        this.policies = updatedPOL;
        this.policiesUpdated.next([... this.policies]);
      });
  }

  viewuser(POLId: string){
    return this.http.get(this.apiUrl + POLId);
    
}

updateuser(POLId:string, updatedData:any){
return this.http.put(this.apiUrl + POLId, updatedData).subscribe(()=>{
  this.policies.push(updatedData);
  this.policiesUpdated.next([...this.policies]);
})
}
//the line below allows us to listen to this service
  getpoliciesUpdateListener(){
    return this.policiesUpdated.asObservable();
  }


  
}


