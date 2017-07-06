import {Component, OnInit, AfterContentInit, Input, AfterContentChecked, AfterViewInit} from '@angular/core';
import {EmitterService} from "../services/service.emitter";
import * as _ from 'underscore'
import {Analysis} from "../common/interface";



@Component({
  selector: 'app-historylog',
  templateUrl: './historylog.component.html',
  styleUrls: ['./historylog.component.css']
})
export class HistorylogComponent implements OnInit,AfterViewInit{
  @Input() projectData:any
  public isproject:boolean=false
  public duration:Analysis[]=[]
  public Array_of_duration:any=[]
  public charts :any=[]
  public ischarts:boolean=false
  public cache:any
  public supporterArray:any
  constructor() { }

  ngOnInit() {


  }


  dateDiff(date1,date2){

    var diffMs = (date2 - date1); // milliseconds between now & date2
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var obj ={
      days:diffDays,
      hrs:diffHrs,
      mins:diffMins
    }

 return obj


  }
  ngAfterViewInit(){

     this.supporterArray= this.projectData.consultant_history.supporter_id
    var data:any=[]
    let temp_active:any={
      days:0,
      hrs:0,
      mins:0
    }
    let temp_less_active:any={
      days:0,
      hrs:0,
      mins:0
    }
    let temp_independent:any={
      days:0,
      hrs:0,
      mins:0
    }

    setTimeout(()=>{
      var prev_time
      for(let k=0;k<this.supporterArray.length;k++ ){

        data=this.supporterArray[k].history
      for(let i=0; i<data.length;i++){



        if(i==0 && k==0){
          console.log(i,k,"First Time")
          var d1=new Date();
          var d2=new Date(data[i].completion_date)
          var val=this.dateDiff(d2.getTime(),d1.getTime())
          this.duration.push({
            status:data[i].status,
            days:val.days,
            hrs:val.hrs,
            mins:val.mins
          })

        }
        else {
          if(i==0){
            console.log(k+1+"time",prev_time,data[i])
            var d1=new Date(prev_time.completion_date)
            var d2 = new Date(data[i].completion_date);
            var val=this.dateDiff(d2.getTime(),d1.getTime())
            console.log()
            this.duration.push({status:data[i].status,
              days:val.days,
              hrs:val.hrs,
              mins:val.mins
            })
          }
          else{
            var d1 = new Date(data[i-1].completion_date);
            var d2 = new Date(data[i].completion_date)
          var val=this.dateDiff(d2.getTime(),d1.getTime())
          this.duration.push({status:data[i].status,
            days:val.days,
            hrs:val.hrs,
            mins:val.mins
          })
        }

        }

      }
        prev_time=data[data.length-1]
      this.Array_of_duration.push(this.duration)
        this.duration=[]
        console.log(this.Array_of_duration,this.duration)
      }
      for(let j of this.Array_of_duration){
      for(let k of j){


        if(k.status=="active"){
            temp_active.days+=k.days
            temp_active.hrs+=k.hrs
            temp_active.mins+=k.mins
          temp_active=this.min_hrs_conv(temp_active)
        }
        if(k.status=="less_active"){
          temp_less_active.days+=k.days
          temp_less_active.hrs+=k.hrs
          temp_less_active.mins+=k.mins
          temp_less_active=this.min_hrs_conv(temp_less_active)

        }
        if(k.status=="independent"){
          temp_independent.days+=k.days
          temp_independent.hrs+=k.hrs
          temp_independent.mins+=k.mins
          temp_independent=this.min_hrs_conv(temp_independent)

        }

      }
        this.charts.push({
          active:temp_active.days,
          independent:temp_independent.days,
          less_active:temp_less_active.days

        })
        temp_active={
          days:0,
          hrs:0,
          mins:0
        }
        temp_independent={
          days:0,
          hrs:0,
          mins:0
        }
        temp_less_active={
          days:0,
          hrs:0,
          mins:0
        }
      }


      console.log(this.charts,'====>')

    },250)
    // console.log(this.duration,'=====>')


}


  min_hrs_conv(val){
    if( val.hrs>=24){
      val.hrs=val.hrs-24
      val.days+=1
    }
    if(val.mins>=60){
      val.mins=val.mins-60
      val.hrs+=1
    }
    return val

  }


  openCharts(){
    this.ischarts=true
  }


  closeHistory() {
    EmitterService.get("historyModal").emit(false);


  }

  calculateDuration(i,k){
    var t=this.Array_of_duration[k]
    for(let d in t){
      if (d==i){
        this.cache =t[d]
      }
    }
      return true

    }


  hide_content(val){

    console.log(val)
    var id="#"+val.srcElement.parentElement.attributes.id.nodeValue||val.srcElement.attributes.id.nodeValue
    var $BOX_PANEL = $(id).closest('.x_panel'),
      $ICON = $(id).find('i'),
      $BOX_CONTENT = $BOX_PANEL.find('.x_content');

    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr('style')) {
      $BOX_CONTENT.slideToggle(200, function(){
        $BOX_PANEL.removeAttr('style');
      });
    } else {
      $BOX_CONTENT.slideToggle(200);
      $BOX_PANEL.css('height', 'auto');
    }

    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
  }


  exportToExcel() {
    var tabl:any = []
    for (let i = 0; i < this.supporterArray.length; i++){

    tabl.push(document.getElementById('x_content' + i).innerHTML)
  }
    var blob = new Blob(tabl, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, this.projectData.title+".xls");
  }

}
