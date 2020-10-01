import { query } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Training } from 'src/app/shared/training.model';

@Component({
  selector: 'app-trainings-inprogress',
  templateUrl: './trainings-inprogress.component.html',
  styleUrls: ['./trainings-inprogress.component.css']
})
export class TrainingsInprogressComponent implements OnInit {
  @Input() status:string;
  @Input() title:string;
  @ViewChild(MatTable) table: MatTable<Training>;
  @ViewChild(MatSort) sort: MatSort;
  dataSource :MatTableDataSource<Training>;
  displayedColumns = ['title', 'description','startdate','enddate','employees'];

  constructor(private db: AngularFirestore,private router:Router) { }

  ngOnInit(): void {
    const trainingRef=this.db.collection<Training>("Trainings",ref=>ref.where("Status","==",this.status)).valueChanges({"idField":"Id"}).subscribe(
      data=>{this.dataSource=new MatTableDataSource(data)
      console.log(this.status)}
    );
    
  }
  navigateEmployees(training:Training){
    this.router.navigate([`training/${training.Id}/employees`]);
  }
}
