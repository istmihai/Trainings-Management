import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { first, take } from 'rxjs/operators';
import { LogEvent } from '../shared/event.model';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  displayedColumns: string[] = ['Date', 'Action', 'Message']
  dataSource = new MatTableDataSource<LogEvent>();
  last:LogEvent;
  query:firebase.firestore.Query;
  LogsFilter = this.fb.group(
    {
      Action:[],
      TimeRange:[],
      LogLevel:[],
      Pagination:[2]
    }
  );
  constructor(private db:AngularFirestore,private fb:FormBuilder) { }
Actions=['TrainingCreate','TrainingEdit'];
LogLevels=['Information','Warning'];
  ngOnInit(): void {
      this.db.collection<LogEvent>("Events",ref=>ref.limit(this.Pagination.value).orderBy("TimeStamp")).valueChanges().pipe(take(1)).subscribe(
      data=>{
        this.dataSource=new MatTableDataSource(data);
        this.last=data[data.length-1];
      }
      )

  }
  get Action(){
    return this.LogsFilter.get('Action');
  }
  get Time(){
    return this.LogsFilter.get('TimeRange');
  }
  get LogLevel(){
    return this.LogsFilter.get('LogLevel');
  }
  get Pagination(){
    return this.LogsFilter.get('Pagination');
  }

  Filter(){
    console.log(this.last);
    this.db.collection<LogEvent>("Events",ref=>{
      let query : firebase.firestore.Query=ref;
      if(this.Action.value) query=query.where('Action','==',this.Action.value);
      if(this.Time.value) query=query.where('TimeStamp','<=',this.Time.value);
      if(this.LogLevel.value) query=query.where("LogLevel","==",this.LogLevel.value);
       query= query.limit(this.Pagination.value).orderBy("TimeStamp",'desc');
       this.query=query;
      return query;
    }).valueChanges().pipe(take(1)).subscribe(
        data=>{  this.dataSource=new MatTableDataSource(data)
              this.last=data[data.length-1];
        }
    )
    
  }
  nextPage(){
    console.log(this.last);
    this.db.collection<LogEvent>("Events",ref=>{
      let query : firebase.firestore.Query=ref;
     if(this.Action.value) query=query.where('Action','==',this.Action.value);
      if(this.Time.value) query=query.where('TimeStamp','<=',this.Time.value);
      if(this.LogLevel.value) query=query.where("LogLevel","==",this.LogLevel.value);
    query= query.orderBy("TimeStamp").startAfter(this.last.TimeStamp).limit(this.Pagination.value);
    this.query=query; 
      console.log("pag",this.Pagination.value)
       console.log(query);
      return query;
    }).valueChanges().pipe(take(1)).subscribe(
        data=>{  this.dataSource=new MatTableDataSource(data)
              this.last=data[data.length-1];
              console.log(data);
        }
    )
  }
  lastPage(){
    this.db.collection<LogEvent>("Events",ref=>{
      let query : firebase.firestore.Query=ref;
      if(this.Action.value) query=query.where('Action','==',this.Action.value);
      if(this.Time.value) query=query.where('TimeStamp','<=',this.Time.value);
      if(this.LogLevel.value) query=query.where("LogLevel","==",this.LogLevel.value);
       query= query.orderBy("TimeStamp").endBefore(this.last.TimeStamp).limitToLast(this.Pagination.value);
       this.query=query;
       console.log(this.query)
      return query;
    }).valueChanges().pipe(take(1)).subscribe(
        data=>{  this.dataSource=new MatTableDataSource(data)
              this.last=data[data.length-1];
              console.log(data);
        }
    )
  }
}
