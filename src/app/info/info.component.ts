import { Component, OnInit } from '@angular/core';
import { NewDataService } from '../service/new-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  extrainfo: string[] = [];

  constructor(
    private service: NewDataService,
    public dialogRef: MatDialogRef<InfoComponent>
  ) { 
    this.extrainfo = this.service.getArray();
  }

  ngOnInit(): void {
  }

  close(){
    this.extrainfo = [];
    this.service.clearInfoArray();
    this.dialogRef.close();
  }
}
