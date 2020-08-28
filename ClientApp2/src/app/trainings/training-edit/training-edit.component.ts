import { Component, OnInit, Input } from '@angular/core';
import { Training } from 'src/app/shared/training.model';
import {Form, FormBuilder } from '@angular/forms';
import { TrainingService } from 'src/app/shared/training.service';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  selectedTraining:Training;
  TrainingForm= this.fb.group({
    Title:[''],
    Description:[''],
    StartDate:[''],
    EndDate:[''],
    Location:[''],
    Status:[''],
    Document:['']

  })
    constructor(private fb:FormBuilder,private trainingService:TrainingService) { 
      this.selectedTraining=this.trainingService.selectedTraining;
      this.TrainingForm.patchValue({
        Title:this.selectedTraining.Title,  
        Description:this.selectedTraining.Description,
        StartDate:this.selectedTraining.StartDate.toDate(),
        EndDate:this.selectedTraining.EndDate.toDate(),
        Location:this.selectedTraining.Location,
        Status:this.selectedTraining.Status,
        Document:this.selectedTraining.Document,
        })
    }
    UpdateTraining(){
     var training:Training=this.TrainingForm.value;
      this.trainingService.EditTraining(this.TrainingForm.value,this.selectedTraining.Id)
    }
  ngOnInit(): void {
  }

}
