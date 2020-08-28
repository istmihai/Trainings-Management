import { Injectable } from '@angular/core';
import { Training } from './training.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, mergeMap, combineAll, mergeAll, concatAll, flatMap, toArray, share, take } from 'rxjs/operators';
import { trainingInfo } from './trainingInfo.model';
import { Employee } from './employee.model';
import { Observable, concat, forkJoin } from 'rxjs';
import { once } from 'process';
import { database } from 'firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  selectedTraining:Training;
  
  employeeList:Observable<Employee[]>;
  constructor(private db:AngularFirestore,private http:HttpClient) { }
  GetEmplolyees(trainingId:string){
   return this.employeeList=this.db.collection("Trainings").doc(trainingId).collection<trainingInfo>("Employee_Trainings").valueChanges()
    .pipe(
      switchMap(data=>(data.map(
        a=>{
          console.log(1);
         return this.db.collection("Employees").doc<Employee>(a.employeeId).valueChanges().pipe(map(x=>({...x,id:a.employeeId}) ))
          
        }
      ))
    ),mergeAll(),take(1),toArray())
    
}
GetTrainings(){
  return this.db.collection<Training>('Trainings').valueChanges({"idField":"Id"});
  this.db.collection("").doc("").snapshotChanges().subscribe(   )
}
DeleteTraining(training:Training){
  console.log(training.Id)
  this.http.post<Training>(`api/training/delete?trainingId=${training.Id}`,'').subscribe();

}
CreateTraining(training:Training){
  this.http.post<Training>('api/training/add',training).subscribe();
}
EditTraining(training:Training,trainingId:string){
  console.log(trainingId)
  this.http.post<Training>(`api/training/edit?id=${trainingId}`,training).subscribe();
}
}
