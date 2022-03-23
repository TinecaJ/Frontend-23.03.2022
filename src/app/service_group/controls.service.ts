import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { controls } from './control.model';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {
  private controlsUpdated = new Subject<controls[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  private controls: controls[]=[];
  apiUrl:any = 'http://localhost:3000/api/controls/'


  constructor(private http: HttpClient) { }


  addcontrols(
    Control: string,
    Reference: string,
    Risk: string, 
    Justification: string,
    Control1: string,
    Reference1: string,
    Risk1:string,
    Justification1:string,

    Control2: string,
    Reference2: string,
    Risk2:string,
    Justification2:string,

    Control3: string,
    Reference3: string,
    Risk3:string,
    Justification3:string,

    Control4: string,
    Reference4: string,
    Risk4:string,
    Justification4:string,

    Control5: string,
    Reference5: string,
    Risk5:string,
    Justification5:string,

    Control6: string,
    Reference6: string,
    Risk6:string,
    Justification6:string,

    Control7: string,
    Reference7: string,
    Risk7:string,
    Justification7:string,

    Control8: string,
    Reference8: string,
    Risk8:string,
    Justification8:string,

    Control9: string,
    Reference9: string,
    Risk9:string,
    Justification9:string,

    Control10: string,
    Reference10: string,
    Risk10:string,
    Justification10:string,

    Control11: string,
    Reference11: string,
    Risk11:string,
    Justification11:string,

    Control12: string,
    Reference12: string,
    Risk12:string,
    Justification12:string,

    Control13: string,
    Reference13: string,
    Risk13:string,
    Justification13:string,

    Control14: string,
    Reference14: string,
    Risk14:string,
    Justification14:string,

    Control15: string,
    Reference15: string,
    Risk15:string,
    Justification15:string,

    Control16: string,
    Reference16: string,
    Risk16:string,
    Justification16:string,

    Control17: string,
    Reference17: string,
    Risk17:string,
    Justification17:string,

    Control18: string,
    Reference18: string,
    Risk18:string,
    Justification18:string,

    Control19: string,
    Reference19: string,
    Risk19:string,
    Justification19:string,

    Control20: string,
    Reference20: string,
    Risk20:string,
    Justification20:string,
    ){    
    const controls: controls = {
      _id: null, 
      Control: Control, 
      Reference: Reference, 
      Risk: Risk, 
      Justification: Justification,
      Control1: Control1, 
      Reference1: Reference1, 
      Risk1: Risk1, 
      Justification1: Justification1,
      Control2: Control2, 
      Reference2: Reference2, 
      Risk2: Risk2, 
      Justification2: Justification2,
      Control3: Control3, 
      Reference3: Reference3, 
      Risk3: Risk3, 
      Justification3: Justification3,
      Control4: Control4, 
      Reference4: Reference4, 
      Risk4: Risk4, 
      Justification4: Justification4,
      Control5: Control5, 
      Reference5: Reference5, 
      Risk5: Risk5, 
      Justification5: Justification5,
      Control6: Control6, 
      Reference6: Reference6, 
      Risk6: Risk6, 
      Justification6: Justification6,
      Control7: Control7, 
      Reference7: Reference7, 
      Risk7: Risk7, 
      Justification7: Justification7,
      Control8: Control8, 
      Reference8: Reference8, 
      Risk8: Risk8, 
      Justification8: Justification8,
      Control9: Control9, 
      Reference9: Reference9, 
      Risk9: Risk9, 
      Justification9: Justification9,
      Control10: Control10, 
      Reference10: Reference10, 
      Risk10: Risk10, 
      Justification10: Justification10,
      Control11: Control11, 
      Reference11: Reference11, 
      Risk11: Risk11, 
      Justification11: Justification11,
      Control12: Control12, 
      Reference12: Reference12, 
      Risk12: Risk12, 
      Justification12: Justification12,
      Control13: Control13, 
      Reference13: Reference13, 
      Risk13: Risk13, 
      Justification13: Justification13,
      Control14: Control14, 
      Reference14: Reference14, 
      Risk14: Risk14, 
      Justification14: Justification14,
      Control15: Control15, 
      Reference15: Reference15, 
      Risk15: Risk15, 
      Justification15: Justification15,
      Control16: Control16, 
      Reference16: Reference16, 
      Risk16: Risk16, 
      Justification16: Justification16,
      Control17: Control17, 
      Reference17: Reference17, 
      Risk17: Risk17, 
      Justification17: Justification17,
      Control18: Control18, 
      Reference18: Reference18, 
      Risk18: Risk18, 
      Justification18: Justification18,
      Control19: Control19, 
      Reference19: Reference19, 
      Risk19: Risk19, 
      Justification19: Justification19,
      Control20: Control20, 
      Reference20: Reference20, 
      Risk20: Risk20, 
      Justification20: Justification20,
      
      
      
      
    };
    this.http
    .post<{message: string}>("http://localhost:3000/api/controls/add", controls)
    .subscribe(()=>{
      this.controls.push(controls);
      this.controlsUpdated.next([...this.controls]);
    });
  }
  


  getcontrolsUpdateListener(){
    return this.controlsUpdated.asObservable();
  }
}

