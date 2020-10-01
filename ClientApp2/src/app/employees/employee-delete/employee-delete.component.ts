import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeesService } from 'src/app/shared/employees.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee:Employee;
  constructor(private employeeService:EmployeesService, private dialogRef:MatDialogRef<EmployeeDeleteComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.employee=data;
   }

  ngOnInit(): void {
  }
  DeleteEmployee(){
    this.employeeService.DeleteEmployee(this.employee.Id).subscribe();
    this.dialogRef.close("Succes");

  }
}
