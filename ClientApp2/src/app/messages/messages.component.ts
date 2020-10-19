import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { firestore } from 'firebase';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  dataSource = new MatTableDataSource<Message>();
  selection = new SelectionModel<Message>(true, []);
  employeeId:string;
  constructor(private auth: AuthService,private db:AngularFirestore,private http:HttpClient) { }
  displayedColumns: string[] = ['select','timeStamp','message'];
  ngOnInit(): void {
    this.auth.employee$.subscribe(employee=>{
      this.db.collection<Message>(`Employees/${employee.Id}/Messages`,ref=>ref.orderBy('timeStamp','desc')).valueChanges({"idField":"id"}).subscribe(data=>
        {
          this.employeeId=employee.Id;
            this.dataSource=new MatTableDataSource(data);
        })
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Message): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }
  markRead(){
    console.log(this.selection.selected.map(x=>{return x.id}))
    this.http.post(`api/employee/messagesread?employeeId=${this.employeeId}`,this.selection.selected.map(x=>{return x.id})).subscribe();
  }
  delete(){
    this.http.post(`api/employee/messagesdelete?employeeId=${this.employeeId}`,this.selection.selected.map(x=>{return  x.id})).subscribe();

  }
}
interface Message {
  id :string;
  timeStamp:firestore.Timestamp;
  message:string;
}