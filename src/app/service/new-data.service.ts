import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewDataService {
  returnArray: string[] = [];
  returnId: number;
  returnInfoData: string[] = [];


  constructor(
  ) {  }

  setArray(params){
    this.returnInfoData.push(params.where);
    this.returnInfoData.push(params.latitude);
    this.returnInfoData.push(params.longitude);
    this.returnInfoData.push(params.person);
    this.returnInfoData.push(params.phone);
    this.returnInfoData.push(params.dateTime);
    this.returnInfoData.push(params.extraInfo);
  }

  getArray(){
    return this.returnInfoData;
  }

  clearInfoArray(): void{
    this.returnInfoData = [];
  }
}
