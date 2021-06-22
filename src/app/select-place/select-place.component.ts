import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlaceService } from '../service/place.service';
import { Router } from '@angular/router'
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../service/http.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-select-place',
  templateUrl: './select-place.component.html',
  styleUrls: ['./select-place.component.css']
})
export class SelectPlaceComponent implements OnInit {

  objectLen;
  data: any = [];
  selected: boolean = false;
  getPlaceForm;
  placeForm: FormGroup;
  place: any = [];
  places = [
    {id: "0", name: "SFU Surrey", latitude: 49.1867, longitude:-122.8490},
    {id: "1", name: "Metrotown", latitude: 49.2276, longitude: -123.0076}
  ] ;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private http: HttpClient,
    private httpService: HttpService,
    private app: AppComponent
  ) { 
    this.placeForm = this.formBuilder.group({
      places: ['']
    });

    of(this.getPlaces()).subscribe(places => {
      places = places;
      this.placeForm.controls.places.patchValue(this.places[0].id);
    })
    this.data = this.placeService.getData();

    this.http.get<Object>(/*storage server*/).subscribe(
      (incomingData) => {
        this.objectLen = Object.keys(incomingData).length;
        if(this.objectLen == 0){
          for(let i=0; i<this.places.length; i++){
            this.httpService.postPlace(String(i), this.places[i]);
          }
        }else{
          this.initializePlaces(incomingData);
        }
        this.places = this.placeService.getPlaces();
        this.app.addMapBind();
      });
  }

  ngOnInit(): void {
  }

  initializePlaces(incomingData){
    this.places = [];
    for(let i=0; i<this.objectLen; i++){
      let element = incomingData[i];
      this.places.push(element.data);
    }
    this.placeService.setPlaces(this.places);
  }

  selectedPlace(value){
    this.getPlaceForm = this.placeForm;
    this.selected = true;

    this.placeService.setWhere(this.places[value].name);
    this.placeService.setLatitude(this.places[value].latitude);
    this.placeService.setLongitude(this.places[value].longitude);
  }

  getPlaces(){
    this.place = this.placeService.getPlaces();
  }

  showReportForm(){
    this.router.navigate(['/add-case']);
  }

  showAddPlaceForm(){
    this.router.navigate(['/add-place']);
  }

}
