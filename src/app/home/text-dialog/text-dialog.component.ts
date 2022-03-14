import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {AppService} from "../../app.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-text-dialog',
  templateUrl: './text-dialog.component.html',
  styleUrls: ['./text-dialog.component.scss']
})
export class TextDialogComponent implements OnInit {
  text = new FormControl('');
  id = null;
  constructor(private appService: AppService,
              public dialogRef: MatDialogRef<TextDialogComponent>,) { }

  ngOnInit() {
    this.appService.getMainText().subscribe(data => {
      this.text.patchValue(data.text);
      this.id = data.id;
    })
  }

  changeText() {
      this.appService.updatetMainText(this.id, {text: this.text.value}).subscribe(
        data => {
          this.dialogRef.close();
        }
      );
  }

}
