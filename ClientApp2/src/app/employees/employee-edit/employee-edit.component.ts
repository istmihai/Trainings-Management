import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { Validators, FormBuilder } from '@angular/forms';
import { EmployeesService } from 'src/app/shared/employees.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from 'src/app/shared/training.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
showTrainings:boolean=false;
roles=['Admin','Employee'];

  employee:Employee;
  Training:Training;
  SelectedTrainings:Observable<Training[]>;
EditEmployeeForm=this.fb.group({
  username:[''],
    email:[''],
    photourl:[''],
    firstname:[''],
    lastname:[''],
    birthdate:[''],
    role:[''],
    departament:[''],

})
  constructor(private employeeService:EmployeesService,private fb:FormBuilder,private dialogRef:MatDialogRef<EmployeeEditComponent>,@Inject(MAT_DIALOG_DATA) data) { 
    this.employee=data;
  
  }
 
  ngOnInit(): void {   
    this.EditEmployeeForm.patchValue({
      username:this.employee.Username,
      email:this.employee.Email,
      photourl:this.employee.PhotoUrl,
      firstname:this.employee.Firstname,
      lastname:this.employee.Lastname,
      departament:this.employee.Departament,
      birthdate:this.employee.Birthdate.toDate(),
      role:this.employee.Role
    })
  }

  UpdateUser(){
const employee=this.EditEmployeeForm.value;
    console.log(employee);
    this.employeeService.EditEmployee(employee).subscribe();
    this.dialogRef.close("Succes");
}
 
  
}
