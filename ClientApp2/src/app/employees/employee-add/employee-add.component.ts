import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firestore } from 'firebase';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  employee:Employee;
  CreateUser = this.fb.group({
    username:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      photourl:['',[Validators.required]],
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      birthdate:['',[Validators.required]],
      role:['',[Validators.required]],

  })
  AddUser(){
    this.employee=this.CreateUser.value;
    console.log(this.employee);
    this.http.post<Employee>('api/employee/add',this.employee).subscribe();
    console.log(this.employee)
  }
  ngOnInit(): void {
  }
}
