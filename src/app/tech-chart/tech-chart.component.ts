import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {EmitterService} from "../services/service.emitter";
// webpack html imports
@Component({
  selector: 'app-tech-chart',
  templateUrl: './tech-chart.component.html',
  styleUrls: ['./tech-chart.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class TechChartComponent implements OnInit {
  @Input() tech_data:any
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  public tech_chart:boolean=true;
  public tech_chart1:boolean=true;
  constructor() { }

  ngOnInit() {

    for(let key in this.tech_data){
      console.log(key)
      if(this.tech_data[key]==0){
        console.log("id")
      }
      else{
        this.doughnutChartLabels.push(key);
        this.doughnutChartData.push(this.tech_data[key])
      }

    }
    EmitterService.get('widget').subscribe(data2=>{
      this.close(data2)
    })

  }

  public chartClicked(e:any):void {
  }

  public chartHovered(e:any):void {
  }
  minimize(view)
  {

    if(view == 'tech_charts')
    {
      this.tech_chart = !this.tech_chart;
    }
  }
  close(view1)
  {

    if(view1 == 'tech_charts')
    {
      this.tech_chart1 = !this.tech_chart1;
    }
  }
}
