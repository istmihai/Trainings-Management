import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/shared/employee.model';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Employee>;
  signedEmployees:Employee[];
  displayedColumns = [ 'select','firstname','lastname','username','email'];
  employees:Observable<Employee[]>;
  dataSource:MatTableDataSource<Employee>=new MatTableDataSource();
  
    selection = new SelectionModel<Employee>(true, []);
  constructor( public dialogRef:MatDialogRef<EmployeeDialogComponent>, @Inject(MAT_DIALOG_DATA) data:Employee[]) {
   }

  ngOnInit(): void {
    
  }
  close(){
    this.dialogRef.close()
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
  receiveEmployees($event){
    this.employees=$event;
    this.employees.subscribe(data=>{
      
      this.dataSource=new MatTableDataSource(data);
    })}
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }
  test(){
    console.log(this.selection.selected);
    this.dialogRef.close(this.selection.selected);
  }
}

