import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {EmitterService} from "../services/service.emitter";

@Component({
  selector: 'app-statistical-chart',
  templateUrl: './statistical-chart.component.html',
  styleUrls: ['./statistical-chart.component.css']
})
export class StatisticalChartComponent implements OnInit,OnChanges {
  @Input() charts:any
  @Input() supporter_details:any
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public isEmpty:boolean=false
  constructor() {
    console.log(this.charts)
  }

  ngOnInit() {
    var count=0
      console.log(this.charts,"====>INCHARTS",this.supporter_details)
      for(let key in this.charts){
        if(this.charts[key]==0){
          this.doughnutChartLabels.push(key);
          this.doughnutChartData.push(this.charts[key])
          count++
        }
        else {
          this.doughnutChartLabels.push(key);
          this.doughnutChartData.push(this.charts[key])

        }

      }
      if(count==3){
        this.isEmpty=true
      }
      else{
        this.isEmpty=false
      }


  }
  ngOnChanges(){

  }

  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }

}
