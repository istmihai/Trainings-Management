import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TrainingService } from 'src/app/shared/training.service';
import { HttpClient } from '@angular/common/http';
import { Training } from 'src/app/shared/training.model';

@Component({
  selector: 'app-training-add',
  templateUrl: './training-add.component.html',
  styleUrls: ['./training-add.component.css']
})
export class TrainingAddComponent implements OnInit {

  training:Training;
  TrainingForm= this.fb.group({
    Title:['',Validators.required],
    Description:['',Validators.required],
    StartDate:['',Validators.required],
    EndDate:['',Validators.required],
    Location:['',Validators.required],
    Status:[''],
    Document:['']

  });

  constructor(private fb:FormBuilder,private trainingService:TrainingService,private http:HttpClient) { }
  AddTraining(){
    
    this.training=this.TrainingForm.value;
    this.trainingService.CreateTraining(this.training).subscribe();
  }
  ngOnInit(): void {
  }


}
