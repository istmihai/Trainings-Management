import { Pipe, PipeTransform } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Employee } from '../shared/employee.model';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  constructor(private db:AngularFirestore){}
  transform(value: unknown, ...args: unknown[]): void {

    this.db.collection("Employees").doc<Employee>(value as string).valueChanges().pipe(map(x=>{return x.Firstname + " " + x.Lastname})).subscribe(data=>{
      return data;
    })
  
  }

}
