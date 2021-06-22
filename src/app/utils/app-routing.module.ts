import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { AddCaseComponent } from '../add-case/add-case.component';
import { RouterModule, Routes } from '@angular/router'
import { InfoComponent } from '../info/info.component';
import { AddPlaceComponent } from '../add-place/add-place.component';
import { SelectPlaceComponent } from '../select-place/select-place.component';

const routes: Routes=[
  {path: 'app-root', component:AppComponent},
  {path: 'add-case', component:AddCaseComponent},
  {path: 'info', component: InfoComponent},
  {path: 'select-place', component: SelectPlaceComponent},
  {path: 'add-place', component: AddPlaceComponent}
]
;
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
