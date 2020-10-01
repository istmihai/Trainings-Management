import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Employee } from '../shared/employee.model';
import { Training } from '../shared/training.model';
import { TrainingService } from '../shared/training.service';

@Component({
  selector: 'app-charts-general',
  templateUrl: './charts-general.component.html',
  styleUrls: ['./charts-general.component.css']
})
export class ChartsGeneralComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EmployeeT>;
  dataSource:MatTableDataSource<EmployeeT>;
  displayedColumns = [ 'firstname','lastname','username','email','status','training'];
  trainingNames=new Map();
  single: any=[];
  public view: any[] = [1000, 400];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel: "Years";
  public showYAxisLabel = true;
  public yAxisLabel: "Salary";
  public graphDataChart: any[];
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  isGroup(index, item): boolean{
    return item.isGroupBy;
  }

  constructor(private fb :FormBuilder, private db: AngularFirestore ,private trainingService:TrainingService) { }
  date=new Date();
  monthNames:string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  Years=['2020','2019'];
  Departaments=['Departament1','Departament2','Departament3'];
  ChartsFilter=this.fb.group({
    Departament:['Departament1'],
    Year:['2020'],
    Status:['']
  })
  ngOnInit(): void {
    this.GetData();
  }
  get Year(){
    return this.ChartsFilter.get('Year');
  }
  get Departament(){
    return this.ChartsFilter.get('Departament');
  }
  GetData(){
    this.db.collection("Departaments").doc(this.Departament.value).collection("Statistics").doc<Stat[]>(this.Year.value).valueChanges().pipe(
      map(x=>{
        let Finished:LineComponent={
          name:"Finished",
          series:[]
        }
        let Canceled:LineComponent={
          name:"Canceled",
          series:[]
        }
        let Postponed:LineComponent={
          name:"Postponed",
          series:[]
        }
        for(let i =1;i<=12;i++){
          if(x[i]){
            let aux:Value={
              name:this.monthNames[i-1],
              value:this.ifNull(x[i].Finished)
            }
            let aux2:Value={
              name:this.monthNames[i-1],
              value:this.ifNull(x[i].Canceled)
            }
            let aux3:Value={
              name:this.monthNames[i-1],
              value:this.ifNull(x[i].Postponed)
            }
            Finished.series.push(aux);
            Canceled.series.push(aux2);
            Postponed.series.push(aux3);
          }
          else{
            let aux:Value={
              name:this.monthNames[i-1],
              value:"0"
            }
            let aux2:Value={
              name:this.monthNames[i-1],
              value:"0"
            }
            let aux3:Value={
              name:this.monthNames[i-1],
              value:"0"
            }
            Finished.series.push(aux);
            Canceled.series.push(aux2);
            Postponed.series.push(aux3);
          }
        }
        return [Finished,Canceled,Postponed];
      }
      )
      ).subscribe(data=>{
        console.log(data);
        let aux2:any[]=[];
        aux2=data;
       this.single=aux2;
        
      })
    
   
  }
  ifNull(value){
    if((value == null)) return 0;
    return value;
  }
  test(event){
    if(typeof event==='string')   { 
      let date = new Date(this.Year.value,12,0);
let date2=new Date(this.Year.value,0,0);
       this.GetReportData(event,this.Departament.value,date,date2).subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort=this.sort;
    });
    
    }
    else{
let date = new Date(this.Year.value,this.monthNames.indexOf(event.name),30);
let date2=new Date(this.Year.value,this.monthNames.indexOf(event.name),1);
    console.log(this.Year.value+" "+this.monthNames.indexOf(event.name))
    this.GetReportData(event.series,this.Departament.value, date,date2).subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort=this.sort;
    });
}
  }

  GetReportData(status:string,departament:string,date:Date,date2:Date){
   return   this.db.collectionGroup<EmployeeTraining>('Employee_Trainings',ref=>
      { 
        let query : firebase.firestore.Query=ref;

        if(status) query= query.where('status','==',status);
      if(departament) query=query.where('departament','==',departament);
        if(date)query= query.where('date','<=', date).where('date','>',date2);
        console.log(query);
        return query
      }).valueChanges().pipe(switchMap(data=>{
       const doc =  data.map(a=>{return this.db.collection("Employees").doc<Employee>(a.employeeId).valueChanges().pipe(
         map(x=>{
           console.log(x);
           let aux:EmployeeT={
             employee:x,
             trainingId:a.trainingId,
             status:a.status
           }
           this.GetTrainingName(aux.trainingId);
           return aux;
         })
       )});
       return combineLatest(doc);}
      ))
        
     
  }
 
 
  GetTrainingName(id:string){
   return this.db.collection("Trainings").doc<Training>(id).valueChanges().subscribe(x=>{
     this.trainingNames.set(id,x.Title);
   });
  }
  DownloadRaport(){
      this.trainingService.generateRaportDepartament(this.Departament.value,this.Year.value).subscribe(data=>
        {
          const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(data)
      a.href = objectUrl
      a.download = 'test.csv';
      a.click();
      URL.revokeObjectURL(objectUrl);
        })
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

}
interface EmployeeTraining{
  employeeId:string;
  trainingId:string;
  status:string;
}
interface EmployeeT{
  trainingId:string;
  employee:Employee;
  status:string;
}