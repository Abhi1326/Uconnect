import {Component, OnInit, AfterContentInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {SupporterDataService} from "../services/service.supporter-data";
import {URLS} from "../common/url-constant";
import {ProjectDataService} from "../services/service.project-data";
import * as  _ from "underscore"



declare var iziToast :any
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AddProjectComponent implements OnInit ,AfterContentInit{
public projectForm:FormGroup;
  public supporter:any=[];
  public consultantdata:any;
  public iserror:boolean=false
  public issuccess:any=[]
  public _technology:Object[]
  public item_technology:any
  public isTechnologyError:boolean=false
  public errorMessage:any
  public client_name:any


  constructor(private builder:FormBuilder,private route:Router,private projectservice:ProjectDataService,
              private activatedroute:ActivatedRoute,private supporterservice:SupporterDataService) { }

  ngOnInit() {
    this.supporterservice.getTechnologyList().subscribe(response=>{
      this._technology=response
    })
      this.projectForm= this.builder.group({
        title:new FormControl("",[Validators.required]),
        description:new FormControl("",[]),
        consultant:new FormControl("",[Validators.required]),
        assigned_date:new FormControl("",[Validators.required]),
        join_date:new FormControl("",[]),
        technology:new FormControl("",[Validators.required]),
        status:new FormControl("PENDING",[Validators.required]),
    })
  }

  ngAfterContentInit(){
    this.consultantdata=this.activatedroute.snapshot.data["allconsultant"];
  }

  addProject(value){
    this.projectservice.addproject(URLS.AddProject,value).subscribe(success=> {
      this.issuccess=true;
      this.route.navigate(['projectlist'])
      this.iserror=false;
      iziToast.success({
        title:"Success",
        message:"Project has been added successfully"
      })
    },error=>{
      this.issuccess.splice(0,this.issuccess.length)
     for(let k in error){
       let obj
       obj=k+":"+error[k]
       this.issuccess.push(obj)
     }
      this.iserror=true;
    });
  }

  cancelproject(){
    this.route.navigate(["Home"]);
  }

  add_technology(){
    this.supporterservice.addTechnology(this.item_technology).subscribe(response=>{
      this._technology.unshift(response)
      this.isTechnologyError=false;
      $('.close').click();
    },error=>{
      for(let k in error){
        this.errorMessage=k+":"+error[k]

      }
      this.isTechnologyError=true
    })
  }
  editForm(){


    let obj =_.find(this.consultantdata,(data:any)=>{
      return data.id== this.projectForm.value.consultant;
    })
    let tech=_.find(this._technology,(data:any)=>{
      return data.id== this.projectForm.value.technology;
    })

    this.projectForm.patchValue({
      title:obj["username"]+"-"+obj["client_name"]+'-'+tech['technology']
    })


  }
}
