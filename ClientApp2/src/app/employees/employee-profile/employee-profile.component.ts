import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Training } from 'src/app/shared/training.model';
import { trainingInfo } from 'src/app/shared/trainingInfo.model';
import { EmployeesService } from 'src/app/shared/employees.service';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  Employee:Employee;
  Trainings: Training[];
  user=false;
 @Input() employeeId:string;
  profileUrl:Observable<string|null>
  EditEmployeeForm=this.fb.group({
    username:[''],
      email:[''],
      photourl:[''],
      firstname:[''],
      lastname:[''],
      birthdate:[''],
      role:[''],
  
  })
  constructor(private route:ActivatedRoute , private auth:AuthService ,  private fb:FormBuilder,private store:AngularFireStorage, private employeeService:EmployeesService) { 
    
  
    
  }

  ngOnInit(): void {
    this.employeeService.GetEmployee(this.employeeId).subscribe(employee=>
      {this.Employee=employee;
        this.EditEmployeeForm.patchValue({
          username:employee.Username,
          email:employee.Email,
          photourl:employee.PhotoUrl,
          firstname:employee.Firstname,
          lastname:employee.Lastname,
          birthdate:employee.Birthdate.toDate(),
          role:employee.Role
        })
        console.log("employee "+this.employeeId);
        const filePath=`Employees/${this.employeeId}/${this.Employee.PhotoUrl}`;
        const ref =this.store.ref(filePath);
        this.profileUrl=  ref.getDownloadURL();
        this.EditEmployeeForm.disable();
      })
       this.auth.employee$.subscribe(data=>
        {
          if(data.Id===this.employeeId) this.user=true;
        })
  }
 
  ProfilePicture(event){
this.employeeService.ChangePhoto(event,this.employeeId); 
 }
}
