import { Component, OnInit, Input, Inject } from '@angular/core';
import { Training } from 'src/app/shared/training.model';
import {Form, FormBuilder } from '@angular/forms';
import { TrainingService } from 'src/app/shared/training.service';
import { Employee } from 'src/app/shared/employee.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeEditComponent } from 'src/app/employees/employee-edit/employee-edit.component';

@Component({
  selector: 'app-training-edit',
  templateUrl: './training-edit.component.html',
  styleUrls: ['./training-edit.component.css']
})
export class TrainingEditComponent implements OnInit {
  trainingId:string;
  trainingId$:Observable<string>;
  employees:Observable<Employee[]>;
  TrainingForm= this.fb.group({
    Title:[''],
    Description:[''],
    StartDate:[''],
    EndDate:[''],
    Location:[''],
    Status:[''],
    Document:['']

  })
    constructor(private fb:FormBuilder,private dialogRef:MatDialogRef<EmployeeEditComponent>,@Inject(MAT_DIALOG_DATA) data, private trainingService:TrainingService,private http:HttpClient ) { 
   
          this.trainingId=data.Id;
        
            this.TrainingForm.patchValue({
              Title:data.Title,  
              Description:data.Description,
              StartDate:data.StartDate.toDate(),
              EndDate:data.EndDate.toDate(),
              Location:data.Location,
              Status:data.Status,
              Document:data.Document,
              })
            
        
    
    }
    UpdateTraining(){
     var training:Training=this.TrainingForm.value;
      this.trainingService.EditTraining(this.TrainingForm.value,this.trainingId).subscribe();
    }
    receiveEmployees($event){
      this.employees=$event;
      this.employees.subscribe(data=>{
      })}
     
  ngOnInit(): void {
    
  }

}
