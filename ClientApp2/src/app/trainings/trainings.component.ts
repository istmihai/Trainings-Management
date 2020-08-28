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
@Component({
  selector: 'app-training',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements AfterViewInit ,OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['title', 'description','startdate','enddate','employees','edit','delete'];
  selectedTraining:Training;
  show:boolean=false;
  titleOptions:Observable<string[]>;
  users:Observable<Employee | Employee[]>;
  @ViewChild(MatTable) table: MatTable<Training>;
  @ViewChild(MatSort) sort: MatSort;
  FiltersForm=this.fb.group(
    {Title:[''],
      Location:[''],
      StartDate:[''],
      EndDate:[''],
      Status:['']
  
  
  }
  )
  constructor(private db :AngularFirestore,private fb:FormBuilder, private router:Router,private trainingService:TrainingService) { }
  dataSource :MatTableDataSource<Training>;
  ngAfterViewInit(): void {
    this.trainingService.GetTrainings().subscribe(data=>{
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
    
    this.router.navigate(['trainings/edit']);
  }
  Delete(training:Training){
    
    this.trainingService.DeleteTraining(training);
  }
 
}
