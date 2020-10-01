import { Component, OnInit, AfterViewInit,ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource ,MatTable} from '@angular/material/table';
import { Training } from 'src/app/shared/training.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/employee.model';
import { TrainingService } from 'src/app/shared/training.service';
import { take, map, switchMap, mergeAll, concatAll, flatMap, toArray, share } from 'rxjs/operators';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { trainingInfo } from 'src/app/shared/trainingInfo.model';
@Component({
  selector: 'training-info',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements AfterViewInit,OnInit {
  @Input() trainingId:string;
   training:Training;
  statusList:string[]=[];
  constructor(private db:AngularFirestore ,private trainingService:TrainingService,private router:Router) {
    console.log(this.trainingId) 
  
      
  }
  employees$:Observable<Employee[]>
  info:  Employee[];
  
  ngAfterViewInit(): void {
    console.log(this.info);

    }
    ngOnInit(){
        /*      this.employees$=this.trainingService.GetEmplolyees(this.trainingId);
              this.trainingService.GetEmplolyees(this.trainingId).subscribe(data=>{this.info=data
              console.log(data);
              data.forEach(element => {
                console.log(element.Id)
                  this.GetStatus(element.Id);
              });
              });
             
            */
        
      }
    
  Edit(){
    this.router.navigate(['training/edit']);
  }
  GetStatus(employeeId:string){
    console.log(1);
    var status:string;
    this.db.collection("Employees").doc(employeeId).collection("Training_Employees").doc<trainingInfo>(this.trainingId).valueChanges().subscribe(
     data=>{
      this.statusList.push(data.status)})
     
  }
  trackByUid(index, item:Training) {
    return item.Id;
  }
  getColor(status:string){
    if(status==="Finished") return "green";
    else if(status==="In Progess") return "yellow";
    else return "red";
  }
}