/**
 * Created by consultadd on 23/11/16.
 */
import {Injectable} from "@angular/core";
import {RestService} from "./service.rest";
import * as _ from  "underscore"
import {URLS} from "../common/url-constant";
import {EmitterService} from "./service.emitter";
import {Headers} from "@angular/http";
import {contentHeaders} from "../common/headers";
import {isNull} from "util";
import {isUndefined} from "util";
import {AuthService} from "./service.auth";

@Injectable()
export class SupporterDataService {
public super:boolean
  constructor(private restservice:RestService,private authservice:AuthService){

  }
  getsupporter(id){
   return this.restservice.get(URLS.SupporterDetail+id+"/")

  }
  getadmindata(){
    console.log("user")
    let user =this.authservice.getUser()
    return this.restservice.get(URLS.Admin+user.id+"/")
  }

  addsupporter(url,data){
    let obj;
    obj= {
      username:data.supporter_username,
      email:data.supporter_email,
      first_name:data.supporter_firstname,
      last_name:data.supporter_lastname,
      gender:data.supporter_gender,
      mobile_no:data.supporter_mobile,
      skype_username:data.supporter_skypeid,
      employee_id:data.supporter_employeeid,
      role:data.supporter_role,
      password:data.supporter_lastname + data.supporter_firstname,
      experience:data.supporter_experience
    };
    console.log(obj);
    obj=JSON.stringify(obj);
    return this.restservice.post(url,obj)
  }
updateprofile(url,data){
  let obj;
  obj= {
    username:data.user_username,
    first_name:data.user_firstname,
    last_name:data.user_lastname,
    gender:data.user_gender,
    mobile_no:data.user_mobile,
    skype_username:data.user_skypeid,
    employee_id:data.user_employeeid,
    role:data.user_role,
    skillset:data.user_skillset
  };

 return this.restservice.put(url,JSON.stringify(obj))
}


  getallsupporterdata(){
    return this.restservice.get(URLS.SupporterDetail)
  }
  getTechnologyList(){
    return this.restservice.get(URLS.TECHNOLGY)
  }
  updateConsultant(url,data,file?){
    let obj = new FormData();
    obj.append("username",data.user_username)
    obj.append("role",data.user_role)
    obj.append("first_name",data.user_firstname)
    obj.append("last_name",data.user_lastname)
    obj.append("gender",data.user_gender)
    obj.append("mobile_no",data.user_mobile)
    obj.append("skype_username",data.user_skypeid)
    obj.append("supporter",data.user_supporter)
    obj.append("company_name",data.user_clientName)
    obj.append("status",data.user_status)
    if(!isUndefined(file)) {
      obj.append("resume", file._file, file.file.name)
    }
      contentHeaders.delete('Content-Type')

    return this.restservice.put(url,obj)
  }
  set_isSuperuser(value){
    this.super=value;
  }
  get_isSuperuser(){
    return this.super
  }
  getLoggedInUser(){
    return JSON.parse(localStorage.getItem('loggedInUser'))
  }

  addTechnology(item){
    let obj={
      technology:item.toLowerCase()
    }
    return this.restservice.post(URLS.TECHNOLGY,JSON.stringify(obj))
  }

  putImage(url,user,img){
    console.log("absdhbasdb",img);
    let obj = new FormData();
    obj.append('username',user.username)
    obj.append("role",user.role);
    obj.append("gender",user.gender);
    obj.append("image",img._file,img.file.name);
    contentHeaders.delete('Content-Type');
    return this.restservice.put(url,obj)


  }

  deleteSupporter(id){
   return this.restservice.get(URLS.Admin+id+"/delete_user/")
  }
  confirmSupporter(id){
    return this.restservice.get(URLS.Admin+id+"/active_user/")
  }
}



