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

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Employee>;
  displayedColumns = ['email', 'username','edit','delete'];
  employees:Observable<Employee[]>;
  dataSource:MatTableDataSource<Employee>

  constructor(private employeeService:EmployeesService,private http:HttpClient,private router:Router) { 
    this.employeeService.GetEmployees().subscribe(data=>{
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
 this.http.post<Employee>(`api/employee/delete?id=${employee.Id}`,'').subscribe();
  console.log(employee)
  };
  Edit(employee:Employee){
    this.employeeService.selectedEmployee=employee;
    console.log(this.employeeService.selectedEmployee)
    this.router.navigate(['employee/edit'])
  }
  ngOnInit(): void {
  }


}
