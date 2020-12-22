import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Employee } from '../shared/employee.model';
import { Review } from '../shared/review.model';
import { TrainingService } from '../shared/training.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  @Input() trainingId:string;
  
  Reviews:Review[];

  ReviewForm:FormGroup;
  Rating:number;

  constructor(private auth:AuthService,private store:AngularFireStorage, private trainingService:TrainingService,private fb:FormBuilder) {
      
    //    this.trainingService.GetReviews(this.trainingId).subscribe(data=>console.log(data));

      
         
  }
  

  ngOnInit(): void {
    
    console.log(this.trainingId);
   //this.Reviews$=  this.trainingService.GetReviews(this.trainingId);
     this.trainingService.GetReviews(this.trainingId).subscribe(data=>{this.Reviews=data;});

  }

 GetProfilePicture(path:string){
  return `url(${path})`;
 }

}
