import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {EmitterService} from "../services/service.emitter";
import {ValidationService} from "../services/service.validation";
import {AuthService} from "../services/service.auth";
import {RestService} from "../services/service.rest";
import {URLS} from "../common/url-constant";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation:ViewEncapsulation.Emulated,
})
export class LoginComponent implements OnInit,OnDestroy {
  public loginForm:FormGroup;
  public signupForm:FormGroup;
  public isforgot:boolean=false;
  public forgotForm:FormGroup;
  public message:string;
  public ismessage:boolean=false;
  constructor(private _formBuilder:FormBuilder,private authservice:AuthService,private route:Router,private restservice:RestService)   { }
ngOnDestroy(){
  EmitterService.get("resetto").emit(false);
}
  ngOnInit() {
    EmitterService.get("signUpResponse").subscribe(data=>{
      for(let k in data){
        this.message=data[k];
        this.ismessage=true
      }
    })
    EmitterService.get("resetto").emit(true);
    this.loginForm = this._formBuilder.group({
      _user:new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(25)]),
      _password:new FormControl("",[Validators.required,ValidationService.passwordValidator]),
    });
    this.signupForm = this._formBuilder.group({
      signup_user:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(25)]),
      signup_email:new FormControl("",[Validators.required,ValidationService.emailValidator]),
      signup_password:new FormControl("",[Validators.required,ValidationService.passwordValidator]),
    });
    this.forgotForm = this._formBuilder.group({
      forgot_email:new FormControl("",[Validators.required,ValidationService.emailValidator]),

    });
  }

  login(value){
    this.authservice.login(value);

  }

  signup(value){
    this.authservice.signup(value);
  }
  forgot(){
    this.isforgot=!this.isforgot
    this.ismessage=false
  }
  submit_forgot(value){
    let obj
    obj={
      email:value.forgot_email
    }
    this.restservice.post(URLS.Password_Reset,obj).subscribe(result=>{
      for(let k in result){
        this.message=result[k];
        this.ismessage=true
      }
    },error=>{

      for(let k in error){
        this.message=error[k];
        this.ismessage=true
      }
    })

  }
clear(){
  this.ismessage=false
}
}
