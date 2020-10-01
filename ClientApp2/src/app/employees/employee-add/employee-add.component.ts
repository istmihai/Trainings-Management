import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firestore } from 'firebase';
import { EmployeesService } from 'src/app/shared/employees.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { debounceTime, take, map } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  constructor(private fb:FormBuilder,private employeeService:EmployeesService,private afs:AngularFirestore) { }
  employee:Employee;
  roles=['Admin','Employee'];
  CreateUser:FormGroup;
  AddUser(){
    console.log(this.CreateUser.valid);
    console.log(this.CreateUser.value);
    
    this.employee=this.CreateUser.value;
    this.employeeService.AddEmployee(this.employee).subscribe();
   
  }
  ngOnInit(): void {
    this.CreateUser = this.fb.group({
        username:['',[Validators.required,Validators.minLength(6)],this.existingUsername()],
        email:['',[Validators.email,Validators.required],this.existingEmail()],
        firstname:['',[Validators.required]],
        departament:['',[Validators.required]],
        lastname:['',[Validators.required]],
        birthdate:['',[Validators.required]],
        role:['',[Validators.required]]
  
    })
  }
  get username(){
    return this.CreateUser.get('username');
    
  }
  get email(){
    return this.CreateUser.get('email');
  }
 
  existingUsername(initialUsername:string = " "):AsyncValidatorFn{
    return (control : AbstractControl
      ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
        return this.employeeService.CheckUsername(control.value).pipe(debounceTime(500),take(1),map(username=>
        {
            if(username.body.toString().length>0 ) return  of({"error": username.body.toString()}) ;
          
          return null;
        }))
          
      }
  
}
existingEmail(initialEmail:string = " "):AsyncValidatorFn{
  return (control : AbstractControl
    ):
    | Promise<{ [key: string]: any } | null>
    | Observable<{ [key: string]: any } | null> => {
      return this.employeeService.CheckEmail(control.value).pipe(debounceTime(500),take(1),map(email=>
      { 
        console.log(email.body.toString());
          if(email.body.toString().length>0 ) return  of({"error": email.body.toString()}) ;
        
        return null;
      }))
        
    }

}
 
}

