import { Component, OnInit, Input } from '@angular/core';
import { TrainingStatus } from '../training-chart/training.chart.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, reduce, take } from 'rxjs/operators';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.css']
})
export class EmployeeChartComponent implements OnInit {
  @Input() employeeId:string;
  constructor(private db:AngularFirestore) { this.db.doc(`Employees/${this.employeeId}/Statistics/2020`).valueChanges().subscribe(data=>
    console.log(this.employeeId)
  )}
  single: TrainingStatus[]=[
    {"name":"Finished","value":0},
      {"name":"In Progess","value":0},
      {"name":"Canceled","value":0}
    ]
  view: any[] = [500, 400];

    gradient: boolean = true;
    showLegend: boolean = true;
    showLabels: boolean = true;
    isDoughnut: boolean = false;
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
      ngOnInit(): void {
    this.db.collection("Employees").doc(this.employeeId).collection('Statistics').doc<Status[]>((new Date().getFullYear()).toString()).valueChanges().pipe(take(1)).subscribe(
      data=>{ let aux = data;
        let auxStatus:TrainingStatus[]=[
          {"name":"Finished","value":0},
            {"name":"In Progess","value":0},
            {"name":"Canceled","value":0}
          ];
              for(let i=1;i<=12;i++){
                console.log(data);
                if(data[i]) {

                  if(data[i].Finished)  auxStatus[0].value+=parseInt(data[i].Finished);
                   if(data[i].InProgress) auxStatus[1].value+=parseInt(data[i].InProgress);
                   if(data[i].Canceled) auxStatus[2].value+=parseInt(data[i].Canceled);
                }
              }
              this.single=auxStatus;
      }
    )
       
      
    
  }

}
interface Status {
  InProgress:string;
  Canceled:string;
  Finished:string;
}