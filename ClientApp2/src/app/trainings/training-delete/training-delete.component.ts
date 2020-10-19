import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Training } from 'src/app/shared/training.model';

@Component({
  selector: 'app-training-delete',
  templateUrl: './training-delete.component.html',
  styleUrls: ['./training-delete.component.css']
})
export class TrainingDeleteComponent implements OnInit {
  training:Training;
  constructor(private dialogRef:MatDialogRef<TrainingDeleteComponent>,@Inject(MAT_DIALOG_DATA) data) { 
this.training=data;
  }
DeleteTraining()
{
  this.dialogRef.close("Succes");
}
  ngOnInit(): void {
  }

}
