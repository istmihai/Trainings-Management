import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import html2canvas from 'html2canvas';
import {  take } from 'rxjs/operators';
import { Training } from '../shared/training.model';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.css']
})
export class SpendingsComponent implements OnInit {
 
  view: any[] = [700, 400];
  BarChartData : BarChart[]=[];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Departament';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Money';


  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  showLegend2:boolean=false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
single=[];
  Departaments:string[]=['Departament1','Departament2','Departament3'];
  depMap=new Map([
    ["Departament1", []],
    ["Departament2",[]],
    ["Departament3",[]]
  ]);
  years=['2020'];

  spendingsForm=this.fb.group({
    year:[]
  });
  constructor(private db:AngularFirestore,private fb:FormBuilder) {
    
   }

  ngOnInit(): void {
  const year = `${new Date().getFullYear()}`;
  this.Departaments.forEach(element => {
     this.GetChartData(element,year)
     console.log(this.depMap);
  });

 

  }
  
  GetChartData(departament:string,year:string){
    let departamentSum=0;
    let charData=[];
    this.db.collection("Departaments").doc(departament).collection("Spendings").doc(year)
    .valueChanges().subscribe(
        data=>{
          if(data){
            this.depMap.set(departament,[]);
            for(const [key,value] of Object.entries(data)){
               let sum=0;
                this.db.collection("Trainings").doc<Training>(key).valueChanges().pipe(take(1)).subscribe(d=>{sum+=value*d.price
                let barData:BarChart={
                  value :sum,
                  name:d.Title
                }
                charData.push(barData);
              //  if(this.depMap.has(departament))
                let values = [...this.depMap.get(departament),barData];
              this.depMap.set(departament,  values)
                 departamentSum+=sum;
                 let departamentData:BarChart={
                  value:departamentSum,
                  name:departament
                }
                this.BarChartData.push(departamentData);
                this.BarChartData=[...this.BarChartData];
                }

                )

            }}

         
        }
          
    )
         


  }

  departamentSelect(data){
    let value=this.depMap.get(data.name);
    this.single=[...value];
    this.showLegend2=true;
  }

  getYear(){
    this.Departaments.forEach(element => {
      this.GetChartData(element,this.spendingsForm.get('year').value)
      console.log(this.depMap);
   });
  }

  exportImg(){
    const chart = document.getElementById('chart');
    html2canvas(chart,
      {
      height:500,
      width:800
      }).then((canvas)=>{
        let x =canvas;
      
      x.getContext('2d').font='15px Arial'
      x.getContext('2d').fillStyle="black";
      console.log(x.width,x.height);
      const date= new Date().toDateString();
     const textWidth = x.getContext('2d').measureText(date).width;
        const widht=x.width;
        const height = x.height;
        console.log(height,widht);
      x.getContext('2d').fillText(date, (widht)-textWidth,height);
   
      
        const image = x.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");      
      const a = document.createElement('a')
      let link = document.createElement('a');
      link.download = "my-image.png";
      link.href = image;
      link.click();
      })
   


}
}
interface BarChart{
  name:string;
  value:number;

}