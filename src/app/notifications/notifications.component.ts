import {Component, OnInit, AfterContentInit} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import * as _ from "underscore"
import {AuthService} from "../services/service.auth";
import {NotificationDataService} from "../services/service.widgets";
import {URL} from "../common/url-constant";
import {SupporterDataService} from "../services/service.supporter-data";


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public notifyuser
  public notify:Object[]
  public ispageValid:boolean=true
  public count=1
  public host:string =URL



  constructor(private activatedroute:ActivatedRoute ,private authservice:AuthService,
              private nds:NotificationDataService,private route:Router,
              private sds:SupporterDataService) { }



  ngOnInit() {

    this.notifyuser=this.authservice.getUser()
    this.nds.getNotify(this.notifyuser.id,this.count).subscribe(notify=>{
      this.notify=notify
    })

  }


  nextpage(item){

    if(item.type=='assigned_consultant'){
      this.route.navigate(['profile/consultant',item.send_by.id])
    }

    else {
      if (item.type != "registered") {
        this.route.navigate(['detail', item.project])

      }
    }

  }


  loadNotify(){
    this.count= this.count+1;
    this.nds.getNotify(this.notifyuser.id,this.count).subscribe(notify=>{
        this.ispageValid=true
        for (let i of notify) {
          this.notify.push(i);
        }
      },
      error=>{
      if(error=500){
      this.ispageValid =false
    }
    })
  }

  confirmRequest(item,index){


    this.sds.confirmSupporter(item.send_by.id).subscribe(response=> {
    this.nds.sendMail(item.send_by.email).subscribe(response=> {

      this.nds.deleteNotify(item).subscribe(success=> {

        this.notify.splice(index, 1)


        })
      }, error=> {

      })
    },error=>{

    })
  }


  denyRequest(item,index){


    this.nds.deleteNotify(item).subscribe(success=>{
      this.notify.splice(index,1)
      this.sds.deleteSupporter(item.send_by.id).subscribe(response=>{
        console.log("success",response)
      })
    },error=>{

    })
  }




}
