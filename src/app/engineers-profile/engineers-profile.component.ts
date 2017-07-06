import {Component, OnInit, AfterContentInit, ViewEncapsulation} from '@angular/core';
import {RestService} from "../services/service.rest";
import * as _ from "underscore";
import {SupporterDataService} from "../services/service.supporter-data";
import {ActivatedRoute, Router} from "@angular/router";
import {count} from "rxjs/operator/count";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {isNull} from "util";
import {environment} from "../../environments/environment";
import {ProjectDataService} from "../services/service.project-data";

@Component({
  selector: 'app-engineers-profile',
  templateUrl: './engineers-profile.component.html',
  styleUrls: ['./engineers-profile.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class EngineersProfileComponent implements OnInit {
  public host:any=environment.apiUrl
  public supporterdata:any;
  public showuser:boolean=false;
  public edit:boolean=false;
  public skills: Array<number> = [];
  public count:number=1;
  public skillset :any =[];
  public supportereditForm:FormGroup;
  public progress:any=[];
  public count1:number=1;
  public mini:boolean[]=[];
  public projectlist:any
  public permission:boolean;
  public loggeduser;
  public resume_name :any
  public _edit:boolean=false;


  constructor(private dataservice:SupporterDataService,private restservice:RestService,private pds:ProjectDataService,
              private activatedroute:ActivatedRoute,private builder :FormBuilder,private route:Router) {


  }

  ngOnInit() {



    this.loggeduser=this.dataservice.getLoggedInUser()

    this.supporterdata = this.activatedroute.snapshot.data['supporterdata'];


    this.skillset=this.supporterdata.skillset;
    this.projectlist=this.supporterdata.project_list;


    if(this.supporterdata.role == 'supporter')
    {

      if(!this.dataservice.get_isSuperuser()){

        if(this.supporterdata.id==this.loggeduser.id){

          this.permission=true;
        }
        else {
          this.permission=false;
        }

      }
      else{

        this.permission=true;
      }
      this.showuser = true;
    }
    if(this.supporterdata.role == 'consultant')
    {
      if(!isNull(this.supporterdata.resume)){
        let res=this.supporterdata.resume
        res=res.split('/')
        this.resume_name=res[res.length-1];

      }
      if(!this.dataservice.get_isSuperuser()){

        if(this.supporterdata._supporter.id==this.loggeduser.id){
          this.permission=true;

        }
        else{
          this.permission=false

        }

      }
      else{
        this.permission=true
      }
      this.showuser = false;
    }

  }


  profile_edit()
  {
    $('#editModal').modal('show')
  }

  addskill()
  {

    this.count =this.count + 1;
  }

  openConsultantprofile(passvalue)
  {
    this.route.navigate(["profile/consultant",passvalue]);
  }
  minimizecomment(val)
  {


  }

  update(value){
    this.supporterdata=value
    this.projectlist=this.supporterdata.project_list;
    if(this.supporterdata.role == 'consultant'){

    console.log(this.supporterdata,'asdasdasdasdasd')
    if(!isNull(this.supporterdata.resume)){
      let res=this.supporterdata.resume
      res=res.split('/')
      this.resume_name=res[res.length-1];

    }
    }
  }
  open_profile_supp(id){
    this.route.navigate(["profile/supporter",id])
    this.dataservice.getsupporter(id).subscribe(response=>{
      this.supporterdata=response
    })
  }
  callEdit(){
    this._edit=!this._edit;
  }
  OpenCropper(){
    $('#editImage').modal('show')
  }
  a(k){
    console.log(k,'asdasdasdasd')
  }
hide_content(val){
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

    var blob = new Blob([document.getElementById('x_content').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, this.supporterdata.username +".xls");
  }

}
