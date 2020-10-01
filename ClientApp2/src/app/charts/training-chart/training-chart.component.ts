import { Component, OnInit, Input } from '@angular/core';

import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { status } from './status.mode';
import { TrainingStatus } from './training.chart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training-chart',
  templateUrl: './training-chart.component.html',
  styleUrls: ['./training-chart.component.css']
})
export class TrainingChartComponent implements OnInit {
  @Input() trainingId:string;
  single: TrainingStatus[]=[
    {"name":"Finished","value":0},
      {"name":"In Progess","value":0},
      {"name":"Canceled","value":0}
    ]
  view: any[] = [500, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(
  private db:AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    console.log(this.trainingId);
    
    this.db.collection("Trainings").doc(this.trainingId).collection("Stats").doc<status>("Stats").valueChanges().subscribe(
      data=>{
        console.log(data);
          let aux=[
            {"name":"Finished","value":data.Finished},
              {"name":"In Progress","value":data.InProgress },
              {"name":"Canceled","value":data.Canceled},
           
            ]
            this.single=aux;
      }
    )
  }

}
