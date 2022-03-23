import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { contexts } from './context.model';

@Injectable({
  providedIn: 'root'
})
export class ContextsService {

url ="http://localhost:3000/api/contexts/";
  private contexts: contexts[] = [];// variable for storing data
  private contextsUpdated = new Subject<contexts[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  constructor(private http: HttpClient) { }

  addcontexts(Context: string, Interested_Parties: string, IP_upload: string, contexttick: boolean, IPtick: boolean,Scopetick: boolean,Scope:string,ScopeUpload:string){    
    const context: contexts = {
      _id: null,_userId:null, Context: Context, Interested_Parties: Interested_Parties, contexttick: contexttick, IPtick: IPtick, Scopetick: Scopetick, Scope: Scope,
      IP_upload: '',
      ScopeUpload: ''
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/contexts/add", context)
    .subscribe(()=>{
      this.contexts.push(context);
      this.contextsUpdated.next([...this.contexts]);
      console.log(context);
    });
  }

  deletecontext(contextId: string){
    this.http
      .delete("http://localhost:3000/api/contexts/" + contextId)
      .subscribe(()=>{
        const updatedcontexts = this.contexts.filter(context=>context._id != contextId);
        this.contexts = updatedcontexts;
        this.contextsUpdated.next([... this.contexts]);
      });
  }

  getAllcontexts(){
    this.http
      .get<{message: string, contexts: contexts[]}>("http://localhost:3000/api/contexts/list")
      .subscribe(contextData=>{
        this.contexts = contextData.contexts;
        this.contextsUpdated.next([...this.contexts]);
        console.log(contextData);
      });
  }

  getAllcont(){
    this.http
      .get<{message: string, contexts: contexts[]}>("http://localhost:3000/api/contexts/listun")
      .subscribe(contextData=>{
        this.contexts = contextData.contexts;
        this.contextsUpdated.next([...this.contexts]);
        
      });
  }
selectcont(selecteduserId:string): Observable<any>{
    let param1= new HttpParams().set('_userId', selecteduserId);
    return this.http.get('http://localhost:3000/api/contexts/listun',{params:param1})
}



  viewuser(contextId: string){
    return this.http.get(this.url + contextId);
    
}

updateuser(contextId:string, updatedData:any){
  return this.http.put(this.url + contextId, updatedData).subscribe(()=>{
    this.contexts.push(updatedData);
    this.contextsUpdated.next([...this.contexts]);
    console.log(updatedData)
  })
  }

//the line below allows us to listen to this service
  getcontextsUpdateListener(){
    return this.contextsUpdated.asObservable();
  }
}
