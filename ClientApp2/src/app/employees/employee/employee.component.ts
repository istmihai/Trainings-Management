import { Component, OnInit } from '@angular/core';
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
  Employee:Employee;
  Trainings:Training[]=[];
  constructor(private auth:AuthService,private db:AngularFirestore) { 
    this.auth.employee$.subscribe(data=>{
      this.Employee=data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.auth.employee$.subscribe(data=>{
      this.Employee=data;
      console.log(data);
      this.GetTrainings2(data);

     
    })  }
  GetTrainings(employee:Employee){
   
    this.db.collectionGroup<trainingInfo>("Employee_Trainings",ref=>ref.where("employeeId","==",employee.Id)).valueChanges().subscribe(
      data=>{
        data.map(x=>{
          this.db.collection(`Trainings`).doc<Training>(x.id).valueChanges().subscribe(data=>{this.Trainings.push(data)})

        })
      }
    )
  }
  GetTrainings2(employee:Employee){
    this.db.collection("Employees").doc(employee.Id).collection<trainingInfo>("Training_Employees").valueChanges({"idField":"id"}).subscribe(
      data=>{
        data.forEach(element => {
          this.db.collection("Trainings").doc<Training>(element.id).valueChanges().subscribe(
            info=>{
              var aux =info;
              aux.Status=element.status;
              console.log(element.status)
            this.Trainings.push(aux)
            }
          )
        });
      }
    )
    
  }
}
