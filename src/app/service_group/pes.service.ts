import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { pes } from './pe.model';

@Injectable({
  providedIn: 'root'
})
export class PEsService {
  apiUrl:any = 'http://localhost:3000/api/pes/'
  private pes: pes[] = [];// variable for storing data
 // pe:pes[];
  private pesUpdated = new Subject<pes[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  private pe: pes[]=[];
  constructor(private http: HttpClient) { }
 
 
  addpes(RAndR: string, RTndR: string, Review: string, confirm: boolean){    
    const pe: pes = {
      _id: null, RAndR: RAndR, RTndR: RTndR, Review: Review, confirm: confirm,
      
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/PEs/add", pe)
    .subscribe(()=>{
      this.pes.push(pe);
      this.pesUpdated.next([...this.pes]);
    });
  }

  getAllpes(){
    this.http
      .get<{message: string, pes: pes[]}>("http://localhost:3000/api/PEs/list")
      .subscribe(peData=>{
        this.pe = peData.pes;
        this.pesUpdated.next([...this.pe]);
        console.log(peData)
      });
  }

  getsupport(){
    // this.http.get<any>('http://localhost:3000/api/pes/list').subscribe(
    //   response => {
    //     console.log(response);
    //     this.pes = response.pe;

    //   }
    // );
    let API_URL = `${this.apiUrl}/list`;
    return this.http.get(API_URL)
    
  }

  getpeadmin(){
    // this.http.get<any>('http://localhost:3000/api/pes/list').subscribe(
    //   response => {
    //     console.log(response);
    //     this.pes = response.pe;

    //   }
    // );
    let API_URL = `${this.apiUrl}/listadmin`;
    return this.http.get(API_URL)
    
  }

  deletepes(pesId: string){
    this.http
      .delete("http://localhost:3000/api/PEs/" + pesId)
      .subscribe(()=>{
        const updatedpes = this.pes.filter(pes=>pes._id != pesId);
        this.pes = updatedpes;
        this.pesUpdated.next([... this.pes]);
      });
  }

  updateuser(pesId:string, updatedData:any){
    return this.http.put(this.apiUrl + pesId, updatedData).subscribe(()=>{
      this.pes.push(updatedData);
      this.pesUpdated.next([...this.pes]);
    })
    }
    
    viewuser(operationId: string){
      return this.http.get(this.apiUrl + operationId);
      
  }
//the line below allows us to listen to this service
  getpesUpdateListener(){
    return this.pesUpdated.asObservable();
  }

}
