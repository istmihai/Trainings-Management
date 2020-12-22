import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { Review } from 'src/app/shared/review.model';
import { Training } from 'src/app/shared/training.model';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-post-feedback',
  templateUrl: './post-feedback.component.html',
  styleUrls: ['./post-feedback.component.css']
})
export class PostFeedbackComponent implements OnInit {
form:FormGroup;
training:Training;
rating;
  constructor(
    private fb:FormBuilder,
    private trainingSerivice:TrainingService,
    private auth:AuthService,
    private dialogRef:MatDialogRef<PostFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) data)
   { 
     this.training=data;
   }


  ngOnInit(): void {
    this.form=this.fb.group(
      {
        message:['']
      }
    )
  }

  updateRating(rating){
    this.rating=rating;
    console.log(this.rating);
  }

  save() {
  
    this.auth.employee$.subscribe(employee=>{
      const Review:Review={
        trainingId:this.training.Id,
        reviewMessage:this.form.get('message').value,
        employeeId:employee.Id,
        rating:this.rating
      };
      this.trainingSerivice.GiveReview(this.training.Id,Review).subscribe();
    })
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }
}
