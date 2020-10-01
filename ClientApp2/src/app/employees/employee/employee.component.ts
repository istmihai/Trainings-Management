import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Employee } from 'src/app/shared/employee.model';
import { Training } from 'src/app/shared/training.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map, mergeAll, toArray, concatAll, combineAll, take } from 'rxjs/operators';
import { trainingInfo } from 'src/app/shared/trainingInfo.model';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  Trainings:Training[]=[];
  employeeId:string
  Loaded:boolean=false;
  constructor(private auth:AuthService,private db:AngularFirestore) { 

  this.auth.employee$.subscribe(data=>
    {
      console.log(data.Id);
      this.employeeId=data.Id;
      this.Loaded=true;
    })
    
  }

  ngOnInit(): void {
  /*  this.auth.employee$.subscribe(data=>{
      this.Employee=data;
      console.log(data);
      this.GetTrainings2(data);

     
    }) */ }
  
}
