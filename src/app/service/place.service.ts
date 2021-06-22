import { Injectable } from '@angular/core';
import { report } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor() { }

  clicked: boolean = false;
  places: any = [];
  data;
  where;
  latitude;
  longitude;

  setClicked(){
    this.clicked = true;
  }

  getClicked(): boolean{
    return this.clicked;
  }

  setPlaces(places){
    let place = [];
    for(let i=0; i<places.length; i++){
      place.push(places[i]);
    }

    this.places = place;
  }

  setData(data){
    this.data = data;
  }

  getData(): report[]{
    return this.data;
  }

  setWhere(where){
    this.where = where;
  }

  setLatitude(lat){
    this.latitude = lat;
  }

  setLongitude(long){
    this.longitude = long;
  }

  getWhere(){
    return this.where;
  }

  getLatitude(){
    return this.latitude;
  }

  getLongitude(){
    return this.longitude;
  }

  getWhereIndex(i){
    return this.places[i].name;
  }

  getLatitudeIndex(i){
    return this.places[i].latitude;
  }

  getLongitudeIndex(i){
    return this.places[i].longitude;
  }

  getNameIndex(i){
    return this.places[i].name;
  }

  getPlaces(): []{
    return this.places
  }

  addPlaces(data){
    let count = 0;
    for(let i=0; i< this.places.length; i++){
      if(this.places[i].placeName == data.placeName){
        count++;
      }
    }

    if(count == 0){
      let id = parseInt(this.places.length);
      this.places.push({id: String(id), name: data.placeName, latitude: data.latitude, longitude: data.longitude});
    }
  }
}
