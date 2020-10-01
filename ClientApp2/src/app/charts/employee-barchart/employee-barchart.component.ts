import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { status } from '../training-chart/status.mode';
import { multi } from './data';
import { multi2 } from './data2';

@Component({
  selector: 'app-employee-barchart',
  templateUrl: './employee-barchart.component.html',
  styleUrls: ['./employee-barchart.component.css']
})
export class EmployeeBarchartComponent implements OnInit {
  view: any[] = [1000, 400];
  @Input() employeeId:string;
   monthNames:string[] = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
  data=[];
showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Trainings';
  legendTitle: string = 'Status';
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA','#3256a8','#9e32a8']
  };
  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.GetData();
}
GetData(){
  this.db.collection("TrainingStatistics").doc<Stat[]>('2020').valueChanges().pipe(
    map(x=>{
      let data:LineComponent[]=[];
      for(let i=0;i<12;i++){
          let aux:LineComponent={
            name: this.monthNames[i],
            series:[]
          }
          data.push(aux);
      }
      for(let i =1;i<=12;i++){
        if(x[i]){
          let aux:Value={
            name:"Finished",
            value:this.ifNull(x[i].Finished)
          }
          let aux2:Value={
            name:'Canceled',
            value:this.ifNull(x[i].Canceled)
          }
          let aux3:Value={
            name:'Postponed',
            value:this.ifNull(x[i].Postponed)
          }
          let aux4:Value={
            name:'In Progress',
            value:this.ifNull(x[i].InProgress)
          }
          let aux5:Value={
            name:'Not Started',
            value:this.ifNull(x[i].NotStarted)
          }
         data[i-1].series.push(aux,aux2,aux3,aux4,aux5);
        }
        else{
          let aux:Value={
            name:"Finished",
            value:"0"
          }
          let aux2:Value={
            name:'Canceled',
            value:"0"
          }
          let aux3:Value={
            name:'Postponed',
            value:"0"
          } 
            let aux4:Value={
            name:'In Progress',
            value:"0"
          }
          let aux5:Value={
            name:'Not Started',
            value:"0"
          }
         data[i-1].series.push(aux,aux2,aux3,aux4,aux5);
        }
       
    
      }
      return data;
    }
    )
    ).subscribe(data=>{
      console.log(data);
      let aux2:any[]=[];
      aux2=data;
     this.data=aux2;
      
    })
  
 
}
ifNull(value){
  if((value == null)) return 0;
  return value;
}
}

interface LineComponent{
  name:string;
  series:Value[];
}
interface Value {
  name:string;
  value:string;
}

interface Stat{
  Finished:string;
  Postponed:string;
  Canceled:string;
  NotStarted:string;
  InProgress:string;
}