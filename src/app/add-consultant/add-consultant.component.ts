import {Component, OnInit, ViewEncapsulation, AfterViewInit, AfterContentInit} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../services/service.rest";
import {URLS} from "../common/url-constant";
import {ConsultantDataService} from "../services/service.consultant-data";
import {Router, ActivatedRoute} from "@angular/router";
import * as _ from 'underscore';
import {EmitterService} from "../services/service.emitter";
import {ValidationService} from "../services/service.validation";

declare var iziToast:any;

@Component({
  selector: 'app-add-consultant',
  templateUrl: './add-consultant.component.html',
  styleUrls: ['./add-consultant.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class AddConsultantComponent implements OnInit,AfterContentInit{
  public consultantForm:FormGroup;
  public supporter:any=[];
  public supporterdata:any;
  public issuccess:any=[]
  public iserror:boolean=false;


  constructor(private builder:FormBuilder,
              private consultantservice:ConsultantDataService,private route:Router ,
              private activatedroute:ActivatedRoute) { }
  ngOnInit() {


    this.consultantForm= this.builder.group({
      consultant_role:new FormControl("consultant",[Validators.required]),
      consultant_username:new FormControl("",[Validators.required]),
      consultant_firstname:new FormControl("",[Validators.required]),
      consultant_lastname:new FormControl("",[Validators.required]),
      consultant_client:new FormControl("",[Validators.required]),
      consultant_dob:new FormControl(new Date(),[]),
      consultant_email:new FormControl("",[Validators.required,ValidationService.emailValidator]),
      consultant_mobile:new FormControl("",),
      consultant_skypeid:new FormControl("",[]),
      consultant_experience:new FormControl("",[Validators.maxLength(2)]),
      consultant_gender:new FormControl("",[Validators.required]),
      consultant_sid:new FormControl("",[Validators.required]),
      assigned_date:new FormControl(this.getDate(),[])
    })
  }
  ngAfterContentInit(){
    this.supporterdata=this.activatedroute.snapshot.data["allsupporter"]
    for(let data of this.supporterdata){
      let obj=_.pick(data,'username','id');
     this.supporter.push(obj)
    }
  }
  addConsultant(value){
    this.consultantservice.addconsultant(URLS.AddConsultant,value).subscribe(result=>{
      this.route.navigate(["consultantlist"])
      this.iserror=false;
       iziToast.success({
         title:"Success",
         message:"Consultant has been added successfully"
       })
    },error=>{
      this.issuccess.splice(0,this.issuccess.length)
      for(let k in error){
        let obj
        obj=k+":"+error[k]
        this.issuccess.push(obj)
      }
      this.iserror=true


    })

  }
  cancel(){
    this.route.navigate(["Home"]);
  }
gender(value){

  this.consultantForm.patchValue({
    consultant_gender:value
  })
}
  onChange(file){

  }
  getDate(){
    let today:any = new Date();
    let dd:any = today.getDate();
    let mm:any = today.getMonth()+1; //January is 0!
    let yyyy:any = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd
    return today

  }
}
