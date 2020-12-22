import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { combineAll, first, map, mergeAll, switchMap, take, toArray } from 'rxjs/operators';
import { Employee } from '../shared/employee.model';
import { LogEvent } from '../shared/event.model';
import { Training } from '../shared/training.model';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {
  displayedColumns: string[] = ['LogLevel','Date', 'Action', 'Message']
  dataSource = new MatTableDataSource<LogEvent>();
  last:LogEvent;
  query:firebase.firestore.Query;
  LogsFilter = this.fb.group(
    {
      Action:[],
      TimeRange:[],
      LogLevel:[],
      Pagination:[5]
    }
  );
  constructor(private db:AngularFirestore,private fb:FormBuilder) { }
Actions=['TrainingCreate','TrainingEdit'];
LogLevels=['Information','Warning'];
  ngOnInit(): void {
      this.db.collection<LogEvent>("Events",ref=>ref.limit(this.Pagination.value).orderBy("TimeStamp")).valueChanges().pipe(take(1),
      switchMap(data=>{
        const doc = data.map(
          a=>{ 
            if(a.ObjectId.employeeId) this.db.collection("Employees").doc<Employee>(a.ObjectId.employeeId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
            
              a.Message=a.Message.replace(a.ObjectId.employeeId,data);
              
              return a;
            })
            if(a.ObjectId.adminId)  this.db.collection("Employees").doc<Employee>(a.ObjectId.adminId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
               a.Message=a.Message.replace(a.ObjectId.adminId,data);
               
               return a;
             })
             if(a.ObjectId.trainingId)  this.db.collection("Trainings").doc<Training>(a.ObjectId.trainingId).valueChanges().pipe(map(x=>`${x.Title} `)).subscribe(data=>{
               a.Message=a.Message.replace(a.ObjectId.trainingId,data);
               
               return a;
             })
            return a;
          }
        
        );
        return doc;} ),toArray()
      ).subscribe(
      data=>{
        if(data.length>0){
        console.log(data,this.Pagination.value);
        this.dataSource=new MatTableDataSource(data);
       
        this.last=data[data.length-1];
        }
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
      if(this.Time.value) query=query.where('TimeStamp','<=',new Date(this.Time.value.getFullYear(),this.Time.value.getMonth(),this.Time.value.getDate()+1)).where('TimeStamp','>',new Date(this.Time.value.getFullYear(),this.Time.value.getMonth(),this.Time.value.getDate()))
                          
      if(this.LogLevel.value) query=query.where("LogLevel","==",this.LogLevel.value);
       query= query.limit(this.Pagination.value).orderBy("TimeStamp",'desc');
       this.query=query;
       console.log(query);
      return query;
    }).valueChanges().pipe(take(1),
    switchMap(data=>{
      const doc = data.map(
        a=>{ 
          if(a.ObjectId.employeeId) this.db.collection("Employees").doc<Employee>(a.ObjectId.employeeId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
          
            a.Message=a.Message.replace(a.ObjectId.employeeId,data);
            
            return a;
          })
          if(a.ObjectId.adminId)  this.db.collection("Employees").doc<Employee>(a.ObjectId.adminId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.adminId,data);
             
             return a;
           })
           if(a.ObjectId.trainingId)  this.db.collection("Trainings").doc<Training>(a.ObjectId.trainingId).valueChanges().pipe(map(x=>`${x.Title} `)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.trainingId,data);
             
             return a;
           })
          return a;
        }
      
      );
      return doc;} ),toArray()
    ).subscribe(
        data=>{    if(data.length>0){
          this.dataSource=new MatTableDataSource(data)
        
              this.last=data[data.length-1];
        }
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
    }).valueChanges().pipe(take(1),
    switchMap(data=>{
      const doc = data.map(
        a=>{ 
          if(a.ObjectId.employeeId) this.db.collection("Employees").doc<Employee>(a.ObjectId.employeeId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
          
            a.Message=a.Message.replace(a.ObjectId.employeeId,data);
            
            return a;
          })
          if(a.ObjectId.adminId)  this.db.collection("Employees").doc<Employee>(a.ObjectId.adminId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.adminId,data);
             
             return a;
           })
           if(a.ObjectId.trainingId)  this.db.collection("Trainings").doc<Training>(a.ObjectId.trainingId).valueChanges().pipe(map(x=>`${x.Title} `)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.trainingId,data);
             
             return a;
           })
          return a;
        }
      
      );
      return doc;} ),toArray()
    ).subscribe(
        data=>{ 
          if(data.length>0){
              this.last=data[data.length-1];
              this.dataSource=new MatTableDataSource(data)
              console.log(data);
              }
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
    }).valueChanges().pipe(take(1),
    switchMap(data=>{
      const doc = data.map(
        a=>{ 
          if(a.ObjectId.employeeId) this.db.collection("Employees").doc<Employee>(a.ObjectId.employeeId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
          
            a.Message=a.Message.replace(a.ObjectId.employeeId,data);
            
            return a;
          })
          if(a.ObjectId.adminId)  this.db.collection("Employees").doc<Employee>(a.ObjectId.adminId).valueChanges().pipe(map(x=>`${x.Firstname} ${x.Lastname}`)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.adminId,data);
             
             return a;
           })
           if(a.ObjectId.trainingId)  this.db.collection("Trainings").doc<Training>(a.ObjectId.trainingId).valueChanges().pipe(map(x=>`${x.Title} `)).subscribe(data=>{
             a.Message=a.Message.replace(a.ObjectId.trainingId,data);
             
             return a;
           })
          return a;
        }
      
      );
      return doc;} ),toArray()
    ).subscribe(
        data=>{   if(data.length>0){
          this.dataSource=new MatTableDataSource(data)
         
              this.last=data[data.length-1];
        }
              console.log(data);
        }
    )
  }
  formatMessage(Log:LogEvent){
    let message = Log.Message;
    if(Log.ObjectId.employeeId){
       this.db.collection("Employees").doc<Employee>(Log.ObjectId.adminId).valueChanges().pipe(map(x=>x.Firstname+' '+x.Lastname )).subscribe(data=>{
         message=message.replace(Log.ObjectId.employeeId,data);
       })
    }
    return message
  }
}
