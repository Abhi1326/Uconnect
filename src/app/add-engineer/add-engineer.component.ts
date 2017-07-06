import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SupporterDataService} from "../services/service.supporter-data";
import {URLS} from "../common/url-constant";

import {ValidationService} from "../services/service.validation";

import {NotificationDataService} from "../services/service.widgets";

declare var iziToast:any;


@Component({
  selector: 'app-add-engineer',
  templateUrl: './add-engineer.component.html',
  styleUrls: ['./add-engineer.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class AddEngineerComponent implements OnInit {
  public supporterForm:FormGroup
  public issuccess:any=[];
  public iserror:boolean=false
  constructor(private builder:FormBuilder, private route:Router, private supporterservice:SupporterDataService,private nds:NotificationDataService) {
  }

  ngOnInit() {
    //EmitterService.get("resetto").emit(false);
    console.log("awesome");
    this.supporterForm = this.builder.group({
      supporter_role: new FormControl("supporter", [Validators.required]),
      supporter_employeeid: new FormControl("", [Validators.required]),
      supporter_firstname: new FormControl("", [Validators.required]),
      supporter_lastname: new FormControl("", [Validators.required]),
      supporter_dob: new FormControl(new Date(), []),
      supporter_password: new FormControl("", []),
      supporter_email: new FormControl("", [Validators.required, ValidationService.emailValidator]),
      supporter_mobile: new FormControl("",),
      supporter_skypeid: new FormControl("", []),
      supporter_username: new FormControl("", [Validators.required]),
      supporter_gender: new FormControl("", []),
      supporter_experience: new FormControl("", [Validators.required,Validators.maxLength(2)]),
    })
  }

  addSupporter(value) {
    this.supporterservice.addsupporter(URLS.AddSupporter, value).subscribe(result=>{
      console.log(value)
      this.nds.sendMail(value.supporter_email).subscribe(response=>{
        iziToast.success({
          title:"Success",
          message:"Email has been sent to the supporter"
        })


      },error=>{

      })
      iziToast.success({
        title:"Success",
        message:"Supporter has been added successfully"
      })
      this.route.navigate(['/supporterlist'])
      this.iserror=false


    },error=>{
      this.issuccess.splice(0,this.issuccess.length)
      for(let k in error){
        let obj
        obj=k+":"+error[k]
        this.issuccess.push(obj)

      }
      this.iserror=true;


    })

  }

  cancel() {
    console.log("cancel")
    this.route.navigate(["Home"]);
  }

  gender(value) {

    this.supporterForm.patchValue({
      supporter_gender: value
    })
  }
}
