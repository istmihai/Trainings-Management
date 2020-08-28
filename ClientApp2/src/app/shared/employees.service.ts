import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  selectedEmployee:Employee;
  constructor(private db:AngularFirestore) { }
  GetEmployees(){
     return this.db.collection<Employee>('Employees').valueChanges({"idField":"Id"});
  
  
}
  
}
