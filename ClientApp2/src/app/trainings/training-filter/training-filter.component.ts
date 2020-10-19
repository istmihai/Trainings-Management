import { Component, OnInit, Output ,EventEmitter, Input} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Training } from 'src/app/shared/training.model';
import { TrainingAddComponent } from '../training-add/training-add.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-training-filter',
  templateUrl: './training-filter.component.html',
  styleUrls: ['./training-filter.component.css']
})
export class TrainingFilterComponent implements OnInit {
 @Output() Trainings$ = new EventEmitter<Observable<Training[]>>();
@Input() showButton:boolean=false;
  constructor( private fb:FormBuilder,private db:AngularFirestore,public dialog:MatDialog) { 
    this.db.collection("TrainingsFilter").doc<any>("Location").valueChanges().subscribe(
      data=>{this.LocationOptions=data.Location
      console.log(data.Location);}
    )
    this.db.collection("TrainingsFilter").doc<any>("Title").valueChanges().subscribe(
      data=>{this.TitleOptions=data.Title
      console.log(data.Title);}
    )
  }
  TrainingFilter=this.fb.group({
    Title:[''],
    Location:[''],
    Status:[''],
    StartDate:[''],
    EndDate:['']
  })

 get Title(){
   return this.TrainingFilter.get('Title');
 } 
get Location(){
  return this.TrainingFilter.get('Location');
}
get Status(){
  return this.TrainingFilter.get('Status');
}
get StartDate(){
  return this.TrainingFilter.get('StartDate');
}
get EndDate(){
  return this.TrainingFilter.get('EndDate');
}
 TitleOptions: string[]=[];
  filtredTitleOptions: Observable<string[]>;
  LocationOptions: string[]=[];
  filtredLocationsOptions: Observable<string[]>;
  StatusOptions:string[]=["Finished","In Progress","Canceled"];
  ngOnInit(): void {
    this.filtredTitleOptions = this.TrainingFilter.controls['Title'].valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value,this.TitleOptions)),
      map(data=>data.slice(0,3))
    );
    this.filtredLocationsOptions = this.TrainingFilter.controls['Location'].valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value,this.LocationOptions)),
      map(data=>data.slice(0,3))
    );
  }
  private _filter(value: string,filterOptions: string[]): string[] {
    const filterValue = value.toLowerCase();
    console.log(filterOptions.filter(option => option.toLowerCase().includes(filterValue)));
    return filterOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  ApplyFilter(){
    console.log(this.StartDate.value)
    this.Trainings$.emit(
      this.db.collection<Training>("Trainings",ref=>{
      
      let query : firebase.firestore.Query=ref;
      if(this.Title.value){ query=query.where('Title',"==",this.Title.value)};
      if(this.Location.value){query=query.where('Location',"==",this.Location.value)};
      if(this.Status.value){query=query.where('Status',"==",this.Status.value)};
      if(this.StartDate.value){{query=query.where('StartDate',"<=",this.StartDate.value )};}
      return query;
    }).valueChanges({"idField":"Id"})
    )  }
  AddTraining(){
    
      const dialogConfig = new MatDialogConfig();
  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      const dialogRef=this.dialog.open(TrainingAddComponent, dialogConfig); 
      dialogRef.afterClosed().subscribe();
      
    
  }
}
