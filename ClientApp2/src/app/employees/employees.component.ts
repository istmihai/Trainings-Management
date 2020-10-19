import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeesService } from '../shared/employees.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { matSelectAnimations } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { EmployeeSnackbarComponent } from './employee-snackbar/employee-snackbar.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Employee>;
  displayedColumns = [ 'firstname','lastname','username','email','departament','trainings','edit','delete'];
  employees:Observable<Employee[]>;
  dataSource:MatTableDataSource<Employee>
  durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar, public dialog:MatDialog, private employeeService:EmployeesService,private http:HttpClient,private router:Router) { 
    this.employeeService.GetEmployees().pipe(take(1)).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })}
    openSnackBar() {
      this._snackBar.openFromComponent(EmployeeSnackbarComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  
    openEditDialog(employee:Employee){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data=employee;
      const dialogRef=this.dialog.open(EmployeeEditComponent, dialogConfig); 
      dialogRef.afterClosed().subscribe(data=>
        {if(data==="Succes") this.openSnackBar()}
        )
    }
    openDeleteDialog(employee:Employee){
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data=employee;
      const dialogRef=this.dialog.open(EmployeeDeleteComponent, dialogConfig); 
      dialogRef.afterClosed().subscribe(data=>
        { console.log(data);
          if(data==="Succes") this.openSnackBar()}
        )
    }
  receiveEmployees($event){
    this.employees=$event;
    this.employees.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    })
    
  }
  ngAfterViewInit(): void {
this.employeeService.GetEmployees().subscribe(data=>{
  this.dataSource=new MatTableDataSource(data);
})

  }
  Delete(employee:Employee){
    console.log(employee);
 this.http.post<Employee>(`api/employee/delete?Id=${employee.Id}`,'').subscribe();
  console.log(employee)
  };
  navigateTrainings(employee:Employee){
    this.router.navigate(['employee',employee.Id,'trainings'])
  }
  Edit(employee:Employee){
    this.employeeService.selectedEmployee=employee;
    console.log(this.employeeService.selectedEmployee)
    this.router.navigate(['employee',employee.Id]);
  }
  ngOnInit(): void {
  }


}
