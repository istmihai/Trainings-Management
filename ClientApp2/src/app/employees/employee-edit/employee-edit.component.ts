import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { Validators, FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/shared/employees.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee:Employee;
EditEmployeeForm=this.fb.group({
  username:[''],
    email:[''],
    photourl:[''],
    firstname:[''],
    lastname:[''],
    birthdate:[''],
    role:[''],

})
  constructor(private employeeService:EmployeesService,private fb:FormBuilder,private http:HttpClient) { 
    this.employee=employeeService.selectedEmployee;
    console.log(this.employee);
    this.EditEmployeeForm.patchValue({
      username:this.employee.Username,
      email:this.employee.Email,
      photourl:this.employee.PhotoUrl,
      firstname:this.employee.Firstname,
      lastname:this.employee.Lastname,
      birthdate:this.employee.Birthdate.toDate(),
      role:this.employee.Role
    })
  }
 
  ngOnInit(): void {    
  }

  UpdateUser(){
const employee=this.EditEmployeeForm.value;
this.http.post<Employee>('api/employee/update',employee).subscribe();
  }
}
