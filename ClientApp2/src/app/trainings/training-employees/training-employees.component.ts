import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, merge, combineLatest, forkJoin } from 'rxjs';
import { TrainingService } from 'src/app/shared/training.service';
import { Training } from 'src/app/shared/training.model';
import { Employee } from 'src/app/shared/employee.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EmployeesService } from 'src/app/shared/employees.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { take, switchMap, map, toArray, mergeAll, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { strict } from 'assert';
import { sign } from 'crypto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-training-employees',
  templateUrl: './training-employees.component.html',
  styleUrls: ['./training-employees.component.css']
})
export class TrainingEmployeesComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<Employee>;
  @ViewChild(MatSort) sort: MatSort;
 displayedColumns = [ 'firstname','lastname','username','email','status','delete'];

 employees:Observable<Employee[]>;
  dataSource: MatTableDataSource<Employee>;
  AddNew: boolean=false;
  trainingId:string;
  status:status[]=[
    { value:"Finished" , viewValue:"Finished"},
    {value :"InProgress",viewValue:"In progress"},
    {value:"Canceled",viewValue:"Canceled"}
  ];
  trainingId$:Observable<string>;
  training:Observable<Training>;
  TrainingForm= this.fb.group({
    Title:[''],
    Description:[''],
    StartDate:[''],
    EndDate:[''],
    Location:[''],
    Status:[''],
    Document:['']

  })
  signedEmployees:Employee[];
  employees$:Observable<Employee[]>
  constructor(private sanitizer: DomSanitizer, private dialog:MatDialog,private fb:FormBuilder, private route:ActivatedRoute,private employeeService:EmployeesService, private trainingService:TrainingService,private em:EmployeesService) { 
  /*  this.route.params.subscribe(params=>
      {
        this.trainingId=params['id'];
        this.trainingId$=of(params['id']);
     
      let employees=  this.trainingService.GetEmplolyees(this.trainingId);
        console.log(employees);
         this.dataSource= new MatTableDataSource( employees);
       //  this.dataSource.paginator = this.paginator;
         this.dataSource.sort=this.sort;
        console.log(this.dataSource)
      })*/
      this.route.params.subscribe(params=>
        {
          this.trainingId=params['id'];
          this.trainingId$=of(params['id']);
          this.trainingService.GetTraining(this.trainingId).subscribe(data=>{
            this.TrainingForm.patchValue({
              Title:data.Title,  
              Description:data.Description,
              StartDate:data.StartDate.toDate(),
              EndDate:data.EndDate.toDate(),
              Location:data.Location,
              Status:data.Status,
              Document:data.Document,
              })
          });
          this.TrainingForm.disable();
        })
       
     }
    
  

        AddEmployee(){
          console.log("1");
         var EmployeesTo:Employee[]=[];
          const dialogConfig=new MatDialogConfig();
          dialogConfig.disableClose=true;
          dialogConfig.autoFocus=true;
          const dialogRef=this.dialog.open(EmployeeDialogComponent,dialogConfig);

          dialogRef.afterClosed().subscribe(data=>{
           data.forEach(element => {
             EmployeesTo.push(element)
           })
           EmployeesTo.forEach(element => {
             this.trainingService.AddEmployee(this.trainingId,element.Id).subscribe();
           });
          })
         
        }
  ngOnInit(): void {
    this.trainingService.GetEmplolyees(this.trainingId).pipe(tap(data=>console.log(data))).subscribe(data=>{
          

      this.dataSource= new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
     console.log(this.dataSource.data)})
     
    }
  ngAfterViewInit():void{
   
  }
  trackByUid(index, item) {
    return item.Id;
  }
  Delete(employee:Employee){
    console.log(this.dataSource.data);
    this.trainingService.RemoveEmployee(this.trainingId,employee.Id).subscribe();
    this.dataSource._updateChangeSubscription();
  };
  Edit(employee:Employee){};
  
    changeStatus(event,employee:Employee){
      console.log(event);
      this.trainingService.ChangeStatus(this.trainingId,employee.Id,event).subscribe(
        
      )
    }
    getColor(status:string){
      if(status==="Finished") return "green";
      else if(status==="InProgress") return "yellow";
      else return "red";
    }
    test(){
    this.trainingService.generateRaport(this.trainingId).subscribe(data=>
     { const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(data)
      a.href = objectUrl
      a.download = 'test.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);}
    )
    }
}
interface status {
  value:string;
  viewValue:string;
}