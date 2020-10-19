import { Injectable } from '@angular/core';
import { Training } from './training.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, mergeMap, combineAll, mergeAll, concatAll, flatMap, toArray, share, take, first, last, finalize } from 'rxjs/operators';
import { trainingInfo } from './trainingInfo.model';
import { Employee } from './employee.model';
import { Observable, concat, forkJoin, combineLatest, defer, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { once } from 'process';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  selectedTraining:Training;
  
  employeeList:Observable<Employee[] | Employee>;
  constructor(private db:AngularFirestore,private http:HttpClient,private store:AngularFireStorage) { }
  GetEmplolyees(trainingId:string){
    const EmployeeList = defer(()=>{
      return this.db.collection("Trainings").doc(trainingId).collection<trainingInfo>("Employee_Trainings").valueChanges().pipe(
        switchMap(data=>{
          if(data.length<1){return of(null) }
         const doc=  data.map(a=>{return this.db.collection("Employees").doc<Employee>(a.employeeId).valueChanges().pipe(map(x=>{
           var aux = x;
           aux.Id=a.employeeId;
          aux.Status=a.status;
           return aux;
         }))});
         
   return combineLatest(doc);}
        )
        )
      
    })
    EmployeeList.subscribe(data=>console.log(data));
    return EmployeeList;
   }
   
  
    
generateRaport(trainingId:string){
 return this.http.get(`/api/training/raport?trainingId=${trainingId}`,{responseType:'blob'});
}
generateRaportDepartament(departament:string,year:string){
  return this.http.get(`/api/training/reportDepartament?departament=${departament}&year=${year}`,{responseType:'blob'});
 }
GetTrainings(){
  return this.db.collection<Training>('Trainings').valueChanges({"idField":"Id"});
  this.db.collection("").doc("").snapshotChanges().subscribe(   )
}
GetTraining(id:string){
  return this.db.collection("Trainings").doc<Training>(id).valueChanges()
}
UploadDocument(event,employeeId:string,trainingId:string){
  const file=event.target.files[0];
  const random =Math.random().toString(12).substring(2)
  const filePath=`Employees/${employeeId}/training/${trainingId}_${random}.pdf`;
  const ref =this.store.ref(filePath);
  const task=this.store.upload(filePath,file );
 task.snapshotChanges().pipe(
    finalize(()=>  this.http.post(`api/training/document?trainingId=${trainingId}&employeeId=${employeeId}&code=${random}`,'').subscribe())
  ).subscribe();
  
  return task.percentageChanges();

}
DeleteDocument(training:Training,employeeId:string){
  this.store.storage.refFromURL(training.Document).delete().then(()=>
  this.http.post(`api/training/document?trainingId=${training.Id}&employeeId=${employeeId}&code=`,'').subscribe()
  )

}
GetDownloadUrl(employeeId:string,trainingId:string,code:string){
  const filePath=`Employees/${employeeId}/training/${trainingId}_${code}.pdf`;
  const ref =this.store.ref(filePath);
  return  ref.getDownloadURL();
}
DeleteTraining(training:Training){
  console.log(training.Id)
 return this.http.post<Training>(`api/training/delete?trainingId=${training.Id}`,'');

}
AddEmployee(trainingId:string,employeeId:string){
  return this.http.post(`api/training/addemployee?trainingId=${trainingId}&employeeId=${employeeId}`,'');
}
RemoveEmployee(trainingId:string,employeeId:string){
  return this.http.post(`api/training/removeemployee?trainingId=${trainingId}&employeeId=${employeeId}`,'');

}
CreateTraining(training:Training){
 return this.http.post<Training>('api/training/add',training);
}
EditTraining(training:Training,trainingId:string){
  console.log(trainingId)
 return this.http.post<Training>(`api/training/edit?id=${trainingId}`,training);;
}
ChangeStatus(trainingId:string,employeeId:string,status:string){
  return this.http.post(`api/training/update?trainingId=${trainingId}&employeeId=${employeeId}&status=${status}`,'');
}

GetEmployeeTraining(employeeId:string){
  console.log(employeeId);
 return defer(()=>{
    return this.db.collection("Employees").doc(employeeId).collection<trainingInfo>("Training_Employees").snapshotChanges().pipe(
      switchMap(data=>{
       console.log(data);

       const doc=  data.map(a=>{return this.db.collection("Trainings").doc<Training>(a.payload.doc.id).valueChanges().pipe(map(x=>{
      
        let aux:Training = x;
      
      aux.Id=a.payload.doc.id;
       this.GetDownloadUrl(employeeId,x.Id,a.payload.doc.data().Document).subscribe(data=>aux.Document=data );
       aux.Status=a.payload.doc.data().status;
         return aux;
       }))});
      
 return combineLatest(doc);}
      )
      )
    
  })
}

GetStatusName(status:string){
  if(status==="NotStarted") return "Not started";
  if(status==="InProgress") return "In progress";
  else return status;
}
}
