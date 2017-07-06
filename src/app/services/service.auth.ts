import {Injectable} from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import {RestService} from "./service.rest";
import { Http } from '@angular/http';
import {contentHeaders} from "../common/headers";
import {Observable} from 'rxjs/Observable';
import {URLS} from "../common/url-constant";
import {EmitterService} from './service.emitter';
import {isNull} from "util";
import {isNullOrUndefined} from "util";
// import {User} from '../interfaces/user.interface';


/*
 * Service for socail authentication, using ng2-ui-auth
 */
@Injectable()
export class AuthService {
  public data : any;
  public signupdata:any;
  public auth_token:string;
  public user_details:Object={};
  public password_change:any
  constructor(public _http: Http,public _restService: RestService,private _router:Router,private route:Router) {}


  login(value){

    let dataObj = {
      username: value._user,
      password: value._password
    }

    let dataObj1 = JSON.stringify(dataObj)

    /* Stores email address and other details(if required)into Local Storage for multiple access across components */
    this._restService.post(URLS.LOGIN, dataObj1).subscribe(
      (result) =>{
        this.data = result;
        this.auth_token = this.data.key;
        localStorage.setItem('key',  this.auth_token );
        let csrf =this._restService.getCookie("csrftoken")

        EmitterService.get("signUpResponse").emit(result)
        /* Get user detail for current logged in session by token returned from the above service */
        this._restService.get( URLS.AUTH_USER_DETAIL).subscribe(
          (result) =>{ this.user_details =  result;
            console.log("result",result)
            //Saved user object inside localStorage for access across other components
            localStorage.setItem('loggedInUser',JSON.stringify(this.user_details));
             EmitterService.get("loggedInUser").emit(result);
            // EmitterService.get("isUserLoggedIn").emit(true);

             EmitterService.get("isSuperuser").emit(this.user_details['is_superuser'])
              if(this.user_details['is_superuser']) {
                this.route.navigate(["/Home"])
              }
              else{
                console.log('dashboard')
                this.route.navigate(["/dashboard"])
              }
          });
      }, (err)=>{
        EmitterService.get("signUpResponse").emit(err);
      })
  }
  isadmin(){
    this.user_details=this.getUser()
    if( this.user_details['is_superuser']) {

      return true
    }
    else{

      return false
    }
  }
  isAuthenticated(){
    if( !isNullOrUndefined(localStorage.getItem('key'))){
      console.log("elseif outer")
      if(!isNullOrUndefined(localStorage.getItem('loggedInUser'))) {
        console.log("elseif inner")
        if(!isNullOrUndefined(localStorage.getItem('dashboard'))){
          console.log("elseif ocuntdown")
          return true
        }
        else{
          console.log("elseif ocuntdownlast")
          if(this.isadmin()) {
            this.route.navigate(['Home'])
            return true;
          }
          else{
            this.route.navigate(['dashboard'])
            return true;
          }
        }
      }
      else {
        console.log("else")
        this.logout()
        return false
      }
    }
    else{
      console.log("else oter")

      return false
    }
  }

  signup(value){


    let obj={
      username:value.signup_user,
      email:value.signup_email,
      password:value.signup_password,
      role:"supporter"
    };

    let obj1 = JSON.stringify(obj);
    this._restService.post(URLS.SIGNUP, obj1).subscribe(result => {

      if ( result.token != undefined || result.token != null  ){
        // response is a token which is passed into rest-auth user detail ...
        localStorage.setItem('key',  result.token );

        /* Get user detail for current logged in session by token returned from the above service */
        this._restService.get( URLS.AUTH_USER_DETAIL ).subscribe(
          (result) =>{ this.user_details =  result;
            //Saved user object inside localStorage for access across other components
            localStorage.setItem('loggedInUser',JSON.stringify(this.user_details));

          });

      }
      EmitterService.get("signUpResponse").emit(result);
    }, (error)=>{
      EmitterService.get("signUpResponse").emit(error);
    });
  }

  setCookie(name: string, value: string, expireDays: number, path: string = "") {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }

  logout(){
    // Removes logged in user details from Local Resources

    this._restService.get(URLS.LOGOUT).subscribe(
      result=>{
        localStorage.clear();

      }
    );
    // Emit logged in status to all components for Sync
    // EmitterService.get("isUserLoggedIn").emit(false);
    EmitterService.get("logout").emit(true)
    // Clear the Authorization key from request headers
    contentHeaders.delete('Authorization');

    // Clear the cookies
    this.setCookie(name, "", -1);

    // Delete the X-CSRFToken key from request headers
    contentHeaders.delete('X-CSRFToken');
    this.user_details={}
    this._router.navigate(['/']);

  }
  getUser(){
    console.log("user")
    return JSON.parse(localStorage.getItem('loggedInUser'))
  }



}
