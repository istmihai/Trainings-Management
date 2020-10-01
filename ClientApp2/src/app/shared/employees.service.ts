import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { trainingInfo } from './trainingInfo.model';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  selectedEmployee:Employee;
  constructor(private db:AngularFirestore,private http:HttpClient,private store:AngularFireStorage) { }
  GetEmployees(){
     return this.db.collection<Employee>('Employees').valueChanges({"idField":"Id"});
}
  GetEmployee(id:string){
    return this.db.collection('Employees').doc<Employee>(id).valueChanges();
  }
  AddEmployee(employee:Employee){
   return this.http.post<Employee>("api/employee/add",employee);
  }
  EditEmployee(employee:Employee){
    return this.http.post<Employee>("api/employee/edit",employee);
  }
  DeleteEmployee(id:string){
    return this.http.post<Employee>(`api/employee/delete?id=${id}`,``);
  }
  ChangePhoto(event,id:string){
    const file=event.target.files[0];
    const random =Math.random().toString(12).substring(2)

    const filePath=`Employees/${id}/${random}`;
    const ref =this.store.ref(filePath);
    const task=ref.put(file);
    ref.getDownloadURL().subscribe()
    task.then(()=>
    this.http.post(`api/employee/changephoto?employeeid=${id}&code=${random}`,'').subscribe()
    )
  }
  CheckUsername(username:string){
   return this.http.get(`api/employee/validation/username?username=${username}`,{observe:'response',responseType:'text'})
  }
  CheckEmail(email:string){
    return this.http.get(`api/employee/validation/email?email=${email}`,{observe:'response',responseType:'text'})

  }
  GetStatus(employeeId:string,trainingId:string){

    return this.db.collection("Employees").doc(employeeId).collection("Training_Employees").doc<trainingInfo>(trainingId).valueChanges();
  }
}
