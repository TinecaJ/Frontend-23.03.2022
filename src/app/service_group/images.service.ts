import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { images } from './image.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import {  HttpErrorResponse } 
         from  '@angular/common/http';  
import { map } from  'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

serverUrl: string='http://localhost:3000/api/image/files';
serverUrlauth: string='http://localhost:3000/api/image/filesauth';
serverUrldel: string='http://localhost:3000/api/image/remove/';
  private images: images[] = [];// variable for storing data
  private images$=new Subject<images[]>()
  private imagesUpdated = new Subject<images[]>(); //subject acts as a emitter, hence new data is passed through the service and is emtted by this line
  HttpClient: any;
  constructor(private http: HttpClient) { }


  addfile(formData) {
    return this.http.post('http://localhost:3000/api/image/new', formData,{
      reportProgress: true,
      observe: 'events',
      
    });
  }

  getAllimages(){
    return this.http
      .get<{images: images[]}>(this.serverUrl).pipe(
      
        map((imagedata)=>{
          console.log(imagedata)
          return imagedata.images;
          
        })
      ).subscribe((images)=>{
        this.images= images;
        this.images$.next(this.images);
        
      })
    }
        
      getimagestream(){
          return this.images$.asObservable();
      }  


      getAllImagesApi(){
        let API_URL = `${this.serverUrl}`;
        return this.http.get(API_URL)
      }






      getAllimagesauth(){
        return this.http
          .get<{images: images[]}>(this.serverUrlauth).pipe(
          
            map((imagedata)=>{
              console.log(imagedata)
              return imagedata.images;
              
            })
          ).subscribe((images)=>{
            this.images= images;
            this.images$.next(this.images);
            
          })
        }
            
          getimagestreamauth(){
              return this.images$.asObservable();
          }  
    
    
          getAllImagesApiauth(){
            let API_URL = `${this.serverUrlauth}`;
            return this.http.get(API_URL)
          }
    
    
          Deleteimages(userId:string){
            let API_URL = `${this.serverUrldel}`;
            return this.http.get(API_URL + userId)
          }
    
    
  }







