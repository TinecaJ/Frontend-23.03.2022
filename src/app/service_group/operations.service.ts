import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { operations } from './operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private operations: operations[] = [];// variable for storing data
  
  url="http://localhost:3000/api/operations/" ;
  private operationsUpdated = new Subject<operations[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }
  
  
  addoperations(PndI: string, RAndI: string, RTndI:string, PItick: boolean, AItick: boolean,RTItick: boolean,UploadSection:string){    
    const operation: operations = {
      _id: null, PndI: PndI, RAndI: RAndI, RTndI: RTndI, PItick: PItick, AItick: AItick, RTItick: RTItick};
    this.http
    .post<{message: string}>("http://localhost:3000/api/operations/add", operation)
    .subscribe(()=>{
      this.operations.push(operation);
      this.operationsUpdated.next([...this.operations]);
    });
  }

  getAlloperations(){
    let API_URL =`${this.url}/list`;
    return this.http.get(API_URL)
  }

 

  getCountries(){
    return this.http.get('http://localhost:3000/api/operations/list')
    }

  deleteoperations(operationId: string){
      this.http
        .delete("http://localhost:3000/api/operations/" + operationId)
        .subscribe(()=>{
          const updatedoperations = this.operations.filter(operation=>operation._id != operationId);
          this.operations = updatedoperations;
          this.operationsUpdated.next([... this.operations]);
        });
    }

    updateuser(operationId:string, updatedData:any){
      return this.http.put(this.url + operationId, updatedData).subscribe(()=>{
        this.operations.push(updatedData);
        this.operationsUpdated.next([...this.operations]);
      })
      }
      
      viewoperation(operationId: string){
        return this.http.get(this.url + operationId);
        
    }
  
//the line below allows us to listen to this service
  getoperationsUpdateListener(){
    return this.operationsUpdated.asObservable();
  }

}