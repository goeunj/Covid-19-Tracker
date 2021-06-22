import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PlaceService } from '../service/place.service';
import { Router } from '@angular/router'
import { HttpService } from '../service/http.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css']
})
export class AddPlaceComponent implements OnInit {
  show: boolean = true;
  addPlaceForm: FormGroup;
  objectLen;
  places: any = [];
  count:number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private httpService: HttpService,
    private app: AppComponent
  ) { 
  }

  ngOnInit(): void {
    this.addPlaceForm = this.formBuilder.group({
      placeName: new FormControl(null, Validators.required),
      latitude: new FormControl(null, [Validators.required, Validators.pattern('[-+]?([1-8]?\\d(\.\\d+)?|90(\\.0+)?)')]),
      longitude: new FormControl(null, [Validators.required, Validators.pattern('[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)')]),
    })
  }

  onSubmit(): void{
    this.show = !this.show;
    let newPlace = this.addPlaceForm; 
    console.log(this.placeService.getPlaces().length)
    for(let i=0; i<this.placeService.getPlaces().length; i++){
      if(this.placeService.getLatitudeIndex(i) == newPlace.value.latitude && this.placeService.getLongitudeIndex(i) == newPlace.value.longitude){
        this.count++;
      }else if(this.placeService.getNameIndex(i) == newPlace.value.placeName){
        this.count++;
      }
    }
    if(this.count == 0){
      this.placeService.addPlaces(newPlace.value)
      this.app.addMapBind();
      this.postNewPlace();
    }else{
      window.alert("This place already exists: name, longitude and latitude must be unique")
    }
    this.count = 0;
    this.router.navigate(['/']);
  }

  postNewPlace(){
    let place = this.placeService.getPlaces();
    let index = place.length-1;
    let newPlace = place[this.placeService.getPlaces().length-1];
    this.httpService.postPlace(String(index), newPlace);
  }

  

}
