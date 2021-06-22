import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddCaseComponent } from './add-case/add-case.component';
import { AppRoutingModule } from './utils/app-routing.module';
import { NewDataService } from './service/new-data.service';
import { HttpService } from './service/http.service';
import { InfoComponent } from './info/info.component';
import { SortDirective } from './directive/sort.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './utils/material.module';
import { HttpClientModule } from '@angular/common/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SelectPlaceComponent } from './select-place/select-place.component';
import { AddPlaceComponent } from './add-place/add-place.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCaseComponent,
    InfoComponent,
    SortDirective,
    SelectPlaceComponent,
    AddPlaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LeafletModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NewDataService, 
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

