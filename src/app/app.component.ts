import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewDataService } from './service/new-data.service';
import { HttpService } from './service/http.service';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';
import { HttpClient } from '@angular/common/http';
import { PlaceService } from './service/place.service';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png'; 
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

export class report {
  id: number;
  person: string;
  phone: string;

  where: string;
  longitude: number;
  latitude: number;

  dateTime: string;

  extraInfo: string;

  constructor(id: number, name:string, phone: string, where: string, long: number, lat: number, dt: string, info: string){
    this.id = id;
    this.person = name;
    this.phone = phone;

    this.where = where;
    this.longitude = long;
    this.latitude = lat;

    this.dateTime = dt;

    this.extraInfo = info;
  }
}

const caseData: report[] = [
  {id: 0, person: "Steve", phone: "778-789-9876", 
  where: "Metrotown", longitude: -123.0076, latitude: 49.2276, 
  dateTime: "2020-12-03 5:30 pm", extraInfo: "" },

  {id: 1, person: "John", phone: "604-876-5638", 
  where: "Metrotown", longitude: -123.0076, latitude: 49.2276, 
  dateTime: "2020-12-12 2:30 pm", extraInfo: "" },

  {id: 2, person: "Jane", phone: "788-876-6789", 
  where: "SFU Surrey", longitude: -122.8490, latitude: 49.1867, 
  dateTime: "2020-12-06 1:34 pm", extraInfo: "" },

  {id: 3, person: "John", phone: "756-678-6789", 
  where: "SFU Surrey", longitude: -122.8490, latitude: 49.1867, 
  dateTime: "2020-12-22 5:30 am", extraInfo: "" },

  {id: 4, person: "Steve", phone: "778-454-8764", 
  where: "SFU Surrey", longitude: -122.8490, latitude: 49.1867, 
  dateTime: "2020-12-03 6:30 pm", extraInfo: "" },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  data = caseData;
  title: "finalA";
  @ViewChild('gmap') gmapElement;
  private map;

  httpData;
  objectLen;
  where;
  lat; 
  long;
  placeNames;
  count = 0;

  constructor(
    private router: Router,
    private newData: NewDataService,
    public dialog: MatDialog,
    private http: HttpClient,
    private httpService: HttpService,
    private placeService: PlaceService
    ){
      // this.http.delete(storage_server_address).subscribe(
      // (incomingData => console.log(incomingData)));

      this.http.get<Object>(/*storage server*/).subscribe(
      (incomingData)=>{
        this.httpData = incomingData;

        this.objectLen = Object.keys(this.httpData).length;

        if(this.objectLen == 0){
          this.placeService.setData(this.data);
          this.httpService.initializeData(this.data);
        }else{
          this.initializeTable(incomingData);
        }
      }
    )
  }

  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2Vhc2xoIiwiYSI6ImNrbjlmdTg0ODE3N2kycXFwMW1hZzNvZzgifQ.H8swHqy0ibTodCQe3STtFQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  }

  addToMap(){
    for(let i=0; i< this.placeService.getPlaces().length; i++){
      let caseCount = 0;

      for(let j=0; j<this.data.length; j++){
        if(this.data[j].where == this.placeService.getWhereIndex(i)){
          caseCount++;
        }
      }

      L.marker([this.placeService.getLatitudeIndex(i), this.placeService.getLongitudeIndex(i)]).addTo(this.map)
      .bindPopup("<b>"+ this.placeService.getWhereIndex(i) + "</b><br />"+caseCount+" cases reported.").openPopup();
    }
  }

  initializeTable(incomingData){
    this.data = [];
    
    for(let i=0; i<this.objectLen; i++){
      let element = incomingData[i];
      this.data.push(element.data);
    }
    this.addToMap();
  }

  remove(element){
    for(let i=0; i<this.data.length; i++){
      if(this.data[i].id == element){
        this.data.splice(i, 1);
        this.addToMap();
      }
    }
    this.httpService.removeData(element);
  }

  showReportForm(){
    this.router.navigate(['/add-case']);
  }

  moreInfo(id): void{
    this.newData.clearInfoArray();

    for(let i=0; i<this.data.length; i++){
      if(this.data[i].id == id){
        this.newData.setArray(this.data[i]);
        this.dialog.open(InfoComponent, {
          width: '100%',
          height: '100%'
        });
      }
    }
  }

  get addMapBind(){
    return this.addToMap.bind(this);
  }

  get addDataBind(){
    return this.addData.bind(this);
  }

  addData(newDataArray){
    this.where = this.placeService.getWhere();
    this.lat = this.placeService.getLatitude();
    this.long = this.placeService.getLongitude();

    let countArr = [];

    for(let i=0; i<this.data.length; i++){
      console.log(this.data[i])
      console.log(newDataArray)
      if(this.data[i].person == newDataArray.person){
        this.count++;
      }
      if(this.data[i].phone == newDataArray.phone){
        this.count++;
      }
      if(this.data[i].where == this.where){
        this.count++;
      }
      if(this.data[i].longitude == this.long){
        this.count++;
      }
      if(this.data[i].latitude == this.lat){
        this.count++;
      }
      if(this.data[i].dateTime == newDataArray.date + " " + newDataArray.time){
        this.count++;
      }
      countArr.push(this.count);
      this.count = 0;
    }

    console.log(countArr.includes(6));

    if(countArr.includes(6)){
      window.alert("This case already exists in the table: new reports must be unique!");
    }else{
      let id = this.data[this.data.length-1].id + 1;
      let newCase = new report( id, newDataArray.person, newDataArray.phone, this.where, this.long, this.lat, newDataArray.date + " " + newDataArray.time, newDataArray.info);
      this.data.push(newCase);

      this.postNewCase(id);
      this.addToMap();
    }
  }

  postNewCase(id){
    const passData = (this.data[id]);
    this.httpService.postCase(id, passData);
  }
}
