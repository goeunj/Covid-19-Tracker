import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.css']
})
export class AddCaseComponent implements OnInit {
  showForm = true;
  addCaseForm: FormGroup;

  dateValidator: string | null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private app: AppComponent
  ) {
  }

  ngOnInit(): void {
    this.dateValidator = new DatePipe("en-US").transform(new Date(), "yyyy-MM-dd");

    this.addCaseForm = this.formBuilder.group({
      person: new FormControl(null, Validators.required),
      phone: new FormControl(null, [Validators.required, Validators.pattern('^(1-)?\\d{3}-\\d{3}-\\d{4}$')]),
      date: new FormControl(null, [Validators.required, Validators.pattern('((?:19|20)\\d\\d)-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])')]),
      time: new FormControl(null, [Validators.required, Validators.pattern('^((?:1[0-2]|0?\\d)\\:(?:[0-5]\\d)) ([AaPp][Mm])$')]),
      info: new FormControl(""),
    })
  }

  onSubmit(): void{
    this.showForm = !this.showForm;
    let setData = this.addCaseForm; 
   
    this.app.addData(setData.value);
    this.router.navigate(['/']);
  }

}
