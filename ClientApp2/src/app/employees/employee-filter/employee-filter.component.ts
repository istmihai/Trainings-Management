import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { startWith, map, take, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from 'src/app/shared/employee.model';
import { emailVerified } from '@angular/fire/auth-guard';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeSnackbarComponent } from '../employee-snackbar/employee-snackbar.component';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar, private fb:FormBuilder,private dialog:MatDialog, private db:AngularFirestore){
    this.db.collection("EmployeesFilter").doc<any>("Name").valueChanges().subscribe(
      data=>{this.nameOptions=data.Name
      console.log(data.Name);}
    )
    this.db.collection("EmployeesFilter").doc<any>("Username").valueChanges().subscribe(
      data=>{this.usernameOptions=data.Username
      console.log(data.Username);}
    )
    this.db.collection("EmployeesFilter").doc<any>("Email").valueChanges().subscribe(
      data=>{this.emailOptions=data.Email
      console.log(data.Email);}
    )
  }
  FilterForm = this.fb.group(
    {
      username:[''],
      name:[''],
      email:['']

    }
  )
  get username(){
    return this.FilterForm.get('username');
  }
  get name(){
    return this.FilterForm.get('name');
  }
  get email(){
    return this.FilterForm.get('email');
  }
  @Output() Employees$ = new EventEmitter<Observable<Employee[]>>();
  //Employees$: Observable<Employee[]>;
  
  @Input() showButton:boolean=true;

  nameOptions: string[]=[];
  filtredNameOptions: Observable<string[]>;
  emailOptions: string[]=[];
  filtredEmailOptions: Observable<string[]>;
  usernameOptions: string[]=[];
  filtredUsernameOptions: Observable<string[]>;
  ngOnInit() {
   
    this.filtredNameOptions = this.FilterForm.controls['name'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value,this.nameOptions)),
        map(data=>data.slice(0,3))
      );
      this.filtredEmailOptions = this.FilterForm.controls['email'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value,this.emailOptions)),
        map(data=>data.slice(0,3))
      );
      this.filtredUsernameOptions = this.FilterForm.controls['username'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value,this.usernameOptions)),
        map(data=>data.slice(0,3))
      );
  }

  private _filter(value: string,filterOptions: string[]): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterOptions.filter(option => option.toLowerCase().includes(filterValue)));
    return filterOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  ApplyFilter(){
   // this.nameFilter$.next(this.FilterForm.controls["name"].value);
    // this.mailFilter$.next(this.FilterForm.controls["email"].value);
  //  this.usernameFilter$.next(this.FilterForm.controls["username"].value);
   

      this.Employees$.emit(
            this.db.collection<Employee>("Employees",ref=>{
            
            let query : firebase.firestore.Query=ref;
            if(this.name.value){ query=query.where('Firstname',"==",this.name.value.split(' ')[0])};
            if(this.name.value){ query=query.where('Lastname',"==",this.name.value.split(' ')[1])};
            if(this.username.value){query=query.where('Username',"==",this.username.value)};
            if(this.email.value){query=query.where('Email',"==",this.email.value)};
            return query;
          }).valueChanges({"idField":"Id"})
          )
        
      
  }
  openAddDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef=this.dialog.open(EmployeeAddComponent, dialogConfig); 
    dialogRef.afterClosed().subscribe(data=>
      {if(data==="Succes")  this.openSnackBar()}
      )
  }
  openSnackBar() {
    this._snackBar.openFromComponent(EmployeeSnackbarComponent, {
      duration: 3 * 1000,
    });
  }
}
