import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from 'src/app/shared/training.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Training } from 'src/app/shared/training.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-trainings',
  templateUrl: './employee-trainings.component.html',
  styleUrls: ['./employee-trainings.component.css']
})
export class EmployeeTrainingsComponent implements OnInit {
  @ViewChild (MatTable) table: MatTable<Training>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource :MatTableDataSource<Training>;
  //displayedColumns = ['title', 'description','startdate','enddate','status'];
  displayedColumns = ['position','title', 'description','status','document'];
  upProcent:Observable<number>;
  spinner=0;
  trainings$:Observable<Training[]>;
  constructor( private trainingService:TrainingService ,private route:ActivatedRoute) { 
    this.route.params.subscribe(params=>
      this.employeeId=params['id']
      
         )
  }
  employeeId:string;
  ngOnInit(): void {
    console.log(this.employeeId);
  
   this.trainingService.GetEmployeeTraining(this.employeeId).subscribe(data=>
    this.dataSource= new MatTableDataSource(data));
    
  }
  uploadDocument(event,training:Training,position:number){
   this.upProcent= this.trainingService.UploadDocument(event,this.employeeId,training.Id);
   console.log(position);
    this.spinner=position;
  }

  downloadDocument(training:Training){
  
    this.trainingService.GetDownloadUrl(this.employeeId,training.Id,training.Document).subscribe()
   
  }
  deleteDocument(training:Training){
    this.trainingService.DeleteDocument(training,this.employeeId);
  }
}
