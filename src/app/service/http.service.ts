import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { report } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { 
    // this.http.delete(/*storage server*/).subscribe(
    //   (incomingData => console.log(incomingData)));
  }

  initializeData(data: report[]){
    for(let i=0; i<data.length; i++){
      this.http.post<any>(/*storage server*/, {
      "key": i,
      "data": data[i]
    }).subscribe(
      (incomingData => console.log(incomingData)));
    }
  }

  removeData(element: number){
    this.http.delete(/*storage server*/+element+"/").subscribe(
      (incomingData => console.log(incomingData)));
  }

  postCase(id: number, passData: report){
    this.http.post<any>(/*storage server*/, {
      "key": id,
      "data": passData
    }).subscribe(
      (incomingData => console.log(incomingData)));
  }

  postPlace(id: string, data: {}){
    this.http.post<any>(/*storage server*/, {
      "key": id,
      "data": data
    }).subscribe(
      (incomingData => console.log(incomingData)));
  }
}
