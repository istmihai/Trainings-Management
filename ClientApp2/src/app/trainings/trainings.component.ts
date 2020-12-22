import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource ,MatTable} from '@angular/material/table';
import { Training } from 'src/app/shared/training.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { TrainingService } from '../shared/training.service';
import { observable, Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { toArray } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { trainingInfo } from '../shared/trainingInfo.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { TrainingEditComponent } from './training-edit/training-edit.component';
import { TrainingDeleteComponent } from './training-delete/training-delete.component';
import { PostFeedbackComponent } from '../reviews/post-feedback/post-feedback.component';
@Component({
  selector: 'app-training',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['title', 'description','startdate','enddate','status','employees','edit','delete','feedback'];
  selectedTraining:Training;
  show:boolean=false;
  trainings:Observable<Training[]>;
  titleOptions:Observable<string[]>;
  users:Observable<Employee | Employee[]>;
  @ViewChild(MatTable) table: MatTable<Training>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource :MatTableDataSource<Training>;

  constructor(public dialog:MatDialog, private db :AngularFirestore,private fb:FormBuilder, private router:Router,private trainingService:TrainingService) { 
    this.trainingService.GetTrainings().subscribe(data=>{
      console.log(data);
      this.dataSource=new MatTableDataSource(data);
    })
  }

  ngOnInit(){
   
  }
 

  trackByUid(index, item:Training) {
    return item.Id;
  }
  Edit(training:Training){
    console.log(training.Id);
    this.trainingService.selectedTraining=training;
    
    this.router.navigate(['training',training.Id]);
  }
  Delete(training:Training){
    
    this.trainingService.DeleteTraining(training).subscribe();
  }
  openEditDialog(training:Training){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=training;
    const dialogRef=this.dialog.open(TrainingEditComponent, dialogConfig); 
    dialogRef.afterClosed().subscribe();
    
  }
  
  openFeedbackDialog(training:Training,){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=training;
    const dialogRef=this.dialog.open(PostFeedbackComponent, dialogConfig); 
    dialogRef.afterClosed().subscribe();
    
  }

  openDeleteTraining(training:Training){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data=training;
    const dialogRef=this.dialog.open(TrainingDeleteComponent, dialogConfig); 
    dialogRef.afterClosed().subscribe(data=>{
      
      if(data) this.trainingService.DeleteTraining(training).subscribe();
    });
    
  }
  receiveTrainings($event){
    this.trainings=$event;
    this.trainings.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
  StatusName(status:string){
    return this.trainingService.GetStatusName(status);
  }
  navigateEmployees(training:Training){
    this.router.navigate([`training/${training.Id}/employees`]);
  }
  
}
