import {Component, OnInit, Input, AfterContentInit, Output,EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormArray, FormGroup} from "@angular/forms";
import {ValidationService} from "../services/service.validation";
import {SupporterDataService} from "../services/service.supporter-data";
import {URLS} from "../common/url-constant";
import {ActivatedRoute} from "@angular/router";
import * as _ from "underscore"
;
import {FileUploader} from "ng2-file-upload/index";
import {isUndefined} from "util";

declare var iziToast:any;


@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit,AfterContentInit {
  public userEditForm:FormGroup
  public technology:any[]
  public technology_item:any
  public supporter:any;
  public iserror:boolean=false
  public errMessage:any
  public isConsultant:boolean=false;
  @Input() userdata
  @Input() role
  @Output() updatedData= new EventEmitter()
  public uploader:FileUploader = new FileUploader({url: URLS.AddConsultant});
  constructor(private builder:FormBuilder,private supporterservice:SupporterDataService,private activatedroute:ActivatedRoute) { }

  ngOnInit() {

  }
  ngAfterContentInit() {
    if(this.role=='supporter') {
      this.isConsultant=false;
      let sk = _.pluck(this.userdata.skillset, 'technology')
      this.supporterservice.getTechnologyList().subscribe(result=> {
        let temp = result
        this.technology = _.filter(temp, (data:any)=> {
          let temp_data = data
          if (_.contains(sk, temp_data["id"])) {

          }
          else {
            return data
          }
        })
      })


      this.userEditForm = this.builder.group({
        user_role: new FormControl('supporter', []),
        user_employeeid: new FormControl(this.userdata.employee_id, [Validators.required]),
        user_username:new FormControl(this.userdata.username),
        user_firstname: new FormControl(this.userdata.first_name, [Validators.required]),
        user_lastname: new FormControl(this.userdata.last_name, [Validators.required]),
        user_dob: new FormControl(new Date(), []),
        user_email: new FormControl(this.userdata.email||'', [Validators.required, ValidationService.emailValidator]),
        user_mobile: new FormControl(this.userdata.mobile_no||'',),
        user_skypeid: new FormControl(this.userdata.skype_username, []),
        user_gender: new FormControl(this.userdata.gender||"", []),
        user_skillset: this.builder.array([
          this.initskills()
        ])
      })

      this.userEditForm.patchValue({
        user_skillset: this.userdata.skillset
      })

    }
    else{
      this.isConsultant=true;
      this.supporter=this.supporterservice.getallsupporterdata()
      this.userEditForm = this.builder.group({
        user_role: new FormControl(this.userdata.role, []),
        user_clientName:new FormControl(this.userdata.client_name,[Validators.required]),
        user_username:new FormControl(this.userdata.username),
        user_supporter:new FormControl(this.userdata._supporter.id,[Validators.required]),
        user_firstname: new FormControl(this.userdata.first_name||"", [Validators.required]),
        user_lastname: new FormControl(this.userdata.last_name||"", [Validators.required]),
        user_dob: new FormControl(new Date(), []),
        user_email: new FormControl(this.userdata.email||"", [Validators.required, ValidationService.emailValidator]),
        user_mobile: new FormControl(this.userdata.mobile_no||'',),
        user_skypeid: new FormControl(this.userdata.skype_username, []),
        user_gender: new FormControl(this.userdata.gender||"", []),
        user_status:new FormControl(this.userdata.status||"",[Validators.required])
      })
    }


  }
  initskills() {

    return this.builder.group({
      technology: new FormControl('',[]),
      pointer: new FormControl('',[]),
      supporter: new FormControl(this.userdata.id,[])

    });
  }

  addskill(value) {
    const control = <FormArray>this.userEditForm.controls['user_skillset'];
    control.push(this.initskills());
  }
  removeskill(i:number){
    const control = <FormArray>this.userEditForm.controls['user_skillset'];
    control.removeAt(i);
  }
  uploadfile(){
    this.uploader.clearQueue()
  }
  gender(value) {

    this.userEditForm.patchValue({
      user_gender: value
    })
  }
  updateprofile(value){
    this.supporterservice.updateprofile(URLS.SupporterDetail+this.userdata.id+'/',value).subscribe(success=>{
      if(success){
        this.iserror=false;
        this.updatedData.emit(success)
        $(".close").click();
        iziToast.success({
          title:"Updated",
          message:"Profile has been updated successfully"
        })
      }

    },error=>{
      this.iserror=true;
      this.errMessage=error;
    })
  }


  update_consultant(value){
    let k
    if(!isUndefined(this.uploader.queue)) {
       k = this.uploader.queue[0];
    }

    this.supporterservice.updateConsultant(URLS.AddConsultant+this.userdata.id+'/',value,k).subscribe(success=>{
        this.iserror=false;
        this.updatedData.emit(success);
        $(".close").click();
      iziToast.success({
        title:"Updated",
        message:"Profile has been updated successfully"
      })
    },error=>{
      this.iserror=true;
      this.errMessage=error;

    })
  }
  add_technology(){
    this.supporterservice.addTechnology(this.technology_item).subscribe(response=>{
      this.technology.unshift(response);
      this.closeModal()
    })
  }
  closeModal(){
    $('#Mymodal').modal('hide');
  }
}
