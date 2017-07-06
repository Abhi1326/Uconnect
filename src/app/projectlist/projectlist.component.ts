import {Component, OnInit, AfterContentInit, ViewEncapsulation, AfterContentChecked} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ProjectDataService} from "../services/service.project-data";
import * as _ from "underscore"
import {EmitterService} from "../services/service.emitter";
import {SupporterDataService} from "../services/service.supporter-data";

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class ProjectlistComponent implements OnInit ,AfterContentInit,AfterContentChecked {
  public projectdata:any;
  public search_project:any;
  public isSuperuser_plist:boolean;
  public noproj:boolean=false;
  public isProjectData:boolean=false
  public projectData:any
  constructor(private route:Router,private activatedroute:ActivatedRoute,
              private projectservice:ProjectDataService,private sds:SupporterDataService) { }

  ngOnInit() {
    this.isSuperuser_plist=this.sds.get_isSuperuser()
    EmitterService.get("historyModal").subscribe(data=>{

      $('#historyModal').modal("hide")
      this.isProjectData=data
    })



  }

  ngAfterContentChecked(){

  }
  ngAfterContentInit(){

    if(window.location.hash=='#/projectlist'){
      this.projectdata=this.activatedroute.snapshot.data['allproject'];
      if(this.projectdata.length == 0 || this.projectdata == ''){

        this.noproj = true;
      }else{
        this.noproj =false
      }
    }
  }

  open_detail_project(projectid)
  {
    this.route.navigate(['detail',projectid]);
  }

  finding_project()
    {
      if(window.location.hash=='#/projectlist')
      {
        this.projectservice.search(this.search_project).subscribe(
          data=> {
            this.projectdata = data;
            console.log("projectdata",this.projectdata);
            if(this.projectdata.length == 0 || this.projectdata == ''){

              this.noproj = true;
            }else{
              this.noproj =false
            }
          }
        );
      }



    }
  delete_project(id:any){
    this.projectservice.delete(id).subscribe(result=>{
      console.log(result,"=======>")
    this.projectdata=_.filter(this.projectdata,(data:any)=>{
      let temp:any =data
      if(temp["id"]==id){

      }
      else{
        return data
      }
    })

    })
  }
  addPro(){
    this.route.navigate(["form","project"])
  }

  open_history(id){
    this.projectservice.getProjectHistory(id).subscribe(result=>{
      this.projectData=result
      setTimeout(()=>{
        $('#historyModal').modal(<any>{backdrop: 'static',
          keyboard: true,
          show: true})


      },200)

      this.isProjectData=true



    })

  }


}
