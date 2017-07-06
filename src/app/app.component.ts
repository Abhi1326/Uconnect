import {
  Component, ViewEncapsulation, OnInit,
  AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy, AfterViewChecked
} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {EmitterService} from "./services/service.emitter";
import {AuthService} from "./services/service.auth";
import * as _ from "underscore";
import {isNull} from "util";
import {SupporterDataService} from "./services/service.supporter-data";
import {isUndefined} from "util";
import {URL} from "./common/url-constant";
import {NotificationDataService} from "./services/service.widgets";
import {isNullOrUndefined} from "util";

declare var iziToast:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit,AfterContentChecked,AfterContentInit{
  public _close:boolean=true;
  public toggle:boolean=true;
  public hide:boolean=false;
  public display:string="none";
  public openlist:boolean=true;
  public display2:string;
  public openadd:boolean=true;
  public display3:string;
  public openprof:boolean=true;
  public display4:string;
  public openlayout:boolean=true;
  public display5:string;
  public user:any;
  public dashboard:Object[];
  public total_notification:any=[];
  public noNotify:boolean=false;
  public isSuperuser:boolean;
  public host:string=URL;
  public lockBody:boolean=false;
  public count:number=0
  // public socket:any=new WebSocket("ws://192.168.1.33:8000/chat/");


  constructor(private route:Router ,private authservice:AuthService ,private activatedroute:ActivatedRoute,
              private sds:SupporterDataService,private nds:NotificationDataService ){

  }

  ngOnInit() {
    //
    // this.socket.onmessage = function(e)
    // {
    //   this.count+=1
    //   var note =JSON.parse(e.data)
    //   // this.total_notification.push(note.data)
    //   iziToast.show({
    //     color:"transparent",
    //     title:note.data.type,
    //     message:note.data.text,
    //     // image:this.user.image.small,
    //     position:'topCenter'
    //   })
    //
    // };
    EmitterService.get("logout").subscribe(data=>{
      if(data){
        this.hide=true
      }
    })
    EmitterService.get('isSuperuser').subscribe(data=> {
      this.sds.set_isSuperuser(data)
      this.isSuperuser = data;
    })

    EmitterService.get("ImageUpdate").subscribe(user=> {
      this.user = user
    })



    //
    // EmitterService.get("msd").subscribe(data=>{
    //
    //     if (this.socket.readyState == WebSocket.OPEN) this.socket.send(data);
    //
    //
    //   })




    }

  ngAfterContentChecked(){

    if(window.location.hash=='#/'|| window.location.hash.includes('reset')|| window.location.hash.includes('signup')||
      window.location.hash.includes("signin")|| window.location.hash==''){
      this.hide=true
    }
    else {

      if(!isUndefined(this.user)){
        if(!isNullOrUndefined(JSON.parse(localStorage.getItem("dashboard")))){

        this.dashboard = JSON.parse(localStorage.getItem("dashboard"))
        this.total_notification = _.filter(this.dashboard["notification"]||{}, notify=> {
          return notify["unread"] == true
        })
        this.hide=false
      }
      }
      else{
        if (!isNull(localStorage.getItem("loggedInUser"))) {
          if(!isNull(localStorage.getItem("dashboard"))) {
            this.dashboard = JSON.parse(localStorage.getItem("dashboard"))
            this.total_notification = _.filter(this.dashboard["notification"], notify=> {
              return notify["unread"] == true
            })
          }
          this.user = JSON.parse(localStorage.getItem("loggedInUser"))

          EmitterService.get('isSuperuser').emit(this.user['is_superuser']);
        }
      }
    }


      if (this.total_notification.length == 0) {
        this.noNotify = true;
      }
      else {
        this.noNotify = false;
      }

  }
  ngAfterContentInit(){

    EmitterService.get("loggedInUser").subscribe(user=>{
        iziToast.show({
        color:"transparent",
          title:"WELCOME",
          message:user.username,
          image:user.image.small,
          position:'topCenter'
      })
      this.hide=false;
      // console.log(this.hide,'asdasdasd')
      this.user=user
    })


  }

  home(){
    this._close=false
    if(this.user.isSuperuser) {
      console.log(this.user.isSuperuser,'asdasd')
      this.route.navigate(["/Home"])
    }
    else{
      console.log(this.user.isSuperuser,'asdasdelse')
      this.route.navigate(["/dashboard"])
    }
  }
  showModal(){
    EmitterService.get("modal").emit(true);
  }

  showlist(value){
    this.toggle=!this.toggle;
   if(this.toggle){
      this.display="none"
   }
   else{
     this.display="block"
   }

  }

  switchBodyColor() {

  if (document.body.className == 'nav-md')
    document.body.className = 'nav-sm';
  else if (document.body.className == 'nav-sm')
    document.body.className = 'nav-md';
}




  open_list_home()
  {

    this.route.navigate(["/Home"])
  }

  logout(){
    this.authservice.logout();

  }

  open_list()
  {
    this.openlist=!this.openlist;
    if(this.openlist){
      this.display2="none";
    }
    else
      {
      this.display2="block";
    }
  }

  open_add()
  {
    this.openadd=!this.openadd;
    if(this.openadd){
      this.display3="none";
    }
    else
    {
      this.display3="block";
    }

  }

  open_prof()
  {
    this.openprof=!this.openprof;
    if(this.openprof){
      this.display4="none";
    }
    else
    {
      this.display4="block";
    }
  }

  open_layout()
  {
    this.openlayout=!this.openlayout;
    if(this.openlayout){
      this.display5="none";
    }
    else
    {
      this.display5="block";
    }
  }

  list(value)
  {
     this.formlist(value)
  }
  add(val)
  {
    this.form(val);
  }
  op(value1)
  {
    EmitterService.get('widget').emit(value1);
  }
  notifyPage(){
    this.route.navigate(["/notification"])
  }

  public form(value) {

      this.route.navigate(['form',value])

  }
  public formlist(value){
    if(value == 'projectlist')
    {
      this.route.navigate(['projectlist'])
    }
    if(value == 'consultantlist')
    {
      console.log(value, "list");
      this.route.navigate(['consultantlist'])
    }
    if (value == 'supporterlist')
    {
      console.log(value);
      this.route.navigate(['supporterlist'])
    }
  }


  confirmRequest(item,index){
    this.sds.confirmSupporter(item.send_by.id).subscribe(response=> {
    this.nds.sendMail(item.send_by.email).subscribe(response=> {
      this.nds.deleteNotify(item).subscribe(success=> {
        this.total_notification.splice(index, 1)


        })
      }, error=> {
      })
    },error=>{
    })
  }
  denyRequest(item,index){

    this.nds.deleteNotify(item).subscribe(success=>{
      this.total_notification.splice(index,1)
      this.sds.deleteSupporter(item.send_by.id).subscribe(response=>{
        console.log("success",response)
      })
    },error=>{

    })
  }

  userProfile(){
    this.route.navigate(["profile/supporter",this.user.id])
  }

  switchBodyLock(){

    this.lockBody = true;
    console.log("lockvalue",this.lockBody);
  }

  unlock(){
    this.lockBody = false;
    console.log("unlockvalue",this.lockBody);
  }
  change(){
    this.count=0
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
}
