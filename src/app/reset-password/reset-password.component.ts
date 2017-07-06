import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from "@angular/forms";
import {ValidationService} from "../services/service.validation";
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../services/service.rest";
import {URLS} from "../common/url-constant";
import {EmitterService} from "../services/service.emitter";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit,OnDestroy {

  public resetForm:FormGroup
  public sub:any
  public uid:any
  public token:any
  constructor(private builder:FormBuilder,private activatedroute:ActivatedRoute,
              private restservice:RestService,private route:Router) { }

  ngOnDestroy(){
    this.sub.unsubscribe()
    EmitterService.get("resetto").emit(false);
  }
  ngOnInit() {

    EmitterService.get("resetto").emit(true);
    this.sub = this.activatedroute.params.subscribe(params => {
      this.uid = params['uid'];
      this.token = params['token'];
    })
     this.resetForm = this.builder.group({
       reset_password: new FormControl('', [Validators.required, ValidationService.passwordValidator]),
       reset_confirmPassword: new FormControl('', [Validators.required])
     })
    // }, {validator: ValidationService.matchingPasswords('password', 'confirmPassword')});
  }

  reset(value){
    let obj
    obj={
      new_password1:value.reset_password,
      new_password2:value.reset_confirmPassword,
      uid:this.uid,
      token:this.token
    }
    console.log(obj,"asdasd")
    this.restservice.post( URLS.Password_Reset_Confirm, JSON.stringify(obj)).subscribe(result=>{
      if(result){
        this.route.navigate(['/'])

      }
    })
  }
  login(){
    this.route.navigate(['/'])
  }
}
